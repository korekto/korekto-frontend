<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import api from '$lib/api';
	import type { TeacherAssignmentForm } from '$lib/types';
	import Assignment from './../Assignment.svelte';

	export let data;

	let assignmentPromise = api.getTeacherAssignment(data.moduleId, data.assignmentId);

	const onSave = async (m: TeacherAssignmentForm) => {
		await api.updateTeacherAssignment(data.moduleId, data.assignmentId, m);
		await goto(`/teacher/module/${data.moduleId}/`);
	};
</script>

<div class="text-column">
	<h3>Edit assignment</h3>

	<a href="/teacher/module/{data.moduleId}" class="link blue">
		<Icon icon="ic:baseline-arrow-back" inline />
		Back to Module
	</a>

	{#await assignmentPromise}
		<p class="p-white">...loading</p>
	{:then assignment}
		<Assignment {assignment} {onSave} />
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>
