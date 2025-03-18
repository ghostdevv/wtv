<script lang="ts">
	import { invoke } from '@tauri-apps/api/core';

	let disabled = $state(false);

	async function logout() {
		disabled = true;

		try {
			await invoke('logout');
		} catch (e) {
			console.error('logout failed:', e);
		} finally {
			disabled = false;
		}
	}
</script>

<div class="actions">
	<button class="secondary" onclick={logout} {disabled}>Logout</button>
</div>

<style lang="scss">
	.actions {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
