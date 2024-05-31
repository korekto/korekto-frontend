<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let data;
</script>

<div>
	<nav class="nav nav-pills">
		<li class="nav-item">
			<a
				class="nav-link active"
				aria-current={$page.url.pathname === '/teacher/module/{{data.moduleId}}/details'
					? 'page'
					: undefined}
				href="/teacher/module/{data.moduleId}/details">Details</a
			>
		</li>
		<li class="nav-item">
			<a
				class="nav-link active"
				aria-current={$page.url.pathname === '/teacher/module/{{data.moduleId}}/grades'
					? 'page'
					: undefined}
				href="/teacher/module/{data.moduleId}/grades">Grades</a
			>
		</li>
	</nav>

	<a href="/teacher" class="link blue">
		<Icon icon="ic:baseline-arrow-back" inline />
		Back to Module list
	</a>

	<slot class="content" />
</div>

<style>
	.nav {
		display: flex;
		flex-wrap: wrap;
		padding: 5px 10px;
		margin-bottom: 10px;
		list-style: none;
		box-sizing: border-box;
		background-color: black;
	}
	.nav-pills {
		--bs-nav-pills-border-radius: 0.375rem;
		--bs-nav-pills-link-active-color: #fff;
		--bs-nav-pills-link-active-bg: #0d6efd;
	}
	.nav-link {
		display: block;
		padding: 0.5rem 1rem;
		color: #0d6efd;
		text-decoration: none;
		background: 0 0;
		background-color: rgba(0, 0, 0, 0);
		border: 0;
		transition:
			color 0.15s ease-in-out,
			background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out;
	}
	.nav-pills .nav-link {
		border-radius: 0.375rem;
	}
	.nav-link[aria-current='page'] {
		color: #fff;
		background-color: #0d6efd;
	}
</style>
