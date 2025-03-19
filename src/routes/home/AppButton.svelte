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
	class:selected={displayHomeStatus && home.list.includes(app.id)}>
	<img src={app.cover_image} alt="{app.id} cover image" />
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

		img {
			width: 650px;
			height: auto;
			aspect-ratio: 16 / 9;
			border-radius: 12px;
			object-fit: cover;
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
</style>
