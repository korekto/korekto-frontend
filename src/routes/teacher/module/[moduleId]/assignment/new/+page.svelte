<script lang="ts">
	import { goto } from '$app/navigation';
	import type { TeacherAssignment, TeacherAssignmentForm } from '$lib/types';
	import api from '$lib/api';
	import Assignment from './../Assignment.svelte';

	export let data;

	let assignment: TeacherAssignment = {
		hidden_by_teacher: false,
		grader_cli_v2: false
	};

	const onSave = async (a: TeacherAssignmentForm) => {
		let assignment = await api.createTeacherAssignment(data.moduleId, a);
		await goto(`/teacher/module/${data.moduleId}/assignment/${assignment.id}`);
	};
</script>

<div class="text-column">
	<h3>New assignment</h3>

	<Assignment {assignment} {onSave} />
</div>

<style>
</style>
