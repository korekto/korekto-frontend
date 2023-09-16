<script lang="ts">
	import { goto } from '$app/navigation';
	import type { TeacherModule, TeacherModuleForm } from '$lib/types';
	import { createTeacherModule } from '$lib/api';
	import Module from './../Module.svelte';

	let module: TeacherModule = {
		assignments: []
	};

	const onSave = async (m: TeacherModuleForm) => {
		let module = await createTeacherModule(m);
		goto(`/teacher/module/${module.id}`);
	};
</script>

<div class="text-column">
	<h3>New module</h3>

	<Module {module} {onSave} />
</div>

<style>
</style>
