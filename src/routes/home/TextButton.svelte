<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		outline?: boolean;
		children: Snippet;
		onclick?: () => void;
	}

	let { outline = false, children, onclick }: Props = $props();
</script>

<button class="app" {onclick}>
	<div class="content" class:outline>
		{@render children?.()}
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
			background-color: var(--background-secondary);

			&.outline {
				border: 8px solid var(--background-secondary);
				background-color: var(--background-primary) !important;
			}
		}
	}
</style>
