import { get_primary_category, type AppCategory } from './app-categories';
import { type Child, Command } from '@tauri-apps/plugin-shell';
import { invoke, convertFileSrc } from '@tauri-apps/api/core';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { error, info } from '@tauri-apps/plugin-log';
import { wtv_apps } from './wtv-apps';

type ChromiumEnvironment = {
	name: 'chromium';
	url: string;
	type: 'app' | 'app-ish' | 'plain';
	quirks?: 'user-agent'[];
};

type SystemAppEnvironment = {
	name: 'system';
	desktop_file_path: string;
};

type Environment = ChromiumEnvironment | SystemAppEnvironment;

export interface App {
	id: string;
	name: string;
	icon: string | null;
	background_colour: string | null;
	environment: Environment;
	categories: AppCategory[];
}

interface SystemApplication {
	id: string;
	name: string;
	desktop_file_path: string;
	icon?: string;
	categories?: string[];
}

class AppRegistry {
	private registry = new Map<string, App>();

	find(app_id: string) {
		return this.registry.get(app_id) || null;
	}

	list() {
		return Array.from(this.registry.values());
	}

	filter_by_category(category: AppCategory) {
		return this.list().filter((app) => app.categories.includes(category));
	}

	async populate() {
		// prevent re-runs
		if (this.registry.size > 0) return;

		for (const app of wtv_apps) {
			this.registry.set(app.id, app);
		}

		const system_apps = await invoke<SystemApplication[]>(
			'get_system_applications',
		);

		for (const app of system_apps) {
			const id = `system-${app.id}`;

			this.registry.set(id, {
				id,
				name: app.name,
				icon: app.icon ? convertFileSrc(app.icon) : null,
				background_colour: null,
				environment: {
					name: 'system',
					desktop_file_path: app.desktop_file_path,
				},
				categories: [get_primary_category(app.categories)],
			} satisfies App);
		}
	}
}

export const registry = new AppRegistry();

class AppLauncher {
	/** Maps app id to process */
	private processes = new Map<string, Child>();

	private async check_visibility() {
		try {
			const window = getCurrentWindow();

			if (this.processes.size === 0) {
				info('Showing window');
				await window.show();
			} else {
				info('Hiding window');
				await window.hide();
			}
		} catch (e) {
			error(`Failed to set visibility: ${e}`);
		}
	}

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
			this.check_visibility();
		});

		const handle_error = (e: unknown) => {
			error(`Error launching app "${app_id}" (${e})`);
			this.processes.delete(app_id);
			this.check_visibility();
		};

		command.addListener('error', handle_error);

		try {
			const process = await command.spawn();
			this.processes.set(app_id, process);
			await this.check_visibility();
		} catch (e) {
			handle_error(e);
		}
	}

	private construct_command(app: App): Command<string> {
		switch (app.environment.name) {
			case 'system':
				return Command.create('dex', [
					'--wait',
					app.environment.desktop_file_path,
				]);

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
