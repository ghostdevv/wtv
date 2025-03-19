<script lang="ts">
	import 'ghostsui';
	import { getNextFocus } from '@bbc/tv-lrud-spatial';
	import { info } from '@tauri-apps/plugin-log';
	import { dialog } from '$lib/dialog.svelte';
	import { tick, type Snippet } from 'svelte';
	import { page } from '$app/state';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const FOCUSABLE = '[tabindex], a, input, button';

	function spatialNavigate(key = 39) {
		const current = document.activeElement as HTMLElement;

		const next = getNextFocus(
			current || document.querySelector('button')!,
			key,
		);

		const toFocus = next
			? next
			: current.matches(FOCUSABLE)
				? current
				: document.querySelector<HTMLElement>(FOCUSABLE);

		if (toFocus) {
			toFocus.focus();
			toFocus.scrollIntoView({
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
				dialog.open('exit');
			}
		}
	}

	$effect(() => {
		info('Launched');
		tick().then(() => {
			spatialNavigate();
		});
	});
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
