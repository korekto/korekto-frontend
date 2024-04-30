<script lang="ts">
	import Icon from '@iconify/svelte';
	import { jsDateToHumanDate, jsDateToHumanTime } from '$lib/utils';
	import type { AssignmentDesc } from '$lib/types';

	export let moduleId: string;
	export let assignment: AssignmentDesc;
</script>

<a href="/module/{moduleId}/assignment/{assignment.id}">
	<div class="assignment">
		<div class="icon black">
			{#if assignment.locked}
				<Icon icon="mingcute:lock-line" inline />
			{:else if assignment.type === 'project'}
				<Icon icon="ph:student-duotone" inline />
			{:else}
				<Icon icon="ion:book" inline />
			{/if}
		</div>
		<div class="cell">
			<div class="title black" class:disabled={assignment.locked}>{assignment.name}</div>
			<div class="description disabled">{assignment.description}</div>
		</div>
		<div class="cell cell-big">
			{#if !assignment.repo_linked}
				<div class="row red">
					<Icon icon="mdi:git" inline style="font-size: 24px;" />
					<div>Missing repository <i>{assignment.repository_name}</i></div>
				</div>
			{/if}
		</div>
		<div class="cell cell-sm black">
			<div class="row">
				<Icon icon="ph:medal-duotone" inline style="font-size: 24px;" />
				<div>Grade: {assignment.grade} / 20</div>
				<div class="description ml-1">({assignment.factor_percentage} %)</div>
			</div>
		</div>
		<div class="cell blue">
			<div class="row text-right">
				<Icon icon="clarity:clock-line" inline style="font-size: 24px;" />
				<div class="column ml-1">
					<div>From: {jsDateToHumanDate(assignment.start.toISOString())}</div>
					<div>
						To: <span class="bold"
							>{jsDateToHumanTime(assignment.stop.toISOString())}</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</a>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	:global(a + a) {
		margin-top: 20px;
	}
	.assignment {
		background-color: var(--color-bg-3);
		padding: 5px 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.assignment:hover {
		background-color: var(--color-bg-2);
		cursor: pointer;
	}
	.icon {
		font-size: 40px;
		margin-right: 15px;
	}
	.cell {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1 0 23%;
	}
	.cell + .cell {
		margin-left: 15px;
	}
	.cell-sm {
		flex: 0 0 17%;
	}
	.cell-big {
		flex: 1 0 26%;
	}
	.title {
		font-size: 20px;
		font-weight: bold;
	}
	.black {
		color: black;
	}
	.red {
		color: red;
	}
	.blue {
		color: blue;
	}
	.description {
		font-size: 0.8rem;
	}
	.disabled {
		color: #505757;
	}
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.ml-1 {
		margin-left: 10px;
	}
	.text-right {
		justify-content: right;
	}
</style>
