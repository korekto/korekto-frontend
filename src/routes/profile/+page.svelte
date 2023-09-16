<script lang="ts">
	import * as yup from 'yup';
	import type { ProfileInfo } from '$lib/types';
	import { createHeadlessForm } from '$lib/form';
	import type { YupErrors } from '$lib/form';
	import '$css/form.css';
	import '$css/grid.css';

	const schema: yup.ObjectSchema<ProfileInfo> = yup.object({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		schoolClass: yup.string().required(),
		schoolEmail: yup.string().required().email()
	});

	let errors: YupErrors = {};

	const form = createHeadlessForm<ProfileInfo>(
		schema,
		(v) => alert(JSON.stringify(v, null, 2)),
		(err) => (errors = err),
		{}
	);
</script>

<div class="text-column">
	<h1>Profile</h1>

	<form on:submit|preventDefault={form.submitHandler}>
		<div class="row">
			<label class="col-input" for="firstName">First name</label>
			<input class="col-auto" type="text" id="firstName" bind:value={form.values.firstName} />
			{#if errors.firstName}<div class="error">Required</div>
				>{/if}
		</div>
		<div class="row">
			<label class="col-input" for="lastName">Last name</label>
			<input class="col-auto" type="text" id="lastName" bind:value={form.values.lastName} />
			{#if errors.lastName}<div class="error">Required</div>{/if}
		</div>
		<div class="row">
			<label class="col-input" for="schoolClass">Class</label>
			<input
				class="col-auto"
				type="text"
				id="schoolClass"
				bind:value={form.values.schoolClass}
			/>
			{#if errors.schoolClass}<div class="error">Required</div>{/if}
		</div>
		<div class="row">
			<label class="col-input" for="schoolEmail">School email</label>
			<input
				class="col-auto"
				type="email"
				id="schoolEmail"
				bind:value={form.values.schoolEmail}
			/>
			{#if errors.schoolEmail}<div class="error">Invalid</div>{/if}
		</div>
		<div class="row">
			<div class="col-input" />
			<button>Save</button>
		</div>
	</form>
</div>
