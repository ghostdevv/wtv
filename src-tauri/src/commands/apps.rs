use freedesktop_desktop_entry::{default_paths, get_languages_from_env, Iter};
use freedesktop_icons::{default_theme_gtk, lookup};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct DesktopApp {
    id: String,
    name: String,
    icon: Option<String>,
    desktop_file_path: String,
    categories: Option<Vec<String>>,
}

#[tauri::command]
pub fn get_system_applications() -> Vec<DesktopApp> {
    let mut apps = Vec::new();

    let locales = get_languages_from_env();
    let theme = default_theme_gtk().ok_or(String::from("Arc")).unwrap();

    let entries = Iter::new(default_paths())
        .entries(Some(&locales))
        .collect::<Vec<_>>();

    for entry in entries {
        if entry.no_display() {
            continue;
        }

        if let Some(name) = entry.name(&locales) {
            let icon_path = entry.icon().and_then(|icon_name| {
                lookup(icon_name)
                    .with_size(128)
                    .with_theme(&theme)
                    .with_cache()
                    .find()
                    .map(|path| path.to_string_lossy().to_string())
            });

            apps.push(DesktopApp {
                id: entry.id().to_string(),
                name: name.to_string(),
                icon: icon_path,
                desktop_file_path: entry.path.to_string_lossy().to_string(),
                categories: entry.categories().map(|s| {
                    s.iter()
                        .filter_map(|s| {
                            if s.is_empty() {
                                None
                            } else {
                                Some(s.to_string())
                            }
                        })
                        .collect()
                }),
            });
        }
    }

    apps
}
