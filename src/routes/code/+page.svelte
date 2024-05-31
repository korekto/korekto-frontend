<script lang="ts">
	import api from '$lib/api';
	import '$css/form.css';
	import '$css/grid.css';

	export let on_refresh_menu = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

	let code: string | undefined = undefined;

	const submitHandler = async () => {
		if (code !== undefined) {
			await api.redeemCode(code);
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
