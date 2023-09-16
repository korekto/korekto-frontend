<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { TeacherModule, TeacherModuleForm } from '$lib/types';
	import { getTeacherModule, updateTeacherModule, deleteTeacherAssignments } from '$lib/api';
	import { jsDateToHumanDate, jsDateToHumanTime } from '$lib/utils';
	import Module from './../Module.svelte';
	import '$css/table.css';

	export let data;

	let selection: string[] = [];

	let teacherModulePromise = getTeacherModule(data.moduleId);

	const onSave = async (m: TeacherModuleForm) => {
		await updateTeacherModule(data.moduleId, m);
		teacherModulePromise = getTeacherModule(data.moduleId);
	};

	async function bulkDelete() {
		await deleteTeacherAssignments(data.moduleId, selection);
		teacherModulePromise = getTeacherModule(data.moduleId);
	}
</script>

<div class="text-column">
	<h3>Edit module</h3>

	<a href="/teacher" class="link blue">
		<Icon icon="ic:baseline-arrow-back" inline />
		Back to Module list
	</a>

	{#await teacherModulePromise}
		<p class="p-white">...loading</p>
	{:then module}
		<Module {module} {onSave} />

		<h4>Assignments</h4>
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
					<th scope="col">Type</th>
					<th scope="col">Name</th>
					<th scope="col">Start</th>
					<th scope="col">End</th>
					<th scope="col">Factor</th>
				</tr>
			</thead>
			<tbody>
				{#each module.assignments as assignment}
					<tr>
						<td
							><input
								type="checkbox"
								bind:group={selection}
								value={assignment.id}
							/></td
						>
						<th scope="row"
							><a href="/teacher/module/{module.id}/assignment/{assignment.id}"
								>{assignment.id}</a
							></th
						>
						<td>{assignment.type}</td>
						<td
							><a href="/teacher/module/{module.id}/assignment/{assignment.id}"
								>{assignment.name}</a
							></td
						>
						<td>{jsDateToHumanDate(assignment.start)}</td>
						<td>{jsDateToHumanDate(assignment.end)}</td>
						<td>{assignment.factor_percentage} %</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div>
			<a href="/teacher/module/{module.id}/assignment/new"
				><Icon icon="typcn:plus" inline /> Create a new Assignment</a
			>
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>
