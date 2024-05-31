<script lang="ts">
	import Icon from '@iconify/svelte';
	import api from '$lib/api';
	import '$css/table.css';
	import '$css/grid.css';

	let pageNumber = 1;

	async function getItems() {
		return await api.getGradingTasks(pageNumber, 15);
	}

	let itemPromise = getItems();

	async function gotoPrevious() {
		pageNumber -= 1;
		itemPromise = getItems();
	}

	async function gotoNext() {
		pageNumber += 1;
		itemPromise = getItems();
	}
</script>

<div class="text-column">
	<h3>Users</h3>

	{#await itemPromise}
		<p class="p-white">...loading items</p>
		<!-- eslint-disable @typescript-eslint/no-unused-vars -->
	{:then page}
		<table class="table">
			<thead>
				<tr>
					<th scope="col">Created at</th>
					<th scope="col">Updated at</th>
					<th scope="col">Module ID</th>
					<th scope="col">Assignment ID</th>
					<th scope="col">Provider login</th>
					<th scope="col">Repository</th>
					<th scope="col">Status</th>
				</tr>
			</thead>
			<tbody>
				{#each page.data as item}
					<tr>
						<td>{item.created_at.toISOString()}</td>
						<td>{item.updated_at.toISOString()}</td>
						<td>{item.module_id}</td>
						<td>{item.assignment_id}</td>
						<td>{item.provider_login}</td>
						<td>{item.repository_name}</td>
						<td>{item.status}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if page.total_page > 1}
			<div class="row-centered">
				<div class="col-auto">
					{#if pageNumber > 1}
						<button
							type="button"
							class="btn-smooth btn-pagination"
							aria-label="Previous"
							on:click={gotoPrevious}
						>
							<Icon icon="grommet-icons:caret-previous" inline />
						</button>
					{/if}
				</div>
				<div class="col-auto">
					Page {pageNumber}
				</div>
				<div class="col-auto">
					{#if pageNumber < page.total_page}
						<button
							type="button"
							class="btn-smooth btn-pagination"
							aria-label="Next"
							on:click={gotoNext}
						>
							<Icon icon="grommet-icons:caret-next" inline />
						</button>
					{/if}
				</div>
			</div>
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	.btn-smooth {
		background: none;
		border: none;
	}

	.btn-smooth:hover {
		background: lightgray;
		border-radius: 6px;
	}

	.btn-pagination {
		color: cornflowerblue;
		font-size: 43px;
	}

	.col-auto {
		display: flex;
		justify-content: center;
	}
</style>
