<script>
	import { getTables } from '$lib/api';
</script>

<div class="text-column">
	<h3>Database</h3>

	{#await getTables()}
		<p class="p-white">...loading tables</p>
	{:then tables}
		<table class="table">
			<thead>
				<tr>
					<th scope="col">Table name</th>
					<th scope="col">Row count</th>
				</tr>
			</thead>
			<tbody>
				{#each tables as table}
					<tr>
						<th scope="row">{table.name}</th>
						<td>{table.row_count}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	table {
		width: 100%;
		margin-bottom: 1rem;
		vertical-align: top;
		border-color: #df00a9;
		caption-side: bottom;
		border-collapse: collapse;
	}

	tbody,
	td,
	th,
	thead,
	tr {
		border-color: inherit;
		border-style: solid;
		border-width: 0;
		vertical-align: bottom;
	}

	table > thead {
		vertical-align: bottom;
	}

	th {
		text-align: inherit;
	}

	table > :not(caption) > * > * {
		padding: 0.5rem 0.5rem;
		color: initial;
		background-color: white;
		border-bottom-width: 1px;
		box-shadow: inset 0 0 0 9999px initial;
	}

	table > tbody > tr:nth-of-type(2n + 1) > * {
		background-color: #f0f8ff;
	}
</style>
