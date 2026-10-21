import { useEffect, useRef, useState, useCallback } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import { invoke } from "@tauri-apps/api/core";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { RotateCcw, Power } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "xterm/css/xterm.css";

const CYBERDOJO_THEME = {
  background: "#0d1117",
  foreground: "#e6edf3",
  cursor: "#00e5ff",
  cursorAccent: "#0d1117",
  selectionBackground: "rgba(0, 229, 255, 0.3)",
  black: "#484f58", red: "#ff7b72", green: "#3fb950", yellow: "#d29922",
  blue: "#58a6ff", magenta: "#bc8cff", cyan: "#00e5ff", white: "#b1bac4",
  brightBlack: "#6e7681", brightRed: "#ffa198", brightGreen: "#56d364",
  brightYellow: "#e3b341", brightBlue: "#79c0ff", brightMagenta: "#d2a8ff",
  brightCyan: "#00f0ff", brightWhite: "#f0f6fc",
};

const MONO_FONT = ["JetBrains Mono", "Fira Code", "monospace"].join(", ");

export function XTerm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const sessionId = useRef(`pty-${crypto.randomUUID()}`);
  const [alive, setAlive] = useState(false);
  const [spawnKey, setSpawnKey] = useState(0);

  const restart = useCallback(() => {
    try { invoke("pty_kill", { id: sessionId.current }).catch(() => {}); } catch {}
    sessionId.current = `pty-${crypto.randomUUID()}`;
    termRef.current?.dispose();
    termRef.current = null;
    setAlive(false);
    setSpawnKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const term = new Terminal({
      fontFamily: MONO_FONT,
      fontSize: 14, lineHeight: 1.2, cursorBlink: true, cursorStyle: "bar",
      theme: CYBERDOJO_THEME, allowProposedApi: true, scrollback: 5000,
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
    let disposed = false;

    (async () => {
      unlistenOutput = await listen<string>(`pty-output-${id}`, (e) => { if (!disposed) term.write(e.payload); });
      unlistenExit = await listen(`pty-exit-${id}`, () => {
        if (disposed) return;
        setAlive(false);
        term.write("\r\n\x1b[33m[Process exited — click Restart or press Ctrl+R]\x1b[0m\r\n");
      });
      try {
        await invoke("pty_spawn", { id, cols: term.cols, rows: term.rows });
        setAlive(true);
      } catch (err) {
        term.write(`\x1b[31mFailed to spawn: ${err}\x1b[0m\r\n`);
        setAlive(false);
      }
    })();

    const onData = term.onData((data) => { if (!disposed) invoke("pty_write", { id, data }).catch(() => {}); });
    const onResize = term.onResize(({ cols, rows }) => { invoke("pty_resize", { id, cols, rows }).catch(() => {}); });
    const resizeObserver = new ResizeObserver(() => { try { fitAddon.fit(); } catch {} });
    resizeObserver.observe(containerRef.current);

    const onKeyDown = (e: KeyboardEvent) => { if (e.ctrlKey && e.key === "r") { e.preventDefault(); restart(); } };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      disposed = true;
      window.removeEventListener("keydown", onKeyDown);
      onData.dispose(); onResize.dispose(); resizeObserver.disconnect();
      unlistenOutput?.(); unlistenExit?.();
      invoke("pty_kill", { id }).catch(() => {});
      term.dispose(); termRef.current = null;
    };
  }, [spawnKey, restart]);

  return (
    <div className="w-full h-full flex flex-col bg-[#0d1117] rounded-xl overflow-hidden border border-white/10 relative">
      <div className="px-4 py-2 bg-bg-panel/80 border-b border-white/5 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs font-mono text-text-muted">bash — cyberdojo</span>
        <div className="ml-auto flex items-center gap-2">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${alive ? "bg-neon-green/10 text-neon-green border border-neon-green/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
            {alive ? "● alive" : "○ dead"}
          </span>
          <button onClick={restart} title="Restart (Ctrl+R)" className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-neon-cyan hover:bg-neon-cyan/10 border border-neon-cyan/20 rounded transition">
            <RotateCcw className="w-3 h-3" /> restart
          </button>
        </div>
      </div>
      <div ref={containerRef} className="flex-1 p-2 min-h-0" />
      <AnimatePresence>
        {!alive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <div className="text-text-muted font-mono mb-3 text-sm">shell exited</div>
              <button onClick={restart} className="px-4 py-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono text-sm hover:bg-neon-cyan/20 transition flex items-center gap-2 mx-auto">
                <Power className="w-4 h-4" /> start new session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
