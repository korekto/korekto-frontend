import * as XLSX from 'xlsx';
import { type WorkBook, writeFileXLSX } from 'xlsx';

export const to_csv = (header: string[], lines: (string | number)[][]): string => {
	let csv = '';
	csv += header.join(', ') + '\n';
	for (const line of lines) {
		csv += line.join(', ') + '\n';
	}
	return csv;
};

export const to_xlsx = (header: string[], lines: (string | number)[][]): WorkBook => {
	const sheet = XLSX.utils.aoa_to_sheet([header]);
	XLSX.utils.sheet_add_aoa(sheet, lines, { origin: 'A2' });
	const book = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(book, sheet, 'grades');
	return book;
};

export const download_xlsx = (header: string[], lines: (string | number)[][]) => {
	writeFileXLSX(to_xlsx(header, lines), 'grades.xlsx');
};
