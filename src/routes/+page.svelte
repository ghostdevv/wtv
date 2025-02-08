<script lang="ts">
	import { getCurrentWindow } from '@tauri-apps/api/window';
	import { app_manager } from '$lib/manager.svelte';
	import { dev } from '$app/environment';
	import { apps } from '../lib/apps';

	const tauri_window = getCurrentWindow();

	if (dev) {
		tauri_window.setFullscreen(false);
	}
</script>

<section>
	<h1>wtv</h1>
</section>

<section>
	<div class="apps">
		{#each apps as app}
			<button class="app" onclick={() => app_manager.run(app)}>
				<img src={app.cover_image} alt="{app.name} cover image" />
			</button>
		{/each}
	</div>
</section>

<style>
	.app {
		display: block;
		overflow: clip;

		width: 500px;
		height: 281px;
		padding: 0px;

		background-color: transparent;
		border-radius: 12px;
		border: none;

		transition: 0.2s outline ease-in-out;

		&:focus-visible {
			outline: 4px solid var(--primary) !important;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
