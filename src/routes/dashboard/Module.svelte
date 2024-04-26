<script lang="ts">
	import Icon from '@iconify/svelte';
	import { jsDateToHumanDate, jsDateToHumanTime } from '$lib/utils';
	import type { ModuleDesc } from '$lib/types';

	export let module: ModuleDesc;
</script>

<a href="/module/{module.id}">
	<div class="module">
		<div class="cell">
			<div class="title">{module.name}</div>
			<div class="period disabled">
				{jsDateToHumanDate(module.start.toISOString())} - {jsDateToHumanDate(
					module.stop.toISOString()
				)}
			</div>
		</div>
		<div class="cell little-cell repos">
			<div class="inline big blue">
				{module.linked_repo_count} / {module.assignment_count}
				<Icon icon="mdi:git" inline class="git-icon" />
			</div>
		</div>
		<div class="cell">
			<div class="inline big bold">
				<!--{#if module.locked}
					<Icon icon="mingcute:lock-line" class="locked-icon" />
				{/if}-->
				<!--     class:disabled={module.locked} -->
				<div class="grade">
					Grade: {module.grade} / 20
				</div>
			</div>
		</div>
		<div class="cell big-cell">
			<div class="inline black text-right">
				latest update: <span class="bold ml-2"
					>{module.latest_update !== undefined
						? jsDateToHumanTime(module.latest_update.toISOString())
						: '-'}</span
				>
			</div>
		</div>
	</div>
</a>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	.module {
		background-color: var(--color-bg-3);
		padding: 15px 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	:global(a + a) {
		margin-top: 20px;
	}
	.module:hover {
		background-color: var(--color-bg-2);
		cursor: pointer;
	}
	.cell {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 0 0 18%;
	}
	.cell + .cell {
		margin-left: 50px;
	}
	.little-cell {
		flex: 0 0 10%;
	}
	.big-cell {
		flex: 1 1 25%;
	}
	.title {
		font-size: 1.5rem;
		font-weight: bold;
		color: black;
	}
	.period {
		padding-top: 3px;
		font-size: 0.8rem;
	}
	.blue {
		color: #4b5dff;
	}
	.disabled {
		color: #505757;
	}
	.inline {
		display: flex;
	}
	.big {
		font-size: 1.5rem;
	}
	.bold {
		font-weight: bold;
	}
	.text-right {
		justify-content: right;
	}
	.ml-2 {
		margin-left: 15px;
	}
	div :global(.git-icon) {
		margin-left: 10px;
		margin-top: 1px;
	}
	div :global(.locked-icon) {
		margin-right: 15px;
		margin-top: 1px;
		color: black;
	}
</style>
