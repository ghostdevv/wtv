<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children()}

<style lang="scss">
	:global(html) {
		border: 2px solid var(--background-tertiary);
		box-shadow: 0px 0px 18px 2px var(--background-tertiary) inset;
		border-radius: 12px;
	}
</style>
