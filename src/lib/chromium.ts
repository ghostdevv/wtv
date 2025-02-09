import { Command } from '@tauri-apps/plugin-shell';
import type { App } from './apps';

export const chromium: App = {
	name: 'Chromium',
	cover_image: '/chromium-cover.png',
	run(ctx) {
		return new Promise(async (resolve, reject) => {
			const app = Command.create('chromium-plain', []);

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
