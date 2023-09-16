<script lang="ts">
	import { goto } from '$app/navigation';
	import type { TeacherAssignment, TeacherAssignmentForm } from '$lib/types';
	import { createTeacherAssignment } from '$lib/api';
	import Assignment from './../Assignment.svelte';

	export let data;

	let assignment: TeacherAssignment = {};

	const onSave = async (a: TeacherAssignmentForm) => {
		let assignment = await createTeacherAssignment(data.moduleId, a);
		goto(`/teacher/module/${data.moduleId}/assignment/${assignment.id}`);
	};
</script>

<div class="text-column">
	<h3>New assignment</h3>

	<Assignment {assignment} {onSave} />
</div>

<style>
</style>
