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

# Custom popups should be floating
for_window [app_id="wtv" title="\w+ - wtv"] floating enable, move position center

# Start the Tauri app
exec /usr/bin/wtv

# Idle handling
exec swayidle -w \
    timeout 3600 'systemctl poweroff' \
    before-sleep 'echo "Preventing sleep"'

# On screen display server
set $WOBSOCK $XDG_RUNTIME_DIR/wob.sock
exec rm -f $WOBSOCK && mkfifo $WOBSOCK && tail -f $WOBSOCK | wob

# Volume OSD
bindsym XF86AudioRaiseVolume exec pactl set-sink-volume @DEFAULT_SINK@ +5% && pactl get-sink-volume @DEFAULT_SINK@ | awk 'NR==1{print substr($5,1,length($5)-1)}' > $WOBSOCK
bindsym XF86AudioLowerVolume exec pactl set-sink-volume @DEFAULT_SINK@ -5% && pactl get-sink-volume @DEFAULT_SINK@ | awk 'NR==1{print substr($5,1,length($5)-1)}' > $WOBSOCK
bindsym XF86AudioMute exec pactl set-sink-mute @DEFAULT_SINK@ toggle && ( [ "$(pactl get-sink-mute @DEFAULT_SINK@)" = "Mute: yes" ] && echo 0 > $WOBSOCK ) || pactl get-sink-volume @DEFAULT_SINK@ | awk 'NR==1{print substr($5,1,length($5)-1)}' > $WOBSOCK
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
