<script lang="ts">
	import { online } from 'svelte/reactivity/window';
	import { registry, launcher } from '$lib/apps';
	import BigButton from './BigButton.svelte';
	import AppButton from './AppButton.svelte';
	import { home } from '$lib/home.svelte';
	import { goto } from '$app/navigation';
	import { format } from 'date-fns';
	import { SvelteDate } from 'svelte/reactivity';

	const now = new SvelteDate();

	$effect(() => {
		const interval = setInterval(() => {
			now.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<section class="head">
	<h1>wtv</h1>
	<h4>{format(now.getTime(), 'HH:mm')}</h4>
</section>

<section class="apps">
	{#each home.list as app_id (app_id)}
		{@const app = registry.find(app_id)}

		{#if app}
			<AppButton {app} onclick={() => launcher.launch(app_id)} />
		{:else}
			<BigButton onclick={() => home.remove(app_id)}>
				<h4>"{app_id}" not found</h4>
			</BigButton>
		{/if}
	{/each}

	<BigButton onclick={() => goto('/home/manage')} outline>
		<h4>+</h4>
	</BigButton>
</section>

{#if !online.current}
	<h4 class="offline">You're offline :(</h4>
{/if}

<style lang="scss">
	.apps {
		display: flex;
		overflow-x: auto;
		gap: 16px;

		scroll-snap-type: x mandatory;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
