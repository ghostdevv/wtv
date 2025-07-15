<script lang="ts">
	import { APP_CATEGORIES } from '$lib/app-categories';
	import AppButton from '../AppButton.svelte';
	import { home } from '$lib/home.svelte';
	import { registry } from '$lib/apps';

	function tab_title_case(label: string) {
		if (label === 'wtv') {
			return 'wtv';
		}

		return label
			.replaceAll('-', ' ')
			.replaceAll('and', '&')
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	const TABS = ['all', ...APP_CATEGORIES] as const;

	let active_tab = $state<(typeof TABS)[number]>('all');

	let apps = $derived.by(() => {
		switch (active_tab) {
			case 'all':
				return registry.list();
			default:
				return registry.filter_by_category(active_tab);
		}
	});
</script>

<div class="manage">
	<div class="sidebar">
		{#each TABS as tab}
			<button
				class="tab"
				class:secondary={active_tab != tab}
				onclick={() => (active_tab = tab)}
			>
				{tab_title_case(tab)}
			</button>
		{/each}
	</div>

	<div class="apps">
		{#each apps as app (app.id)}
			<AppButton
				{app}
				displayHomeStatus
				onclick={() => home.toggle(app.id)}
			/>
		{:else}
			<h6>No Apps Left :(</h6>
		{/each}
	</div>
</div>

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
