<script>
	import Icon from '@iconify/svelte';

	export let course;

	const dateToInternalDate = (x) => {
		const d = new Date(x);
		return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(
			d.getDate()
		).padStart(2, '0')}`;
	};
	const dateToInternalTime = (x) => {
		const d = new Date(x);
		return `${dateToInternalDate(d)} - ${String(d.getHours() + 1).padStart(2, '0')}:${String(
			d.getMinutes() + 1
		).padStart(2, '0')}`;
	};
</script>

<a href="/course/{course.id}">
	<div class="course">
		<div class="cell">
			<div class="title">{course.name}</div>
			<div class="period disabled">
				{dateToInternalDate(course.start)} - {dateToInternalDate(course.end)}
			</div>
		</div>
		<div class="cell little-cell repos">
			<div class="inline big blue">
				{course.user_repos} / {course.repos_to_create}
				<Icon icon="mdi:git" inline class="git-icon" />
			</div>
		</div>
		<div class="cell">
			<div class="inline big bold">
				{#if course.locked}
					<Icon icon="mingcute:lock-line" class="locked-icon" />
				{/if}
				<div class="grade" class:disabled={course.locked}>
					Grade: {course.grade} / 20
				</div>
			</div>
		</div>
		<div class="cell big-cell">
			<div class="inline black text-right">
				latest update: <span class="bold ml-2"
					>{dateToInternalTime(course.latest_update)}</span
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
	.course {
		background-color: var(--color-bg-3);
		padding: 15px 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	:global(a + a) {
		margin-top: 20px;
	}
	.course:hover {
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
		color: #646d6d;
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
