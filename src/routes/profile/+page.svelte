<script>
	import * as yup from 'yup';

	const regSchema = yup.object().shape({
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		schoolClass: yup.string().required(),
		schoolEmail: yup.string().required().email()
	});

	const extractErrors = (err) => {
		return err.inner.reduce((acc, err) => {
			return { ...acc, [err.path]: err.message };
		}, {});
	};

	let values = {};
	let errors = {};
	const submitHandler = () => {
		regSchema
			.validate(values, { abortEarly: false })
			.then(() => {
				errors = {};
				alert(JSON.stringify(values, null, 2));
			})
			.catch((err) => (errors = extractErrors(err)));
	};
</script>

<div class="text-column">
	<h1>Profile</h1>

	<form on:submit|preventDefault={submitHandler}>
		<div class="row">
			<label class="col-input" for="firstName">First name</label>
			<input class="col-auto" type="text" id="firstName" bind:value={values.firstName} />
			{#if errors.firstName}<div class="error">Required</div>
				>{/if}
		</div>
		<div class="row">
			<label class="col-input" for="lastName">Last name</label>
			<input class="col-auto" type="text" id="lastName" bind:value={values.lastName} />
			{#if errors.lastName}<div class="error">Required</div>{/if}
		</div>
		<div class="row">
			<label class="col-input" for="schoolClass">Class</label>
			<input class="col-auto" type="text" id="schoolClass" bind:value={values.schoolClass} />
			{#if errors.schoolClass}<div class="error">Required</div>{/if}
		</div>
		<div class="row">
			<label class="col-input" for="schoolEmail">School email</label>
			<input class="col-auto" type="email" id="schoolEmail" bind:value={values.schoolEmail} />
			{#if errors.schoolEmail}<div class="error">Invalid</div>{/if}
		</div>
		<div class="row">
			<div class="col-input" />
			<button>Save</button>
		</div>
	</form>
</div>

<style>
	.row {
		display: flex;
	}
	.row + .row {
		margin-top: 20px;
	}
	.col-input {
		flex: 0 0 auto;
		width: 16.66666667%;
		text-align: end;
		padding-right: 20px;
	}
	.col-auto {
		flex: 0 0 auto;
		width: auto;
	}
	.error {
		color: red;
		padding-left: 15px;
	}
	input {
		border-radius: 5px;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		appearance: none;
		border: 1 solid #dee2e6;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}
	button {
		text-decoration: none;
		user-select: none;
		border: 1px solid #0d6efd;
		border-radius: 5px;
		background-color: #0d6efd;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		color: #fff;
		padding: 0.375rem 0.75rem;
	}
	button:hover {
		color: #fff;
		background-color: #0b5ed7;
		border-color: #0a58ca;
	}
	button:not(:disabled) {
		cursor: pointer;
	}
	:global(.invalid) {
		border: 1px solid red;
	}

	:global(.valid) {
		border: 1px solid green;
	}

	:global(.dirty) {
		border: 1px dashed black;
	}
</style>
