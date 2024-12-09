<script lang="ts">
	import * as yup from 'yup';
	import type { TeacherAssignment, TeacherAssignmentForm } from '$lib/types';
	import { createHeadlessForm } from '$lib/form';
	import type { YupErrors } from '$lib/form';
	import { DateInput } from 'date-picker-svelte';
	import '$css/form.css';
	import '$css/grid.css';

	export let assignment: TeacherAssignment;
	export let onSave: (m: TeacherAssignmentForm) => void;

	const schema: yup.ObjectSchema<TeacherAssignmentForm> = yup.object({
		type: yup.string().required(),
		name: yup.string().required(),
		start: yup.date().required(),
		stop: yup.date().required(),
		description: yup.string().required(),
		subject_url: yup.string().required(),
		grader_url: yup.string().required(),
		repository_name: yup.string().required(),
		factor_percentage: yup.number().required(),
		grader_run_url: yup.string().required(),
		hidden_by_teacher: yup.boolean().required(),
		grader_cli_v2: yup.boolean().required()
	});

	let errors: YupErrors = {};

	const form = createHeadlessForm<TeacherAssignmentForm>(
		schema,
		onSave,
		(err) => (errors = err),
		assignment
	);
</script>

<form on:submit|preventDefault={form.submitHandler}>
	<div class="row">
		<label class="col-input" for="type">Type</label>
		<select class="col-auto" bind:value={form.values.type}>
			<option value="EXERCISE">Exercise</option>
			<option value="PROJECT">Project</option>
		</select>
		{#if errors.type}<div class="error">Required</div>
			>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="hidden">Hidden</label>
		<input
			class="col-auto"
			type="checkbox"
			id="hidden"
			bind:checked={form.values.hidden_by_teacher}
		/>
	</div>
	<div class="row">
		<label class="col-input" for="name">Name</label>
		<input class="col-auto" type="text" id="name" bind:value={form.values.name} />
		{#if errors.name}<div class="error">Required</div>
			>{/if}
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
		<label class="col-input" for="description">Description</label>
		<input class="col-auto" type="text" id="description" bind:value={form.values.description} />
		{#if errors.description}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="subject_url">Subject URL</label>
		<input class="col-auto" type="text" id="subject_url" bind:value={form.values.subject_url} />
		{#if errors.subject_url}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="grader_url">Grader URL</label>
		<input class="col-auto" type="text" id="grader_url" bind:value={form.values.grader_url} />
		{#if errors.grader_url}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="grader_cli_v2">Grader CLI v2</label>
		<input
			class="col-auto"
			type="checkbox"
			id="grader_cli_v2"
			bind:checked={form.values.grader_cli_v2}
		/>
	</div>
	<div class="row">
		<label class="col-input" for="repository_name">Repository name</label>
		<input
			class="col-auto"
			type="text"
			id="repository_name"
			bind:value={form.values.repository_name}
		/>
		{#if errors.repository_name}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="factor_percentage">Factor %</label>
		<input
			class="col-auto"
			type="number"
			id="factor_percentage"
			bind:value={form.values.factor_percentage}
			min="1"
			max="100"
		/>
		{#if errors.factor_percentage}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<label class="col-input" for="grader_run_url">Grader run URL</label>
		<input
			class="col-auto"
			type="text"
			id="grader_run_url"
			bind:value={form.values.grader_run_url}
		/>
		{#if errors.grader_run_url}<div class="error">Required</div>{/if}
	</div>
	<div class="row">
		<div class="col-input" />
		<button>Save</button>
	</div>
</form>
