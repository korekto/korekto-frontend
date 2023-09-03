<script>
	import logo from '$lib/images/korekto_logo_50.png';
</script>

<header>
	<div class="corner">
		<a class="title" href="/">
			<img src={logo} alt="Korekto" /> Korekto
		</a>
	</div>

	<div class="corner center">
		<form action="/auth/logout" method="post">
			<button type="submit">Sign out</button>
		</form>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		background-color: var(--color-bg-0);
		color: var(--color-text-2);
	}

	.corner {
		width: 10em;
		height: 3em;
	}

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.corner a,
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		text-decoration: none;
	}

	.title {
		font-weight: 700;
		font-size: 1.2rem;
		letter-spacing: 0.1em;
	}

	button {
		background: none;
		border: none;
		cursor: pointer;
	}

	.corner a:visited {
		text-decoration: none;
		color: var(--color-text-2);
	}

	.corner a:hover,
	button:hover {
		text-decoration: none;
		color: var(--color-text-2);
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
		margin-right: 1em;
	}

	a,
	button {
		color: var(--color-text-2);
	}

	a:hover,
	button:hover {
		color: var(--color-text-2);
	}
</style>
