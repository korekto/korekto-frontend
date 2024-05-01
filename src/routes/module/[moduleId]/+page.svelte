<script lang="ts">
	import Icon from '@iconify/svelte';
	import AssignmentRow from './AssignmentRow.svelte';
	import { jsDateToHumanDate, jsDateToHumanTime } from '$lib/utils';
	import api from '$lib/api';
	import type { Module } from '$lib/types';

	export let data;

	const computeGrade = (m: Module): number => {
		return Number(
			m.assignments
				.map((a) => (a.grade * a.factor_percentage) / 100)
				.reduce((acc, grade) => acc + grade, 0)
				.toFixed(2)
		);
	};
</script>

{#await api.getModule(data.moduleId)}
	<p class="p-white">...loading</p>
{:then module}
	<div class="text-column">
		<div class="row">
			<div class="info-panel-left">
				<h1 class="black">Module: {module.name}</h1>
				<h3>{module.description}</h3>
				<div>
					Course: <a
						href={module.source_url}
						class="link blue"
						target="_blank"
						rel="noopener noreferrer">{module.source_url}</a
					>
				</div>
				<h3 class="black bold">Assignments:</h3>
			</div>
			<div class="info-panel-right">
				<div class="row blue center-v">
					<div class="border mr-1 icon">
						<Icon icon="clarity:clock-line" inline style="font-size: 24px;" />
					</div>
					<div class="column">
						<div>From: {jsDateToHumanDate(module.start.toISOString())}</div>
						<div>
							To: <span class="bold"
								>{jsDateToHumanTime(module.stop.toISOString())}</span
							>
						</div>
					</div>
				</div>
				<div class="row green center-v">
					<div class="mr-1 icon">
						<Icon icon="fluent:task-list-24-filled" inline style="font-size: 24px;" />
					</div>
					<a href={'/module/' + module.id + '/requirements'}>Requirements</a>
				</div>
				<div class="row black center-v">
					<div class="mr-1 icon">
						<Icon icon="ph:medal-duotone" inline style="font-size: 24px;" />
					</div>
					<div>Grade: {computeGrade(module)} / 20</div>
				</div>
				{#if module.locked}
					<div class="row red center-v">
						<div class="mr-1 icon">
							<Icon icon="mingcute:lock-line" inline style="font-size: 24px;" />
						</div>
						<div>{module.lock_reason}</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="column p1">
			{#each module.assignments as assignment (assignment.id)}
				<AssignmentRow {assignment} moduleId={module.id} />
			{/each}
		</div>
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	h1 {
		margin-top: 5px;
	}
	.row {
		display: flex;
		flex-direction: row;
	}
	.row + .row {
		margin-top: 10px;
	}
	.column {
		display: flex;
		flex-direction: column;
	}
	.center-v {
		align-items: center;
	}
	.info-panel-left {
		flex: 1 0 75%;
	}
	.info-panel-right {
		padding-top: 20px;
		flex: 1 0 25%;
		display: flex;
		flex-direction: column;
		font-size: 20px;
	}
	.blue {
		color: blue;
	}
	.green {
		color: green;
	}
	.black {
		color: black;
	}
	.red {
		color: red;
	}
	.border {
		border: 1px solid black;
	}
	.icon {
		padding: 2px;
	}
	.mr-1 {
		margin-right: 10px;
	}
	.p1 {
		padding-left: 50px;
		padding-right: 50px;
	}
	.bold {
		font-weight: bold;
	}
	a {
		color: inherit;
	}
	a.link {
		text-decoration: underline;
	}
</style>
