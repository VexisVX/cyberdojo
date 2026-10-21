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
