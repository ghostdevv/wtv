#! /bin/bash

# Build & Install App

echo "Installing dependencies"
pnpm install

echo "Building app"
pnpm tauri build

echo "Installing app"
sudo dpkg -i ./src-tauri/target/release/bundle/deb/wtv_0.1.0_arm64.deb

# Setup desktop

echo "Setting Sway config"
mkdir -p ~/.config/sway
cat > ~/.config/sway/config << 'EOL'
# Disable window title bars
default_border none

# Hide cursor
seat * hide_cursor 2000

# Start the Tauri app
exec /usr/bin/wtv

# Disable idle
exec swayidle -w \
    timeout 0 'echo "Idle prevention"' \
    before-sleep 'echo "Preventing sleep"'
EOL

echo "Setting startup script"
sudo bash -c 'cat > /usr/local/bin/wtv-startup.sh << "EOL"
#!/bin/bash

# Export Wayland-specific variables
export XDG_SESSION_TYPE=wayland
export XDG_CURRENT_DESKTOP=sway
export MOZ_ENABLE_WAYLAND=1
export QT_QPA_PLATFORM=wayland
export GDK_BACKEND=wayland

# Start sway
exec sway
EOL'
sudo chmod +x /usr/local/bin/wtv-startup.sh

echo "Setting wtv desktop entry"
sudo bash -c 'cat > /usr/share/wayland-sessions/wtv.desktop << "EOL"
[Desktop Entry]
Name=wtv-session
Exec=/usr/local/bin/wtv-startup.sh
Type=Application
EOL'

echo "Done!"
echo "You need to make sure that \`/etc/lightdm/lightdm.conf\` is set"
