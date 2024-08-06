<script lang="ts">
	import Icon from '@iconify/svelte';
	import api from '$lib/api';
	import '$css/table.css';
	import '$css/grid.css';

	let tableName = '';

	const dropTable = async () => {
		await api.dropTable(tableName);
	};
</script>

<div class="text-column">
	<h3>General</h3>

	<div class="mb-3 row">
		<label class="col-input small-label" for="tableName">Table</label>
		<input class="col-auto mr" type="text" id="tableName" bind:value={tableName} />
		<button type="button" on:click={dropTable} class="col-sm-1 btn btn-warn"
			><Icon icon="noto:drop-of-blood" inline /> Drop !
		</button>
	</div>
	<div class="mb-3 row">
		<button type="button" on:click={api.rerunMigrations} class="col-sm-1 btn btn-warn"
			><Icon icon="emojione-v1:warning" inline /> Re-run migrations
		</button>
	</div>
	<div class="mb-3 row">
		<button type="button" on:click={api.recreateDb} class="col-sm-1 btn btn-danger"
			><Icon icon="openmoji:cross-mark" inline /> Recreate DB
		</button>
	</div>
</div>

<style>
	.btn-warn {
		background: orange;
		border-radius: 6px;
	}

	.btn-danger {
		background: red;
		border-radius: 6px;
	}
	.small-label {
		width: 4%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mr {
		margin-right: 10px;
	}
</style>
