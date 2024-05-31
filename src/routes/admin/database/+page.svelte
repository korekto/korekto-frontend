<script>
	import api from '$lib/api';
	import '$css/table.css';
</script>

<div class="text-column">
	<h3>Database</h3>

	{#await api.getTables()}
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
