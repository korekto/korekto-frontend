<script>
	import { getSelf } from '$lib/api';
</script>

<div class="media align-items-center">
	{#await getSelf()}
		<div class="media-body">Loading</div>
	{:then user}
		<img src={user.avatar_url} alt="avatar" width="65" class="rounded-circle" />
		<div class="media-body">
			<h4 class="username">{user.name}</h4>
			<p class="role">{user.role}</p>
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	img.rounded-circle {
		border-radius: 50%;
		border: 0.4rem double #808080;
	}
	.media {
		display: flex;
		margin-top: 50px;
		flex-direction: column;
	}
	.align-items-center {
		align-items: center;
		justify-content: center;
	}
	h4.username {
		text-align: center;
		margin-bottom: 0;
	}
	p.role {
		text-align: center;
		margin-top: 5px;
		color: var(--color-theme-2);
	}
</style>
