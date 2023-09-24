<script lang="ts">
	import * as yup from 'yup';
	import type { TeacherModule, TeacherModuleForm } from '$lib/types';
	import { createHeadlessForm } from '$lib/form';
	import type { YupErrors } from '$lib/form';
	import '$css/form.css';
	import '$css/grid.css';

	export let module: TeacherModule;
	export let onSave: (m: TeacherModuleForm) => void;

	const schema: yup.ObjectSchema<TeacherModuleForm> = yup.object({
		name: yup.string().required(),
		start: yup.string().required(),
		stop: yup.string().required(),
		unlock_key: yup.string().required()
	});

	let errors: YupErrors = {};

	const form = createHeadlessForm<TeacherModuleForm>(
		schema,
		onSave,
		(err) => (errors = err),
		module
	);
</script>

<form on:submit|preventDefault={form.submitHandler}>
	<div class="row">
		<label class="col-input" for="name">Name</label>
		<input class="col-auto" type="text" id="name" bind:value={form.values.name} />
		{#if errors.name}<div class="error">Required</div>
			>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="start">Start</label>
		<input class="col-auto" type="datetime-local" id="start" bind:value={form.values.start} />
		{#if errors.start}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="stop">Stop</label>
		<input class="col-auto" type="datetime-local" id="stop" bind:value={form.values.stop} />
		{#if errors.stop}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="schoolEmail">Unlock key</label>
		<input class="col-auto" type="text" id="unlock_key" bind:value={form.values.unlock_key} />
		{#if errors.unlock_key}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<div class="col-input" />
		<button>Save</button>
	</div>
</form>
