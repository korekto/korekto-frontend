<script lang="ts">
	import * as yup from 'yup';
	import type { TeacherModule, TeacherModuleForm } from '$lib/types';
	import { createHeadlessForm } from '$lib/form';
	import type { YupErrors } from '$lib/form';
	import { DateInput } from 'date-picker-svelte';
	import '$css/form.css';
	import '$css/grid.css';

	export let module: TeacherModule;
	export let onSave: (m: TeacherModuleForm) => void;

	const schema: yup.ObjectSchema<TeacherModuleForm> = yup.object({
		name: yup.string().required(),
		description: yup.string().required(),
		start: yup.date().required(),
		stop: yup.date().required(),
		unlock_key: yup.string().required(),
		source_url: yup.string().required()
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
		{#if errors.name}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="description">Description</label>
		<input class="col-auto" type="text" id="description" bind:value={form.values.description} />
		{#if errors.description}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="start">Start</label>
		<DateInput class="col-auto" id="start" bind:value={form.values.start} />
		{#if errors.start}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="stop">Stop</label>
		<DateInput class="col-auto" id="stop" bind:value={form.values.stop} />
		{#if errors.stop}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="unlock_key">Unlock key</label>
		<input class="col-auto" type="text" id="unlock_key" bind:value={form.values.unlock_key} />
		{#if errors.unlock_key}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="source_url">Source URL</label>
		<input class="col-auto" type="text" id="source_url" bind:value={form.values.source_url} />
		{#if errors.source_url}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<div class="col-input" />
		<button>Save</button>
	</div>
</form>
