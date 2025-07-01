export function formatDate(dateString: string | undefined): string {
	if (!dateString) return "Date not provided";

	// Attempt to fix malformed time (e.g. "15:5755" → "15:57:55")
	const safeDateString = dateString.replace(
		/(\d{2}:\d{2})(\d{2})$/,
		(match, p1, p2) => `${p1}:${p2}`
	);

	const date: Date = new Date(safeDateString);

	if (isNaN(date.getTime())) {
		return "Invalid date format";
	}

	const monthNames: string[] = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December",
	];

	const day: number = date.getDate();
	const monthIndex: number = date.getMonth();
	const year: number = date.getFullYear();

	const getOrdinalSuffix = (day: number): string => {
		if (day > 3 && day < 21) return "th";
		switch (day % 10) {
			case 1: return "st";
			case 2: return "nd";
			case 3: return "rd";
			default: return "th";
		}
	};

	return `${monthNames[monthIndex]} ${day}${getOrdinalSuffix(day)} ${year}`;
}