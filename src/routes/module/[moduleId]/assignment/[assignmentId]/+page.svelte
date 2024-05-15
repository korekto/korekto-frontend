<script lang="ts">
	import Icon from '@iconify/svelte';
	import { jsDateToHumanDate, jsDateToHumanTime } from '$lib/utils';
	import api from '$lib/api';
	import type { Assignment } from '$lib/types';

	export let data;

	let assignmentPromise = api.getAssignment(data.moduleId, data.assignmentId);

	const syncRepo = async () => {
		await api.syncRepo(data.moduleId, data.assignmentId);
		assignmentPromise = api.getAssignment(data.moduleId, data.assignmentId);
	};

	const triggerGrading = async () => {
		await api.triggerGrading(data.moduleId, data.assignmentId);
		assignmentPromise = api.getAssignment(data.moduleId, data.assignmentId);
	};

	const computeGrade = (a: Assignment): number => {
		if (a.latest_run) {
			let grade = 0;
			let max_grade = 0;
			for (const detail of a.latest_run.details) {
				grade += detail.grade;
				if (detail.max_grade !== undefined) {
					max_grade += detail.max_grade;
				}
			}
			return Number(((grade * 20) / max_grade).toFixed(2));
		} else {
			return 0;
		}
	};
</script>

{#await assignmentPromise}
	<p class="p-white">...loading</p>
{:then assignment}
	<div class="text-column">
		<div class="row">
			<div class="info-panel-left">
				<a href="/module/{data.moduleId}" class="link blue">
					<Icon icon="ic:baseline-arrow-back" inline />
					Back to Module
				</a>
				<h1 class="black">Assignment: {assignment.name}</h1>

				<h3>{assignment.description}</h3>
				<div>
					Subject: <a
						href={assignment.subject_url}
						class="link blue"
						target="_blank"
						rel="noopener noreferrer">{assignment.subject_url}</a
					>
				</div>
				<div class="pt-1">
					Grader: <a
						href={assignment.grader_url}
						class="link blue"
						target="_blank"
						rel="noopener noreferrer">{assignment.grader_url}</a
					>
				</div>
			</div>
			<div class="info-panel-right">
				<div class="row blue center-v">
					<div class="border mr-1 icon">
						<Icon icon="clarity:clock-line" inline style="font-size: 24px;" />
					</div>
					<div class="column">
						<div>From: {jsDateToHumanDate(assignment.start.toISOString())}</div>
						<div>
							To: <span class="bold"
								>{jsDateToHumanTime(assignment.stop.toISOString())}</span
							>
						</div>
					</div>
				</div>
				<div class="row black center-v">
					<div class="mr-1 icon">
						<Icon icon="ph:medal-duotone" inline style="font-size: 24px;" />
					</div>
					<div>Grade: {computeGrade(assignment)} / 20</div>
				</div>
				<div class="row disabled center-v">
					<div class="mr-1 icon">
						<Icon icon="icon-park-twotone:big-x" inline style="font-size: 24px;" />
					</div>
					<div>Coefficient: {assignment.factor_percentage} %</div>
				</div>
				{#if assignment.repo_linked}
					<div class="row disabled center-v">
						<div class="mr-1 icon">
							<Icon icon="emojione:rocket" inline style="font-size: 24px;" />
						</div>
						<button
							type="button"
							on:click={triggerGrading}
							class="col-sm-1 btn btn-success"
							>Trigger grading
						</button>
					</div>
				{/if}
				{#if assignment.locked}
					<div class="row red center-v">
						<div class="mr-1 icon">
							<Icon icon="mingcute:lock-line" inline style="font-size: 24px;" />
						</div>
						<div>{assignment.lock_reason}</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="column p1 pt-1">
			<div class="row">
				<div class="row center-v content-line">
					<div class="fushia">
						<Icon icon="mdi:git" inline style="font-size: 40px;" />
					</div>
					<div class="column ml-1">
						<div>Repository</div>
						<a
							href={assignment.repository_url}
							class="link blue"
							target="_blank"
							rel="noopener noreferrer">{assignment.repository_name}</a
						>
						{#if !assignment.repo_linked}
							<div class="red bold">(missing)</div>
							<button type="button" on:click={syncRepo} class="col-sm-1 btn-link"
								><Icon icon="tabler:refresh" inline style="font-size: 24px;" /> Sync
							</button>
						{/if}
					</div>
				</div>
				<div class="row center-v content-line">
					<Icon icon="bi:gear-wide-connected" inline style="font-size: 40px;" />
					<div class="column ml-1">
						<div>Grading state:</div>
						{#if assignment.ongoing_run}
							<a href={assignment.ongoing_run.grading_log_url}>
								<div class="row green text-left">
									<div class="bold">Ongoing</div>
									<div class="rotating">
										<Icon icon="zondicons:refresh" inline />
									</div>
								</div>
							</a>
						{/if}
						{#if assignment.latest_run}
							<div>
								Latest run: <a
									class="link blue"
									href={assignment.latest_run.grading_log_url}
									>{assignment.latest_run.grading_log_url}</a
								>
							</div>
						{/if}
					</div>
				</div>
			</div>
			{#if assignment.latest_run}
				<h3 class="black bold mb-0">Details of latest run:</h3>
				<ul class="details">
					{#each assignment.latest_run.details as detail}
						<li>
							{#if detail.max_grade === undefined}
								{#if detail.grade === 0}
									{detail.name}: OK
								{:else}
									{detail.name}: {detail.grade}
								{/if}
							{:else}
								{detail.name}: {detail.grade} / {detail.max_grade}
							{/if}
							{#if detail.messages !== undefined && detail.grade !== 0}
								<ul>
									{#each detail.messages as message}
										<li>{message}</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
				<div>
					Run at <span class="black bold"
						>{jsDateToHumanTime(assignment.latest_run.time.toISOString())}</span
					>
					for commit
					<a class="link blue" href={assignment.latest_run.commit_url}
						>{assignment.latest_run.short_commit_id}</a
					>
				</div>
				<div class="disabled mt-1">
					<Icon icon="eva:menu-arrow-outline" inline style="transform: rotate(180deg);" />
					Full log
					<a class="link blue" href={assignment.latest_run.grading_log_url}>here</a>
				</div>
			{/if}
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
	.black {
		color: black;
	}
	.red {
		color: red;
	}
	.green {
		color: green;
	}
	.fushia {
		color: #ff00ff;
	}
	.disabled {
		color: #505757;
	}
	.border {
		border: 1px solid black;
	}
	.icon {
		padding: 2px;
	}
	.details {
		padding: 15px 40px;
		background-color: white;
	}
	.mt-1 {
		margin-top: 10px;
	}
	.mb-0 {
		margin-bottom: 0;
	}
	.mr-1 {
		margin-right: 10px;
	}
	.ml-1 {
		margin-left: 10px;
	}
	.p1 {
		padding-left: 100px;
		padding-right: 100px;
	}
	.pt-1 {
		padding-top: 10px;
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
	.content-line + .content-line {
		margin-left: 100px;
	}
	.text-left {
		justify-content: left;
	}

	.rotating {
		animation: rotate 1.3s linear infinite;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.btn {
		/*border: var(--bs-btn-border-width) solid var(--bs-btn-border-color); */
		border-radius: 0.375rem;
	}

	.btn-success {
		background-color: #198754;
	}

	.btn-link {
		background: none !important;
		border: none;
		padding: 0 !important;
		font-family: arial, sans-serif;
		color: #069;
		text-decoration: underline;
		cursor: pointer;
	}
</style>
