import { type Window } from '@tauri-apps/api/window';
import { youtube } from './youtube';

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

export const apps: App[] = [youtube];
