<script lang="ts">
	import 'ghostsui';
	import { getCurrentWindow } from '@tauri-apps/api/window';
	import { getNextFocus } from '@bbc/tv-lrud-spatial';
	import { info } from '@tauri-apps/plugin-log';
	import { dialog } from '$lib/dialog.svelte';
	import { tick, type Snippet } from 'svelte';
	import { dev } from '$app/environment';
	import { page } from '$app/state';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	function spatialNavigate(key = 39) {
		const next = getNextFocus(
			(document.activeElement as HTMLElement) ||
				document.querySelector('button')!,
			key,
		);

		if (next) {
			next.focus();
			next.scrollIntoView({
				behavior: 'smooth',
				inline: 'center',
			});
		}
	}

	function onkeydown(event: KeyboardEvent) {
		const arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

		if (arrows.includes(event.key)) {
			event.preventDefault();
			spatialNavigate(event.keyCode);
		}

		if (event.key == 'Escape') {
			// prettier-ignore
			info(`Escape pressed. Pathname: ${page.url.pathname} Dialog exists: ${dialog.exists}`);

			if (dialog.exists) {
				dialog.close();
			} else if (page.url.pathname == '/') {
				dialog.open('logout');
			}
		}
	}

	$effect(() => {
		info('Launched');
		tick().then(() => {
			spatialNavigate();
		});
	});

	if (dev) {
		getCurrentWindow().setFullscreen(false);
	}
</script>

<svelte:window {onkeydown} />

<main class:mask={page.url.pathname == '/' && dialog.exists}>
	{@render children()}
</main>

<style lang="scss">
	main {
		padding: 12px 16px;

		&.mask {
			user-select: none;
			-webkit-user-select: none;
			opacity: 0.8;
			filter: blur(4px);
		}
	}

	:global(::-webkit-scrollbar) {
		display: none;
	}

	:global(:root) {
		font-size: 32px;
	}
</style>
