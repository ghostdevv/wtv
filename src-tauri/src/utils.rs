use std::process::Command;

pub fn exec(cmd: &str, args: Vec<&str>) -> Result<String, String> {
    // let output = Command::new("loginctl") // Replace with your command
    //     .arg("terminate-user")
    //     .arg(std::env::var("USER").unwrap_or_default())
    //     .output();

    let output = Command::new(cmd).args(args).output();

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
