import { Child, Command } from '@tauri-apps/plugin-shell';
import { error, info } from '@tauri-apps/plugin-log';
import { wtv_apps } from './wtv-apps';

type ChromiumEnvironment = {
	name: 'chromium';
	url: string;
	type: 'app' | 'app-ish' | 'plain';
	quirks?: 'user-agent'[];
};

type AlacrittyEnvironment = {
	name: 'alacritty';
};

type Environment = ChromiumEnvironment | AlacrittyEnvironment;

export interface App {
	id: string;
	name: string;
	cover_image: string;
	environment: Environment;
}

class AppRegistry {
	private registry = new Map<string, App>();

	find(app_id: string) {
		return this.registry.get(app_id) || null;
	}

	async populate() {
		// prevent re-runs
		if (this.registry.size > 0) return;

		for (const app of wtv_apps) {
			this.registry.set(app.id, app);
		}
	}
}

export const registry = new AppRegistry();

class AppLauncher {
	/** Maps app id to process */
	private processes = new Map<string, Child>();

	public async launch(app_id: string) {
		const app = registry.find(app_id);

		if (!app) {
			error(`App not found: ${app_id}`);
			throw new Error(`App not found: ${app_id}`);
		}

		if (this.processes.has(app_id)) {
			error(`App already running: ${app_id}`);
			throw new Error(`App already running: ${app_id}`);
		}

		for (const [app_id, process] of this.processes.entries()) {
			info(`Killing app "${app_id}" (${process.pid})`);
			await process.kill();
		}

		const command = this.construct_command(app);
		info(`Launching app "${app_id}"`);

		command.addListener('close', () => {
			info(`App "${app_id}" closed`);
			this.processes.delete(app_id);
		});

		const handle_error = (e: unknown) => {
			error(`Error launching app "${app_id}" (${e})`);
			this.processes.delete(app_id);
		};

		command.addListener('error', handle_error);

		try {
			const process = await command.spawn();
			this.processes.set(app_id, process);
		} catch (e) {
			handle_error(e);
		}
	}

	private construct_command(app: App): Command<string> {
		switch (app.environment.name) {
			case 'alacritty':
				return Command.create('alacritty', []);

			case 'chromium': {
				let program = `chromium-${app.environment.type}`;
				const args: string[] = [];

				if (
					app.environment.quirks?.includes('user-agent') &&
					app.environment.type == 'app'
				) {
					program = 'chromium-user-agent';
					args.push(
						'--user-agent=Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; AFTB Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
					);
				}

				if (app.environment.type.includes('app')) {
					args.push(
						`--app=${app.environment.url}`,
						'--no-first-run',
						'--no-default-browser-check',
					);
				}

				if (app.environment.type == 'app') {
					args.push(
						'--hide-scrollbars',
						'--disable-background-mode',
						'--disable-extensions',
					);
				}

				return Command.create(program, args);
			}
		}
	}
}

export const launcher = new AppLauncher();
