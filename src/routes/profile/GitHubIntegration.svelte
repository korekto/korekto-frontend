<script lang="ts">
	import { UserStore } from '$lib/stores';
	import Icon from '@iconify/svelte';

	const compute_installation_url = () => {
		return `https://github.com/settings/installations/${$UserStore.installation_id}`;
	};
</script>

<div class="card">
	<h2>
		GitHub Integration
		{#if $UserStore.installation_id}
			<Icon icon="icon-park:check-one" inline />
		{:else}
			<Icon icon="openmoji:cross-mark" inline />
		{/if}
	</h2>

	{#if $UserStore.installation_id}
		Installation ID: {$UserStore.installation_id} (<a
			href={compute_installation_url()}
			target="_blank"
			rel="noopener noreferrer">configure</a
		>)
	{:else}
		<div>
			Please, install the <a
				href="https://github.com/apps/korekto"
				target="_blank"
				rel="noopener noreferrer">Korekto GitHub app</a
			> for integration with your GitHub repositories.
		</div>
		<hr />
		<div>
			Or try to <a href="/auth/gh/post_install">Refresh the integration process</a>
		</div>
	{/if}
</div>

<style>
	.card {
		margin: 5px 200px;
		flex: 1;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: bold;
	}
</style>
