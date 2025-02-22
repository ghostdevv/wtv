import { type Window } from '@tauri-apps/api/window';
import { alacritty } from './alacritty';
import { jellyfin } from './jellyfin';
import { chromium } from './chromium';
import { youtube } from './youtube';
import { spotify } from './spotify';
import { plex } from './plex';

interface AppCtx {
	tauri_window: Window;
	signal: AbortSignal;
}

type Runner = (ctx: AppCtx) => Promise<void>;

export interface App {
	name: string;
	cover_image: string;
	run: Runner;
}

export const apps: App[] = [
	youtube,
	jellyfin,
	plex,
	spotify,
	chromium,
	alacritty,
];
