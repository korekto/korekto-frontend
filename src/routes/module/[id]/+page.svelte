<script>
	import Icon from '@iconify/svelte';
	import Assignment from './Assignment.svelte';
	import { jsDateToHumanDate, jsDateToHumanTime } from './../../../utils';

	export let data;

	// get module details using data.id, cf +page.ts
	let module = {
		id: '6d8c3b5b-9e68-4b25-85a1-96a000b1701d',
		name: 'Java 101',
		description: 'Learn the basics of Java',
		start: new Date('2023-03-17T07:00:00+00:00'),
		end: new Date('2023-05-21T17:00:00+00:00'),
		repos_to_create: 4,
		user_repos: 2,
		grade: 0,
		latest_update: new Date('2023-03-22'),
		locked: true,
		lock_reason: 'Missing profile info',
		source: 'https://lernejo.github.io/course-java-101-fr',
		assignments: [
			{
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
				factor_percentage: 5
			},
			{
                id: '91d607c9-53fa-49d4-877e-412ad4f290fc',
				type: 'exercise',
				name: 'Maven',
				description: 'Setup a Maven project with CI',
				tags: ['Beginner', 'Java', 'Maven', 'Continuous Integration'],
				grade: 0,
				start: new Date('2023-03-10'),
				end: new Date('2023-03-14'),
				repo_created: false,
				latest_update: new Date('2023-03-22'),
				locked: true,
				teacher_notes: null,
				subject: 'https://github.com/lernejo/exercises/blob/master/java_fr/EXERCISE.adoc',
				grader: 'https://github.com/lernejo/korekto-java-basics-grader',
				integration: false,
				repository_name: 'java_exercise_2',
				factor_percentage: 5
			},
			{
                id: '0346ac10-d8fe-4204-bfc2-f7c88c107fd5',
				type: 'project',
				name: 'Navy battle',
				description: 'Build a program playing the Navy battle game over an HTTP/JSON API',
				tags: [],
				grade: 4,
				start: new Date('2023-03-10'),
				end: new Date('2023-05-23'),
				repo_created: true,
				latest_update: new Date('2023-03-22'),
				locked: false,
				teacher_notes: null,
				subject:
					'https://github.com/lernejo/exercises/blob/master/projects/http_api_fr/EXERCISE.adoc',
				grader: 'https://github.com/lernejo/korekto-java-api-grader',
				integration: true,
				repository_name: 'java_exercise_2',
				factor_percentage: 60
			}
		]
	};
</script>

<div class="text-column">
	<div class="row">
		<div class="info-panel-left">
			<h1 class="black">Module: {module.name}</h1>
			<h3>{module.description}</h3>
			<div>
				Course: <a
					href={module.source}
					class="link blue"
					target="_blank"
					rel="noopener noreferrer">{module.source}</a
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
					<div>From: {jsDateToHumanDate(module.start)}</div>
					<div>To: <span class="bold">{jsDateToHumanTime(module.end)}</span></div>
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
				<div>Grade: {module.grade} / 20</div>
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
			<Assignment {assignment} moduleId={module.id} />
		{/each}
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
