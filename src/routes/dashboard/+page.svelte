<script lang="ts">
	import ModuleRow from './ModuleRow.svelte';
	import Modal from '$lib/component/Modal.svelte';
	import '$css/form.css';
	import '$css/grid.css';
	import api from '$lib/api';

	let modulesPromise = api.getModules();

	let redeemKey = '';
	let redeemModal: Modal;
	let error: string | null = null;

	const redeemModule = async () => {
		if (redeemKey !== '') {
			let resp = await api.redeemModule(redeemKey);
			if (resp.redirect_url === undefined) {
				error = 'No matching module';
			} else {
				modulesPromise = api.getModules();
				redeemKey = '';
				error = null;
				redeemModal.closeModal();
			}
		}
	};
</script>

<div class="text-column">
	<div class="panel">
		{#await modulesPromise}
			<p class="p-white">...loading</p>
		{:then modules}
			{#each modules as module (module.id)}
				<ModuleRow {module} />
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
		<div class="row-centered">
			<button on:click={() => redeemModal.openModal()}>Redeem a new module</button>
		</div>
	</div>
</div>

<Modal bind:this={redeemModal}>
	<div class="row">
		<label class="col-input" for="key">Unlock key</label>
		<input class="col-auto" type="text" id="key" bind:value={redeemKey} />
	</div>
	{#if error}
		<div class="row error">{error}</div>
	{/if}
	<div class="row-centered">
		<button on:click={redeemModule}>Redeem a new module</button>
	</div>
</Modal>

<style>
	.panel {
		display: flex;
		flex-direction: column;
		padding: 100px;
	}

	button {
		display: block;
		margin-top: 15px;
	}

	input {
		width: 32em;
	}
</style>
