<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { UserForAdmin } from '$lib/types';
	import api from '$lib/api';
	import '$css/table.css';

	let storedUsers: UserForAdmin[] = [];

	async function getUsersAndStoreThem() {
		storedUsers = await api.getUsers();
		return storedUsers;
	}

	let getUsersPromise = getUsersAndStoreThem();

	async function bulkDelete() {
		await bulkDoStuff(api.deleteUsers);
	}

	async function bulkSetTeacher() {
		await bulkDoStuff(api.setUsersTeacher);
	}

	async function bulkDoStuff(action: (ids: string[]) => Promise<void>) {
		let selectedUsers = storedUsers.filter((u) => u.selected).map((u) => u.id);
		await action(selectedUsers);
		getUsersPromise = getUsersAndStoreThem();
	}
</script>

<div class="text-column">
	<h3>Users</h3>

	{#await getUsersPromise}
		<p class="p-white">...loading users</p>
		<!-- eslint-disable @typescript-eslint/no-unused-vars -->
	{:then users}
		<div class="mb-3 row">
			<span class="col-sm-1">Bulk actions:</span>
			<button type="button" on:click={bulkSetTeacher} class="col-sm-1 btn btn-warning"
				>Set Teacher</button
			>
			<button type="button" on:click={bulkDelete} class="col-sm-1 btn btn-danger"
				>Delete</button
			>
		</div>

		<table class="table">
			<thead>
				<tr>
					<th scope="col" />
					<th scope="col">ID</th>
					<th scope="col">Created at</th>
					<th scope="col">Login</th>
					<th scope="col">First name</th>
					<th scope="col">Last name</th>
					<th scope="col">School group</th>
					<th scope="col">School email</th>
					<th scope="col">Provider Email</th>
					<th scope="col">Teacher</th>
					<th scope="col">Admin</th>
				</tr>
			</thead>
			<tbody>
				{#each storedUsers as user}
					<tr>
						<td><input type="checkbox" bind:checked={user.selected} /></td>
						<th scope="row">{user.id}</th>
						<td>{new Date(user.created_at).toLocaleDateString()}</td>
						<td>{user.provider_login}</td>
						<td>{user.firstname}</td>
						<td>{user.lastname}</td>
						<td>{user.school_group || '-'}</td>
						<td>{user.school_email || '-'}</td>
						<td>{user.provider_email || '-'}</td>
						<td>
							{#if user.teacher}
								<Icon icon="ph:check-fill" inline />
							{/if}
						</td>
						<td>
							{#if user.admin}
								<Icon icon="ph:check-fill" inline />
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>
