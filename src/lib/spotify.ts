import { Command } from '@tauri-apps/plugin-shell';
import type { App } from './apps';

export const spotify: App = {
	name: 'Spotify',
	cover_image: '/spotify-cover.png',
	run(ctx) {
		return new Promise(async (resolve, reject) => {
			const app = Command.create('spotify', [
				'--app=https://open.spotify.com',
				'--no-first-run',
				'--no-default-browser-check',
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
