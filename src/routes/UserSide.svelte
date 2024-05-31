<script lang="ts">
	import { UserStore } from '$lib/stores';
</script>

<div class="media align-items-center">
	<img src={$UserStore.avatar_url} alt="avatar" width="65" class="rounded-circle" />
	<div class="media-body">
		<h4 class="username">{$UserStore.firstname} {$UserStore.lastname}</h4>
		<p class="role">{$UserStore.role}</p>
	</div>
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
