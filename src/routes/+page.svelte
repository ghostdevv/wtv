<script lang="ts">
	import { Command } from '@tauri-apps/plugin-shell';
	import { window } from '@tauri-apps/api';

	async function onclick() {
		const self = window.getCurrentWindow();

		const app = Command.create('chromium', [
			'--user-agent=Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; AFTB Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
			'--app=https://www.youtube.com/tv',
			'--no-first-run',
			'--no-default-browser-check',
			'--hide-scrollbars',
			'--disable-background-mode',
			'--disable-extensions',
		]);

		app.addListener('close', () => {
			self.show();
		});

		app.addListener('error', (e) => {
			console.log(e);
		});

		const proc = await app.spawn();

		self.hide();

		// const window = new WebviewWindow('wtv-app', {
		// 	url: 'https://www.youtube.com/tv',
		// 	userAgent:
		// 		'Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; AFTB Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
		// });

		// window.once('tauri://created', () => {
		// 	console.log('created');
		// });

		// window.once('tauri://error', (e) => {
		// 	console.log('error', e);
		// });
	}
</script>

<button {onclick}> Open YouTube </button>
