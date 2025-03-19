<script lang="ts">
	import { online } from 'svelte/reactivity/window';
	import { registry, launcher } from '$lib/apps';
	import TextButton from './TextButton.svelte';
	import AppButton from './AppButton.svelte';
	import { home } from '$lib/home.svelte';
	import { goto } from '$app/navigation';
</script>

<section>
	<h1>wtv</h1>
</section>

<section class="apps">
	{#each home.list as app_id (app_id)}
		{@const app = registry.find(app_id)}

		{#if app}
			<AppButton {app} onclick={() => launcher.launch(app_id)} />
		{:else}
			<TextButton>
				<h4>"{app_id}" not found</h4>
			</TextButton>
		{/if}
	{/each}

	<TextButton onclick={() => goto('/home/manage')} outline>
		<h4>+</h4>
	</TextButton>
</section>

{#if !online.current}
	<h4 class="offline">You're offline :(</h4>
{/if}

<style lang="scss">
	.apps {
		display: flex;
		overflow-x: auto;
		gap: 8px;

		scroll-snap-type: x mandatory;
	}

	.offline {
		position: fixed;
		bottom: 32px;
		left: 50%;
		transform: translateX(-50%);

		text-align: center;
		color: var(--red);
	}
</style>
