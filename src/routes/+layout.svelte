<script lang="ts">
	import 'ghostsui';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children()}
