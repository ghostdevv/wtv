import {
	WebviewWindow,
	getCurrentWebviewWindow,
} from '@tauri-apps/api/webviewWindow';

class DialogManager {
	private _dialog = $state<WebviewWindow | null>(
		getCurrentWebviewWindow().label == 'dialog'
			? getCurrentWebviewWindow()
			: null,
	);

	get exists() {
		return !!this._dialog;
	}

	async open(name: string) {
		if (this._dialog && this._dialog.title.name.includes(name)) {
			return;
		}

		await this._dialog?.close();

		this._dialog = new WebviewWindow('dialog', {
			title: `${name} - wtv`,
			url: `/dialog/${name}`,
			visibleOnAllWorkspaces: true,
			decorations: false,
			alwaysOnTop: true,
			fullscreen: false,
			width: 600,
			height: 400,
			visible: true,
			center: true,
			focus: true,
		});

		this._dialog.once('tauri://destroyed', () => {
			this._dialog = null;
		});
	}

	async close() {
		await this._dialog?.close();
	}
}

export const dialog = new DialogManager();
