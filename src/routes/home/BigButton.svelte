<script lang="ts">
	import type { App } from '$lib/apps';
	import { home } from '$lib/home.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		outline?: boolean;
		selected?: boolean;
		onclick?: () => void;
		children: Snippet;
	}

	let { title, onclick, children, outline, selected }: Props = $props();
</script>

<button {onclick} {title} class:outline class:selected>
	{@render children()}
</button>

<style lang="scss">
	button {
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
		background-color: var(--button-bg-colour, var(--background-secondary));

		&:focus:not(&:disabled),
		&:hover:not(&:disabled) {
			border-color: var(--primary);
			background-color: var(
				--button-bg-colour,
				var(--background-secondary)
			);
		}

		&.outline {
			border-color: var(--background-secondary);
			background-color: var(--background-primary) !important;
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
		}
	}
</style>
