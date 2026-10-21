#!/usr/bin/env bash
# ============================================================
#  CyberDojo — Add Real Terminal (xterm.js + portable-pty)
# ============================================================
set -euo pipefail

GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'
log() { echo -e "${CYAN}▶${NC} $*"; }
ok()  { echo -e "${GREEN}✔${NC} $*"; }

cd ~/cyberdojo

# ---------- 1. Add Rust deps ----------
log "Adding Rust dependencies (portable-pty, uuid)..."
cd src-tauri

# فقط اگه از قبل نبود اضافه کن
if ! grep -q "portable-pty" Cargo.toml; then
  # اضافه کردن زیر [dependencies]
  python3 - <<'PYEOF'
import re
with open("Cargo.toml", "r") as f:
    content = f.read()

# پیدا کردن بخش [dependencies] و اضافه کردن پکیج‌ها
if "portable-pty" not in content:
    content = content.replace(
        "[dependencies]",
        "[dependencies]\nportable-pty = \"0.8\"\nuuid = { version = \"1\", features = [\"v4\"] }\n"
    )

with open("Cargo.toml", "w") as f:
    f.write(content)
print("✅ Cargo.toml updated")
PYEOF
fi

cd ~/cyberdojo

# ---------- 2. Rust PTY manager ----------
log "Writing src-tauri/src/pty.rs"
cat > src-tauri/src/pty.rs <<'EOF'
use portable_pty::{native_pty_system, CommandBuilder, MasterPty, PtySize};
use std::collections::HashMap;
use std::io::{Read, Write};
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Emitter};

pub struct PtyInstance {
    pub writer: Box<dyn Write + Send>,
    pub master: Box<dyn MasterPty + Send>,
}

pub struct PtyManager {
    pub sessions: Arc<Mutex<HashMap<String, PtyInstance>>>,
}

impl PtyManager {
    pub fn new() -> Self {
        Self {
            sessions: Arc::new(Mutex::new(HashMap::new())),
        }
    }
}

#[tauri::command]
pub fn pty_spawn(
    id: String,
    cols: u16,
    rows: u16,
    app: AppHandle,
    state: tauri::State<'_, PtyManager>,
) -> Result<(), String> {
    let pty_system = native_pty_system();
    let pair = pty_system
        .openpty(PtySize {
            rows,
            cols,
            pixel_width: 0,
            pixel_height: 0,
        })
        .map_err(|e| e.to_string())?;

    let mut cmd = CommandBuilder::new("bash");
    cmd.env("TERM", "xterm-256color");
    cmd.env("PS1", "\\[\\e[1;36m\\]cyberdojo\\[\\e[0m\\] \\[\\e[1;32m\\]\\w\\[\\e[0m\\] $ ");

    let _child = pair.slave.spawn_command(cmd).map_err(|e| e.to_string())?;
    drop(pair.slave);

    let mut reader = pair.master.try_clone_reader().map_err(|e| e.to_string())?;
    let writer = pair.master.take_writer().map_err(|e| e.to_string())?;

    // Store session
    {
        let mut sessions = state.sessions.lock().unwrap();
        sessions.insert(id.clone(), PtyInstance { writer, master: pair.master });
    }

    // Reader thread → emit events to frontend
    let app_handle = app.clone();
    let session_id = id.clone();
    std::thread::spawn(move || {
        let mut buf = [0u8; 8192];
        loop {
            match reader.read(&mut buf) {
                Ok(0) => break,
                Ok(n) => {
                    let data = String::from_utf8_lossy(&buf[..n]).to_string();
                    let _ = app_handle.emit(&format!("pty-output-{}", session_id), data);
                }
                Err(_) => break,
            }
        }
        let _ = app_handle.emit(&format!("pty-exit-{}", session_id), ());
    });

    Ok(())
}

#[tauri::command]
pub fn pty_write(
    id: String,
    data: String,
    state: tauri::State<'_, PtyManager>,
) -> Result<(), String> {
    let mut sessions = state.sessions.lock().unwrap();
    if let Some(instance) = sessions.get_mut(&id) {
        instance
            .writer
            .write_all(data.as_bytes())
            .map_err(|e| e.to_string())?;
        instance.writer.flush().map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
pub fn pty_resize(
    id: String,
    cols: u16,
    rows: u16,
    state: tauri::State<'_, PtyManager>,
) -> Result<(), String> {
    let sessions = state.sessions.lock().unwrap();
    if let Some(instance) = sessions.get(&id) {
        instance
            .master
            .resize(PtySize {
                rows,
                cols,
                pixel_width: 0,
                pixel_height: 0,
            })
            .map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
pub fn pty_kill(id: String, state: tauri::State<'_, PtyManager>) -> Result<(), String> {
    let mut sessions = state.sessions.lock().unwrap();
    sessions.remove(&id);
    Ok(())
}
EOF

ok "pty.rs written"

# ---------- 3. Wire up main.rs ----------
log "Updating src-tauri/src/lib.rs"
if [ -f src-tauri/src/lib.rs ]; then
  LIB_FILE="src-tauri/src/lib.rs"
else
  LIB_FILE="src-tauri/src/main.rs"
fi

# اگه lib.rs هست، استفاده کن، وگرنه main.rs رو آپدیت کن
if [ -f src-tauri/src/lib.rs ]; then
  cat > src-tauri/src/lib.rs <<'EOF'
mod pty;

use pty::PtyManager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(PtyManager::new())
        .invoke_handler(tauri::generate_handler![
            pty::pty_spawn,
            pty::pty_write,
            pty::pty_resize,
            pty::pty_kill,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
EOF
  ok "lib.rs updated"
else
  cat > src-tauri/src/main.rs <<'EOF'
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod pty;

use pty::PtyManager;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(PtyManager::new())
        .invoke_handler(tauri::generate_handler![
            pty::pty_spawn,
            pty::pty_write,
            pty::pty_resize,
            pty::pty_kill,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
EOF
  ok "main.rs updated"
fi

cd ~/cyberdojo

# ---------- 4. Frontend: Terminal component ----------
log "Writing XTerm.tsx component"
cat > src/components/terminal/XTerm.tsx <<'EOF'
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import { invoke } from "@tauri-apps/api/core";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import "xterm/css/xterm.css";

const CYBERDOJO_THEME = {
  background: "#0d1117",
  foreground: "#e6edf3",
  cursor: "#00e5ff",
  cursorAccent: "#0d1117",
  selectionBackground: "rgba(0, 229, 255, 0.3)",
  black: "#484f58",
  red: "#ff7b72",
  green: "#3fb950",
  yellow: "#d29922",
  blue: "#58a6ff",
  magenta: "#bc8cff",
  cyan: "#00e5ff",
  white: "#b1bac4",
  brightBlack: "#6e7681",
  brightRed: "#ffa198",
  brightGreen: "#56d364",
  brightYellow: "#e3b341",
  brightBlue: "#79c0ff",
  brightMagenta: "#d2a8ff",
  brightCyan: "#00f0ff",
  brightWhite: "#f0f6fc",
};

export function XTerm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const sessionId = useRef(`pty-${crypto.randomUUID()}`);

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new Terminal({
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 14,
      lineHeight: 1.2,
      cursorBlink: true,
      cursorStyle: "bar",
      theme: CYBERDOJO_THEME,
      allowProposedApi: true,
      scrollback: 5000,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());

    term.open(containerRef.current);
    fitAddon.fit();
    termRef.current = term;

    const id = sessionId.current;
    let unlistenOutput: UnlistenFn | null = null;
    let unlistenExit: UnlistenFn | null = null;

    // Setup listeners FIRST, then spawn
    (async () => {
      unlistenOutput = await listen<string>(`pty-output-${id}`, (e) => {
        term.write(e.payload);
      });

      unlistenExit = await listen(`pty-exit-${id}`, () => {
        term.write("\r\n\x1b[33m[Process exited]\x1b[0m\r\n");
      });

      // Spawn PTY
      try {
        await invoke("pty_spawn", {
          id,
          cols: term.cols,
          rows: term.rows,
        });
      } catch (err) {
        term.write(`\x1b[31mFailed to spawn: ${err}\x1b[0m\r\n`);
      }
    })();

    // User input → PTY
    const onData = term.onData((data) => {
      invoke("pty_write", { id, data }).catch(() => {});
    });

    // Resize handling
    const onResize = term.onResize(({ cols, rows }) => {
      invoke("pty_resize", { id, cols, rows }).catch(() => {});
    });

    const resizeObserver = new ResizeObserver(() => {
      try {
        fitAddon.fit();
      } catch {}
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      onData.dispose();
      onResize.dispose();
      resizeObserver.disconnect();
      unlistenOutput?.();
      unlistenExit?.();
      invoke("pty_kill", { id }).catch(() => {});
      term.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0d1117] rounded-xl overflow-hidden border border-white/10">
      <div className="px-4 py-2 bg-bg-panel/80 border-b border-white/5 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs font-mono text-text-muted">
          bash — cyberdojo
        </span>
      </div>
      <div ref={containerRef} className="w-full h-[calc(100%-40px)] p-2" />
    </div>
  );
}
EOF

ok "XTerm.tsx written"

# ---------- 5. Update LinuxPage ----------
log "Updating LinuxPage.tsx"
cat > src/features/linux/LinuxPage.tsx <<'EOF'
import { XTerm } from "../../components/terminal/XTerm";

export function LinuxPage() {
  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Linux Terminal</h1>
        <p className="text-text-muted mt-1 font-mono text-sm">
          $ real bash shell — امن نیست، فقط برای dev
        </p>
      </div>
      <div className="flex-1 min-h-0">
        <XTerm />
      </div>
    </div>
  );
}
EOF

ok "LinuxPage.tsx updated"

# ---------- 6. CSS tweaks for xterm ----------
log "Tweaking global CSS for xterm"
cat >> src/index.css <<'EOF'

/* xterm container */
.xterm {
  padding: 4px;
  height: 100%;
}
.xterm-screen {
  height: 100% !important;
}
EOF

ok "CSS updated"

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅  Terminal added!                    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo "Now run:"
echo "  cd ~/cyberdojo"
echo "  WEBKIT_DISABLE_DMABUF_RENDERER=1 npm run tauri dev"
echo ""
echo "Then click 'Linux' in sidebar → real bash terminal!"
echo ""
