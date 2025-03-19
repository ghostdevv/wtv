import type { App } from './apps';

export const wtv_apps: App[] = [
	{
		id: 'youtube',
		name: 'YouTube',
		cover_image: '/youtube-cover.png',
		environment: {
			name: 'chromium',
			url: 'https://www.youtube.com/tv',
			type: 'app',
			quirks: ['user-agent'],
		},
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
		id: 'plex',
		name: 'Plex',
		cover_image: '/plex-cover.png',
		environment: {
			name: 'chromium',
			url: 'https://app.plex.tv/desktop/#!/',
			type: 'app',
		},
	},
	{
		id: 'spotify',
		name: 'Spotify',
		cover_image: '/spotify-cover.png',
		environment: {
			name: 'chromium',
			url: 'https://open.spotify.com',
			type: 'app-ish',
		},
	},
	{
		id: 'chromium',
		name: 'Chromium',
		cover_image: '/chromium-cover.png',
		environment: {
			name: 'chromium',
			url: 'https://duckduckgo.com',
			type: 'plain',
		},
	},
	{
		id: 'alacritty',
		name: 'Alacritty',
		cover_image: '/alacritty-cover.png',
		environment: {
			name: 'alacritty',
		},
	},
];
