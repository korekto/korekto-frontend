<script>
	import Icon from '@iconify/svelte';
	import { jsDateToHumanDate, jsDateToHumanTime } from './../../../../../utils';

	export let data;

	// get assignment details using data.assignmentId, cf +page.ts
	let assignment = {
		id: '7857c411-c79c-44d8-98a0-693deba1d77d',
		type: 'exercise',
		name: 'Control flow',
		description: 'Build a CLI program and practice the Open/Close principle',
		tags: ['Beginner', 'Java', 'control flow'],
		grade: 0,
		start: new Date('2023-03-10'),
		end: new Date('2023-03-14'),
		repo_created: false,
		latest_update: new Date('2023-03-22'),
		locked: false,
		teacher_notes: null,
		subject: 'https://github.com/lernejo/exercises/blob/master/java_fr/EXERCISE.adoc',
		grader: 'https://github.com/lernejo/korekto-java-basics-grader',
		integration: false,
		repository_name: 'java_exercise_1',
		repository_url: 'https://github.com/toto/java_exercise_1',
		factor_percentage: 5,
		grading_state: 'ONGOING',
		current_run: 'https://github.com/toto/java_exercise_1',
		current_run_short_commit_id: '8529f2a',
		current_run_commit_url:
			'https://github.com/toto/java_exercise_1/commit/8529f2aaa2d9f8f35a17ae0ac40b240ae6918ad0',
		latest_run: 'https://github.com/toto/java_exercise_1',
		latest_run_short_commit_id: '72858c3',
        latest_run_time: new Date('2023-03-22'),
		latest_run_commit_url:
			'https://github.com/toto/java_exercise_1/commit/72858c3ea42f61aa6913b639f5f51f2dfb17eb89',
		details: [
			{
				name: 'Part 1 - Compilation & Tests',
				grade: 4,
				max_grade: 4
			},
			{
				name: 'Part 3 - Code Coverage',
				grade: 2.43,
				max_grade: 3,
				messages: ['Code coverage: 60.38%, expected: > 80.0% with `mvn verify`']
			},
			{
				name: 'Git (proper descriptive messages)',
				grade: 0,
				messages: ['OK']
			}
		]
	};
</script>

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
					href={assignment.subject}
					class="link blue"
					target="_blank"
					rel="noopener noreferrer">{assignment.subject}</a
				>
			</div>
			<div class="pt-1">
				Grader: <a
					href={assignment.grader}
					class="link blue"
					target="_blank"
					rel="noopener noreferrer">{assignment.grader}</a
				>
			</div>
		</div>
		<div class="info-panel-right">
			<div class="row blue center-v">
				<div class="border mr-1 icon">
					<Icon icon="clarity:clock-line" inline style="font-size: 24px;" />
				</div>
				<div class="column">
					<div>From: {jsDateToHumanDate(assignment.start)}</div>
					<div>To: <span class="bold">{jsDateToHumanTime(assignment.end)}</span></div>
				</div>
			</div>
			<div class="row black center-v">
				<div class="mr-1 icon">
					<Icon icon="ph:medal-duotone" inline style="font-size: 24px;" />
				</div>
				<div>Grade: {assignment.grade} / 20</div>
			</div>
			<div class="row disabled center-v">
				<div class="mr-1 icon">
					<Icon icon="icon-park-twotone:big-x" inline style="font-size: 24px;" />
				</div>
				<div>Coefficient: {assignment.factor_percentage} %</div>
			</div>
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
						rel="noopener noreferrer">{assignment.repository_url}</a
					>
					{#if !assignment.repo_created}
						<div class="red bold">(missing)</div>
					{/if}
				</div>
			</div>
			<div class="row center-v content-line">
				<Icon icon="bi:gear-wide-connected" inline style="font-size: 40px;" />
				<div class="column ml-1">
					<div>Grading state:</div>
					{#if assignment.grading_state === 'ONGOING'}
						<a href={assignment.current_run}>
							<div class="row green text-left">
								<div class="bold">Ongoing</div>
								<div class="rotating">
									<Icon icon="zondicons:refresh" inline />
								</div>
							</div>
						</a>
					{/if}
					{#if assignment.latest_run != undefined}
						<div>
							Latest run: <a class="link blue" href={assignment.latest_run}
								>{assignment.latest_run}</a
							>
						</div>
					{/if}
				</div>
			</div>
		</div>
		{#if assignment.latest_run != undefined}
			<h3 class="black bold mb-0">Details of latest run:</h3>
            <ul class="details">
                {#each assignment.details as detail}
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
                        {#if detail.messages != undefined && detail.grade != 0 }
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
                Run at <span class="black bold">{jsDateToHumanTime(assignment.latest_run_time)}</span> for commit <a class="link blue" href={assignment.latest_run_commit_url}>{assignment.latest_run_short_commit_id}</a>
            </div>
            <div class="disabled mt-1">
				<Icon icon="eva:menu-arrow-outline" inline style="transform: rotate(180deg);" />
				Full log <a class="link blue" href={assignment.latest_run}>here</a>
			</div>
		{/if}
	</div>
</div>

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
	.tiny {
		font-size: 0.85em;
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
</style>
