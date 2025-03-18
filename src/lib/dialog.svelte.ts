import { error, info } from '@tauri-apps/plugin-log';
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

		this._dialog.once('tauri://created', () => {
			info(`Dialog "${name}" created`);
		});

		this._dialog.once('tauri://error', (e) => {
			error(`Dialog "${name}" Error: ${e}`);
		});

		this._dialog.once('tauri://destroyed', () => {
			info(`Dialog "${name}" destroyed`);
			this._dialog = null;
		});
	}

	async close() {
		info('Closing dialog with close()');
		await this._dialog?.close().catch((e) => {
			error(`Error closing dialog: ${e}`);
			throw e;
		});
	}
}

export const dialog = new DialogManager();
