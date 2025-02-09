import { Command } from '@tauri-apps/plugin-shell';
import type { App } from './apps';

export const plex: App = {
	name: 'Plex',
	cover_image: '/plex-cover.png',
	run(ctx) {
		return new Promise(async (resolve, reject) => {
			const app = Command.create('chromium', [
				'--user-agent=Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; AFTB Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
				'--app=https://app.plex.tv/desktop/#!/',
				'--no-first-run',
				'--no-default-browser-check',
				'--hide-scrollbars',
				'--disable-background-mode',
				'--disable-extensions',
			]);

			app.addListener('close', () => {
				resolve();
			});

			app.addListener('error', (e) => {
				reject(new Error(e));
			});

			const proc = await app.spawn();

			ctx.signal.addEventListener('abort', () => {
				proc.kill();
			});
		});
	},
};
