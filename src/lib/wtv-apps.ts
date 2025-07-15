import type { App } from './apps';

export const wtv_apps: App[] = [
	{
		id: 'wtv-youtube',
		name: 'YouTube',
		icon: '/apps/youtube.png',
		background_colour: '#ffffff',
		environment: {
			name: 'chromium',
			url: 'https://www.youtube.com/tv',
			type: 'app',
			quirks: ['user-agent'],
		},
		categories: ['wtv'],
	},
	// {
	// 	id: 'jellyfin',
	// 	name: 'Jellyfin',
	// 	cover_image: '/jellyfin-cover.png',
	// 	environment: {
	// 		name: 'chromium',
	// 		url: 'https://watch.willow.sh',
	// 		type: 'app',
	// 	},
	// },
	{
		id: 'wtv-plex',
		name: 'Plex',
		icon: '/apps/plex.png',
		background_colour: '#212121',
		environment: {
			name: 'chromium',
			url: 'https://app.plex.tv/desktop/#!/',
			type: 'app',
		},
		categories: ['wtv'],
	},
	{
		id: 'wtv-spotify',
		name: 'Spotify',
		icon: '/apps/spotify.png',
		background_colour: '#1ED760',
		environment: {
			name: 'chromium',
			url: 'https://open.spotify.com',
			type: 'app-ish',
		},
		categories: ['wtv'],
	},
	{
		id: 'wtv-chromium',
		name: 'Chromium',
		icon: '/apps/chromium.png',
		background_colour: '#353535',
		environment: {
			name: 'chromium',
			url: 'https://duckduckgo.com',
			type: 'plain',
		},
		categories: ['wtv'],
	},
	{
		id: 'wtv-alacritty',
		name: 'Alacritty',
		icon: '/apps/alacritty.png',
		background_colour: '#181818',
		environment: {
			name: 'alacritty',
		},
		categories: ['wtv'],
	},
];
