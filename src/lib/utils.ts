export const jsDateToHumanDate = (date: string) => {
	let d = new Date(date);
	return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(
		d.getDate()
	).padStart(2, '0')}`;
};

export const jsDateToHumanTime = (date: string) => {
	let d = new Date(date);
	return `${jsDateToHumanDate(date)} - ${String(d.getHours() + 1).padStart(2, '0')}:${String(
		d.getMinutes() + 1
	).padStart(2, '0')}`;
};
