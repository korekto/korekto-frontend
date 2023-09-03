<script lang="ts">
    import { redeemCode } from '$lib/api';

    export let on_refresh_menu = () => {};

	let code: string | undefined = undefined;

	const submitHandler = async () => {
        if (code !== undefined) {
            await redeemCode(code);
            on_refresh_menu();
        }
	};
</script>

<div class="text-column">
	<h1>Redeem Code</h1>

	<form on:submit|preventDefault={submitHandler}>
		<div class="row">
			<label class="col-input" for="code">Code</label>
			<input class="col-auto" type="text" id="code" bind:value={code} />
		</div>
		<div class="row">
			<div class="col-input" />
			<button>Redeem</button>
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
	input {
		border-radius: 5px;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		appearance: none;
		border: 1px solid #dee2e6;
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
