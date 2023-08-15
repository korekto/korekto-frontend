export const jsDateToHumanDate = (d: Date | string) => {
	if (typeof d === 'string') {
		d = new Date(d);
	}
	return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(
		d.getDate()
	).padStart(2, '0')}`;
};
export const jsDateToHumanTime = (d: Date | string) => {
	if (typeof d === 'string') {
		d = new Date(d);
	}
	return `${jsDateToHumanDate(d)} - ${String(d.getHours() + 1).padStart(2, '0')}:${String(
		d.getMinutes() + 1
	).padStart(2, '0')}`;
};
