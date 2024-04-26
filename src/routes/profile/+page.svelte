<script lang="ts">
	import * as yup from 'yup';
	import { UserStore } from '$lib/stores';
	import type { ProfileInfo } from '$lib/types';
	import { createHeadlessForm } from '$lib/form';
	import type { YupErrors } from '$lib/form';
	import api from '$lib/api';

	import '$css/form.css';
	import '$css/grid.css';

	const schema: yup.ObjectSchema<ProfileInfo> = yup.object({
		firstname: yup.string().required(),
		lastname: yup.string().required(),
		school_group: yup.string().required(),
		school_email: yup.string().required().email()
	});

	let errors: YupErrors = {};

	const form = createHeadlessForm<ProfileInfo>(
		schema,
		api.saveProfile,
		(err) => (errors = err),
		$UserStore
	);
</script>

<div class="text-column">
	<h1>Profile</h1>

	<form on:submit|preventDefault={form.submitHandler}>
		<div class="row">
			<label class="col-input" for="firstname">Firstname</label>
			<input class="col-auto" type="text" id="firstname" bind:value={form.values.firstname} />
			{#if errors.first_name}<div class="error">Required</div>
				>{/if}
		</div>
		<div class="row">
			<label class="col-input" for="lastname">Lastname</label>
			<input class="col-auto" type="text" id="lastname" bind:value={form.values.lastname} />
			{#if errors.lastname}<div class="error">Required</div>{/if}
		</div>
		<div class="row">
			<label class="col-input" for="school_group">Class</label>
			<input
				class="col-auto"
				type="text"
				id="school_group"
				bind:value={form.values.school_group}
			/>
			{#if errors.school_group}<div class="error">Required</div>{/if}
		</div>
		<div class="row">
			<label class="col-input" for="school_email">School email</label>
			<input
				class="col-auto"
				type="email"
				id="school_email"
				bind:value={form.values.school_email}
			/>
			{#if errors.school_email}<div class="error">Invalid</div>{/if}
		</div>
		<div class="row">
			<div class="col-input" />
			<button>Save</button>
		</div>
	</form>
</div>
