<script lang="ts">
	import { getCurrentWindow } from '@tauri-apps/api/window';
	import { getNextFocus } from '@bbc/tv-lrud-spatial';
	import { app_manager } from '$lib/manager.svelte';
	import { dev } from '$app/environment';
	import { apps } from '../lib/apps';

	const tauri_window = getCurrentWindow();

	if (dev) {
		tauri_window.setFullscreen(false);
	}

	let online = $state(false);

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
	}
</script>

<svelte:window {onkeydown} bind:online />

<section>
	<h1>wtv</h1>
</section>

<section class="apps">
	{#each apps as app}
		<button class="app" onclick={() => app_manager.run(app)}>
			<img src={app.cover_image} alt="{app.name} cover image" />
		</button>
	{/each}
</section>

{#if !online}
	<h4 class="offline">You're offline :(</h4>
{/if}

<style lang="scss">
	.apps {
		display: flex;
		overflow-x: auto;
		gap: 8px;

		scroll-snap-type: x mandatory;
	}

	.offline {
		position: fixed;
		bottom: 32px;
		left: 50%;
		transform: translateX(-50%);

		text-align: center;
		color: var(--red);
	}

	.app {
		display: block;
		overflow: clip;
		flex-shrink: 0;
		padding: 0px;

		background-color: transparent;
		border-radius: 12px;
		border: 12px solid transparent;

		scroll-snap-align: end;

		&:focus {
			border-color: var(--primary);
		}

		img {
			width: 650px;
			height: auto;
			aspect-ratio: 16 / 9;
			border-radius: 12px;
			object-fit: cover;
		}
	}
</style>
