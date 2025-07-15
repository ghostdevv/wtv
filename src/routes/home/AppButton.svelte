<script lang="ts">
	import BigButton from './BigButton.svelte';
	import { home } from '$lib/home.svelte';
	import type { App } from '$lib/apps';

	interface Props {
		app: App;
		displayHomeStatus?: boolean;
		onclick?: () => void;
	}

	let { app, onclick, displayHomeStatus }: Props = $props();
	let selected = $derived(displayHomeStatus && home.list.includes(app.id));
	let imageError = $state(false);
</script>

<BigButton
	{onclick}
	{selected}
	title={app.name}
	--button-bg-colour={app.background_colour}>
	{#if app.icon && !imageError}
		<img
			class:selected
			src={app.icon}
			alt="{app.id} cover image"
			onerror={() => (imageError = true)} />
	{:else}
		<p class="name">{app.name}</p>
	{/if}
</BigButton>

<style lang="scss">
	img {
		min-height: 80px;
		max-height: 140px;
		width: auto;
		max-width: 280px;
		border-radius: 12px;
		object-fit: contain;

		&.selected {
			opacity: 0.8;
			filter: blur(8px);
		}
	}

	.name {
		font-size: 1.2rem;
		max-width: 80%;
	}
</style>
