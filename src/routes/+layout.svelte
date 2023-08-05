<script>
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import './styles.css';
</script>

<svelte:head>
	<title>Korekto App</title>
	<meta name="description" content="Learn coding by practicing" />
</svelte:head>

<div class="app">
	<Header />

	<main>
		<Sidebar />
		<div class="center-panel">
			<slot class="content" />
			<footer>
				<p>
					Visit <a href="https://github.com/lernejo">github.com/lernejo</a> for resources.
				</p>
			</footer>
		</div>
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		/*margin: 0 auto;
		box-sizing: border-box; */
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
		flex-shrink: 1;
	}

	.center-panel {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.content {
		flex-grow: 1;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
