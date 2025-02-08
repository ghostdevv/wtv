import { getCurrentWindow, type Window } from '@tauri-apps/api/window';
import type { App } from './apps';

interface AppHandle {
	kill: () => Promise<void>;
}

// todo this impl has so many problems, and doesn't really work but it's fine for rn
// it should cleanup event listeners properly
// it should prevent potential dangling promises
// it should prevent killing an app if the same app is trying to be launched
// etc

class AppManager {
	private current: AppHandle | null = $state(null);
	public readonly running_app = $derived(!!this.current);

	async run(app: App) {
		if (this.current) {
			await this.current.kill();
			this.current = null;
		}

		const controller = new AbortController();

		const promise = app.run({
			tauri_window: getCurrentWindow(),
			signal: controller.signal,
		});

		this.current = {
			async kill() {
				controller.abort();
				await promise;
			},
		};

		promise.then(() => {
			this.current = null;
		});
	}
}

export const app_manager = new AppManager();
