<script lang="ts">
	import 'ghostsui';
	import { getCurrentWindow } from '@tauri-apps/api/window';
	import { getNextFocus } from '@bbc/tv-lrud-spatial';
	import { dialog } from '$lib/dialog.svelte';
	import { tick, type Snippet } from 'svelte';
	import { dev } from '$app/environment';
	import { page } from '$app/state';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	function onkeydown(event: KeyboardEvent) {
		const arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

		if (arrows.includes(event.key)) {
			event.preventDefault();

			const nextFocus = getNextFocus(
				(document.activeElement as HTMLElement) ||
					document.querySelector('.app')!,
				event.keyCode,
			);

			if (nextFocus) {
				nextFocus.focus();
				nextFocus.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				});
			}
		}

		if (event.key == 'Escape') {
			if (dialog.exists) {
				dialog.close();
			} else if (page.url.pathname == '/') {
				dialog.open('logout');
			}
		}
	}

	$effect(() => {
		tick().then(() => {
			document.querySelector<HTMLButtonElement>('button')?.focus();
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
