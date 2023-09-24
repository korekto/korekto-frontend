<script lang="ts">
	import Module from './Module.svelte';
	import type { ModuleType } from './module.type';

	let userModules: ModuleType[] = [
		{
			id: '6d8c3b5b-9e68-4b25-85a1-96a000b1701d',
			name: 'Java 101',
			start: '2023-03-10T14:05:44Z',
			stop: '2023-05-21T14:05:44Z',
			repos_to_create: 4,
			user_repos: 2,
			grade: 0,
			latest_update: '2023-03-22T14:05:44Z',
			locked: true
		},
		{
			id: 'e82f14b5-ea18-4950-b990-b7151cb4cddc',
			name: 'Java 201',
			start: '2023-03-10T14:05:44Z',
			stop: '2023-05-21T14:05:44Z',
			repos_to_create: 4,
			user_repos: 2,
			grade: 6,
			latest_update: '2023-03-22T14:05:44Z',
			locked: false
		}
	];
</script>

<div class="text-column">
	<div class="panel">
		{#each userModules as module (module.id)}
			<Module {module} />
		{/each}
	</div>
</div>

<style>
	.panel {
		display: flex;
		flex-direction: column;
		padding: 100px;
	}
</style>
