import { PersistedState } from 'runed';

class HomeManager {
	private store = new PersistedState('home', ['youtube', 'plex', 'chromium']);

	get list() {
		return this.store.current;
	}

	toggle(app_id: string) {
		if (this.list.includes(app_id)) {
			this.remove(app_id);
		} else {
			this.add(app_id);
		}
	}

	add(app_id: string) {
		if (this.list.includes(app_id)) return;
		this.store.current.push(app_id);
	}

	remove(app_id: string) {
		this.store.current = this.list.filter((id) => id !== app_id);
	}
}

export const home = new HomeManager();
