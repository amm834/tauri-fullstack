// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[tauri::command]
fn say_hi() -> String {
    "Hi".into()
}


#[tauri::command]
fn say_hi_to(name: &str) -> Result<String, String> {
    if name.is_empty() {
        Err("Name cannot be empty".into())
    } else {
        Ok(format!("Hi, {}!", name))
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            say_hi,
            say_hi_to
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
