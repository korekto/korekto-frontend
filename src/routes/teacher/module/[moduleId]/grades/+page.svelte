<script lang="ts">
	import Icon from '@iconify/svelte';
	import api from '$lib/api';
	import '$css/table.css';
	import { to_csv, download_xlsx } from '$lib/csv';
	import { download } from '$lib/utils';
	import type { ModuleGradesSummary } from '$lib/types';

	export let data;

	const downloadCsv = (gradesInfo: ModuleGradesSummary) => {
		const csv = to_csv(
			[
				'First Name',
				'Last Name',
				'Email',
				...gradesInfo.assignments.map((a) => a.short_name),
				'Total'
			],
			gradesInfo.students.map((s) => [
				s.first_name,
				s.last_name,
				s.school_email,
				...s.grades,
				s.total
			])
		);
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		download(url, 'grades.csv');
	};

	const downloadXlsx = (gradesInfo: ModuleGradesSummary) => {
		download_xlsx(
			[
				'First Name',
				'Last Name',
				'Email',
				...gradesInfo.assignments.map((a) => a.short_name),
				'Total'
			],
			gradesInfo.students.map((s) => [
				s.first_name,
				s.last_name,
				s.school_email,
				...s.grades,
				s.total
			])
		);
	};

	const avg = (numbers: number[]) => {
		const sum = numbers.reduce((a, b) => a + b, 0);
		return (sum / numbers.length || 0).toFixed(2);
	};
</script>

<div class="text-column">
	<h3>Grades</h3>

	{#await api.getGrades(data.moduleId)}
		<p class="p-white">...loading grades</p>
	{:then gradesInfo}
		<div class="mb-3 row">
			<span class="col-sm-1 mr-2">Actions:</span>
			<button
				type="button"
				on:click={() => downloadCsv(gradesInfo)}
				class="col-sm-1 btn btn-danger"
				><Icon icon="material-symbols:download-sharp" inline /> CSV
			</button>
			<button
				type="button"
				on:click={() => downloadXlsx(gradesInfo)}
				class="col-sm-1 btn btn-danger"
				><Icon icon="material-symbols:download-sharp" inline /> XLSX
			</button>
		</div>

		<table class="table">
			<thead>
				<tr>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Email</th>
					{#each gradesInfo.assignments as assignment}
						<th scope="col"
							>{assignment.short_name} ({assignment.factor_percentage} %)</th
						>
					{/each}
					<th scope="col">Total</th>
				</tr>
			</thead>
			<tbody>
				{#each gradesInfo.students as student}
					<tr>
						<th scope="row">{student.first_name}</th>
						<th scope="row">{student.last_name}</th>
						<th scope="row">{student.school_email}</th>
						{#each student.grades as grade}
							<td>{grade}</td>
						{/each}
						<th scope="row">{student.total}</th>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td colspan="2">{gradesInfo.students.length} students</td>
					<th scope="col">Avg</th>
					{#each gradesInfo.assignments as assignment, index}
						<th scope="col"
							>{assignment.short_name}: {avg(
								gradesInfo.students.map((s) => s.grades[index])
							)}</th
						>
					{/each}
					<th scope="col">Total: {avg(gradesInfo.students.map((s) => s.total))}</th>
				</tr>
			</tfoot>
		</table>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	.mb-3 {
		margin-bottom: 15px;
	}
	.mr-2 {
		margin-right: 10px;
	}
</style>
