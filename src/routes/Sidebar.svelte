<script>
	import { page } from '$app/stores';
	import { UserStore } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import UserSide from './UserSide.svelte';
</script>

<div class="vertical-nav" id="sidebar">
	<UserSide />
	<ul>
		<li aria-current={$page.url.pathname === '/dashboard' ? 'page' : undefined}>
			<a href="/dashboard">
				<Icon icon="akar-icons:dashboard" inline /> Dashboard
			</a>
		</li>
		<li aria-current={$page.url.pathname === '/profile' ? 'page' : undefined}>
			<a href="/profile">
				<Icon icon="uil:house-user" inline /> Profile
			</a>
		</li>
		{#if $UserStore.admin}
			<li aria-current={$page.url.pathname === '/admin' ? 'page' : undefined}>
				<a href="/admin">
					<Icon icon="uil:house-user" inline /> Admin
				</a>
			</li>
		{/if}
		{#if $UserStore.teacher}
			<li aria-current={$page.url.pathname === '/teacher' ? 'page' : undefined}>
				<a href="/teacher">
					<Icon icon="la:chalkboard-teacher" inline /> Teacher
				</a>
			</li>
		{/if}
	</ul>
</div>

<style>
	.vertical-nav {
		min-width: 14rem;
		width: 14rem;
		top: 48px;
		left: 0;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
		transition: all 0.4s;
		background-color: var(--color-bg-2);
		flex: 0;
	}

	ul {
		list-style: none;
		padding-left: 20px;
		padding-right: 20px;
	}

	li {
		background-color: var(--color-bg-3);
		padding: 5px;
	}

	li[aria-current='page']::before {
		--size: 7px;
		content: '';
		width: 0;
		height: 0;

		border: var(--size) solid transparent;
		border-left: var(--size) solid var(--color-theme-1);
		left: 17px;
		top: 22px;
	}

	li + li {
		margin-top: 10px;
	}

	a {
		text-decoration: none;
		color: var(--color-text-2);
	}

	a:hover {
		text-decoration: none;
		color: var(--color-text-2);
	}
</style>
