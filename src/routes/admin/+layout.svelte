<script>
	import { page } from '$app/stores';
</script>

<div>
	<nav class="nav nav-pills">
		<li class="nav-item">
			<a
				class="nav-link active"
				aria-current={$page.url.pathname === '/admin/users' ? 'page' : undefined}
				href="/admin/users">Users</a
			>
		</li>
		<li class="nav-item">
			<a
				class="nav-link active"
				aria-current={$page.url.pathname === '/admin/database' ? 'page' : undefined}
				href="/admin/database">Database</a
			>
		</li>
        <li class="nav-item">
            <a
                class="nav-link active"
                aria-current={$page.url.pathname === '/admin/unparseable_webhooks' ? 'page' : undefined}
                href="/admin/unparseable_webhooks">Unparseable Webhooks</a
            >
        </li>
	</nav>

	<slot class="content" />
</div>

<style>
	.nav {
		display: flex;
		flex-wrap: wrap;
		padding: 5px 10px;
		margin-bottom: 0;
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
