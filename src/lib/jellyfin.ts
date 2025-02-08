import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import type { App } from './apps';

export const jellyfin: App = {
	name: 'Jellyfin',
	cover_image: '/jellyfin-cover.png',
	run(ctx) {
		return new Promise(async (resolve) => {
			const app = new WebviewWindow('wtv-app', {
				url: 'https://watch.willow.sh',
				fullscreen: true,
				decorations: false,
				focus: true,
			});

			app.once('tauri://destroyed', () => {
				resolve();
			});

			ctx.signal.addEventListener('abort', () => {
				app.destroy();
			});
		});
	},
};
