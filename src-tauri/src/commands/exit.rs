use tauri::AppHandle;

#[tauri::command]
pub fn logout() -> Result<String, String> {
    let user = std::env::var("USER");

    if let Err(e) = user {
        return Err(e.to_string());
    }

    crate::utils::exec("loginctl", vec!["terminate-user", &user.unwrap()])
}

#[tauri::command]
pub fn shutdown() -> Result<String, String> {
    crate::utils::exec("poweroff", vec![])
}

#[tauri::command]
pub fn reboot() -> Result<String, String> {
    crate::utils::exec("reboot", vec![])
}

#[tauri::command]
pub fn relaunch(app: AppHandle) {
    app.restart();
}
