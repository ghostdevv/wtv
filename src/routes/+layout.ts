import { registry } from '$lib/apps';

export const ssr = false;

export async function load() {
	await registry.populate();
	return {};
}
