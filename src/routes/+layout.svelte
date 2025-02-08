<script lang="ts">
	import 'ghostsui';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		padding: 12px 16px;
	}
</style>
