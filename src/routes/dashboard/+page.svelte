<script lang="ts">
	import Module from './Module.svelte';
	import type { ModuleType } from './module.type';

	let userModules: ModuleType[] = [
		{
			id: '6d8c3b5b-9e68-4b25-85a1-96a000b1701d',
			name: 'Java 101',
			start: new Date('2023-03-10'),
			end: new Date('2023-05-21'),
			repos_to_create: 4,
			user_repos: 2,
			grade: 0,
			latest_update: new Date('2023-03-22'),
			locked: true
		},
		{
			id: 'e82f14b5-ea18-4950-b990-b7151cb4cddc',
			name: 'Java 201',
			start: new Date('2023-03-10'),
			end: new Date('2023-05-21'),
			repos_to_create: 4,
			user_repos: 2,
			grade: 6,
			latest_update: new Date('2023-03-22'),
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
