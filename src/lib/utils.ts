export const jsDateToHumanDate = (date: string) => {
	const d = new Date(date);
	return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(
		d.getDate()
	).padStart(2, '0')}`;
};

export const jsDateToHumanTime = (date: string) => {
	const d = new Date(date);
	return `${jsDateToHumanDate(date)} - ${String(d.getHours() + 1).padStart(2, '0')}:${String(
		d.getMinutes() + 1
	).padStart(2, '0')}`;
};

export const durationInSecsToHumanReadable = (secs: number) => {
	const h = ~~(secs / 3600),
		m = ~~((secs - h * 3600) / 60),
		s = secs - h * 3600 - m * 60;
	const words = ['hour', 'minute', 'second'];
	return [h, m, s]
		.map((x, i) => (!x ? '' : `${x} ${words[i]}${x !== 1 ? 's' : ''}`))
		.filter((x) => x)
		.join(', ')
		.replace(/,([^,]*)$/, ' and$1');
};

export const download = (path: string, filename: string) => {
	const anchor = document.createElement('a');
	anchor.href = path;
	anchor.download = filename;

	document.body.appendChild(anchor);

	anchor.click();

	document.body.removeChild(anchor);
};
