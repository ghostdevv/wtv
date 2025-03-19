<script lang="ts">
	import AppButton from '../AppButton.svelte';
	import { wtv_apps } from '$lib/wtv-apps';
	import { home } from '$lib/home.svelte';

	// const wtv_apps_filtered = $derived(
	// 	wtv_apps.filter((app) => !home.list.includes(app.id)),
	// );

	const TABS = ['all', 'wtv'] as const;
	let active_tab = $state<(typeof TABS)[number]>('all');

	let apps = $derived.by(() => {
		switch (active_tab) {
			case 'all':
				return wtv_apps;
			case 'wtv':
				return wtv_apps;
		}
	});
</script>

<div class="manage">
	<div class="sidebar">
		{#each TABS as tab}
			<button
				class="tab"
				class:secondary={active_tab != tab}
				onclick={() => (active_tab = tab)}>
				{tab}
			</button>
		{/each}
	</div>

	<div class="apps">
		{#each apps as app (app.id)}
			<AppButton
				{app}
				displayHomeStatus
				onclick={() => home.toggle(app.id)} />
		{:else}
			<h6>No Apps Left :(</h6>
		{/each}
	</div>
</div>

<!-- <section class="col">
</section> -->

<style lang="scss">
	.manage {
		display: grid;
		grid-template-columns: 200px 1fr;
		grid-template-rows: 1fr;
		max-height: 100%;
		height: 100%;

		.sidebar {
			display: flex;
			flex-direction: column;
			gap: 12px;

			background-color: var(--background-secondary);
			border-radius: 12px;
			padding: 12px;

			.tab {
				text-transform: capitalize;
			}
		}

		.apps {
			display: flex;
			flex-wrap: wrap;
			overflow-y: auto;
			scroll-snap-type: y mandatory;
			gap: 8px;

			height: 100%;
			max-height: 100%;
			padding: 0px 12px;
		}
	}
</style>
