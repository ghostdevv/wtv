<script lang="ts">
	import type { App } from '$lib/apps';
	import { home } from '$lib/home.svelte';

	interface Props {
		app: App;
		displayHomeStatus?: boolean;
		onclick: () => void;
	}

	let { app, onclick, displayHomeStatus }: Props = $props();
	let imageError = $state(false);
</script>

<button
	class="app"
	{onclick}
	title={app.name}
	class:selected={displayHomeStatus && home.list.includes(app.id)}
	style:--app-bg-colour={app.background_colour}>
	{#if app.icon && !imageError}
		<img
			src={app.icon}
			alt="{app.id} cover image"
			onerror={() => (imageError = true)} />
	{:else}
		<p class="name">{app.name}</p>
	{/if}
</button>

<style lang="scss">
	.app {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		scroll-snap-align: end;

		width: 650px;
		height: fit-content;
		aspect-ratio: 16 / 9;
		/* overflow: clip; */

		padding: 0px;
		border-radius: 22px;

		border: 12px solid transparent;
		background-color: var(--app-bg-colour, var(--background-secondary));

		&:focus:not(&:disabled),
		&:hover:not(&:disabled) {
			border-color: var(--primary);
			background-color: var(--app-bg-colour, var(--background-secondary));
		}

		img {
			min-height: 80px;
			max-height: 140px;
			width: auto;
			max-width: 280px;
			border-radius: 12px;
			object-fit: contain;
		}

		.name {
			font-size: 1.2rem;
			max-width: 80%;
		}

		&.selected {
			position: relative;

			&:after {
				width: calc(100% + 24px);
				height: calc(100% + 24px);
				display: grid;
				place-items: center;

				content: '✓';
				position: absolute;
				top: -12px;
				left: -12px;

				font-size: 2rem;
				color: var(--green);

				background-color: rgba(var(--background-tertiary-rgb), 0.5);
				border-radius: 22px;
			}

			img {
				opacity: 0.8;
				filter: blur(8px);
			}
		}
	}
</style>
