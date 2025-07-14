<script lang="ts">
	import type { App } from '$lib/apps';
	import { home } from '$lib/home.svelte';

	interface Props {
		app: App;
		displayHomeStatus?: boolean;
		onclick: () => void;
	}

	let { app, onclick, displayHomeStatus }: Props = $props();
</script>

<button
	class="app"
	{onclick}
	title={app.name}
	class:selected={displayHomeStatus && home.list.includes(app.id)}>
	<div class="content" style:--app-bg-colour={app.background_colour}>
		{#if app.icon}
			<img src={app.icon} alt="{app.id} cover image" />
		{:else}
			<p class="name">{app.name}</p>
		{/if}
	</div>
</button>

<style lang="scss">
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

		.content {
			width: 650px;
			height: auto;
			aspect-ratio: 16 / 9;
			border-radius: 12px;

			display: grid;
			place-items: center;
			background-color: var(--app-bg-colour, var(--background-secondary));

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
		}

		&.selected {
			position: relative;

			&:after {
				width: 100%;
				height: 100%;
				display: grid;
				place-items: center;

				content: '✓';
				position: absolute;
				top: 0;
				left: 0;

				font-size: 2rem;
				color: var(--green);

				background-color: rgba(var(--background-tertiary-rgb), 0.5);
				border-radius: 12px;
			}

			img {
				opacity: 0.8;
				filter: blur(8px);
			}
		}
	}

	/* .app {
		&.selected {
			position: relative;

			&:after {
				width: 100%;
				height: 100%;
				display: grid;
				place-items: center;

				content: '✓';
				position: absolute;
				top: 0;
				left: 0;

				font-size: 2rem;
				color: var(--green);

				background-color: rgba(var(--background-tertiary-rgb), 0.5);
				border-radius: 12px;
			}

			img {
				opacity: 0.8;
				filter: blur(8px);
			}
		}
	} */
</style>
