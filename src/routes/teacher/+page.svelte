<script lang="ts">
	import Icon from '@iconify/svelte';
	import api from '$lib/api';
	import { jsDateToHumanDate } from '$lib/utils';
	import '$css/table.css';

	let selection: string[] = [];

	let teacherModulesPromise = api.getTeacherModules();

	async function bulkDelete() {
		await api.deleteTeacherModules(selection);
		teacherModulesPromise = api.getTeacherModules();
	}
</script>

<div class="text-column">
	<h3>Modules</h3>

	{#await teacherModulesPromise}
		<p class="p-white">...loading</p>
	{:then modules}
		<div class="mb-3 row">
			<span class="col-sm-1">Bulk actions:</span>
			<button type="button" on:click={bulkDelete} class="col-sm-1 btn btn-danger"
				>Delete</button
			>
		</div>

		<table class="table">
			<thead>
				<tr>
					<th scope="col" />
					<th scope="col">ID</th>
					<th scope="col">Name</th>
					<th scope="col">Start</th>
					<th scope="col">Stop</th>
					<th scope="col">Assignment count</th>
				</tr>
			</thead>
			<tbody>
				{#each modules as module}
					<tr>
						<td><input type="checkbox" bind:group={selection} value={module.id} /></td>
						<th scope="row"><a href="/teacher/module/{module.id}">{module.id}</a></th>
						<td><a href="/teacher/module/{module.id}">{module.name}</a></td>
						<td>{jsDateToHumanDate(module.start)}</td>
						<td>{jsDateToHumanDate(module.stop)}</td>
						<td>{module.assignment_count}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
	<div>
		<a href="/teacher/module/new"><Icon icon="typcn:plus" inline /> Create a new Module</a>
	</div>
</div>

<style>
</style>
