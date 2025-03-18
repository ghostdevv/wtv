use std::process::Command;

#[tauri::command]
async fn logout() -> Result<String, String> {
    let output = Command::new("loginctl") // Replace with your command
        .arg("terminate-user")
        .arg(std::env::var("USER").unwrap_or_default())
        .output();

    match output {
        Err(e) => Err(e.to_string()),
        Ok(result) => {
            if result.status.success() {
                Ok("Success".to_string())
            } else {
                Err(String::from_utf8(result.stderr).unwrap())
            }
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![logout])
        .plugin(tauri_plugin_shell::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
