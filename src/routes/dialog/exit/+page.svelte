<script lang="ts">
	import { error } from '@tauri-apps/plugin-log';
	import { invoke } from '@tauri-apps/api/core';

	let disabled = $state(false);

	const COMMANDS = ['logout', 'shutdown', 'reboot'];

	async function exec(command: string) {
		disabled = true;

		try {
			await invoke(command);
		} catch (e) {
			error(`${command} failed: ${e}`);
		} finally {
			disabled = false;
		}
	}
</script>

<div class="actions">
	{#each COMMANDS as command}
		<button class="secondary" onclick={() => exec(command)} {disabled}>
			{command}
		</button>
	{/each}
</div>

<style lang="scss">
	.actions {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;

		button {
			text-transform: capitalize;
		}
	}
</style>
