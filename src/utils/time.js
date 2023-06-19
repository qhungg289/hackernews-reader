import { DateTime } from "luxon";

export function diffFromUnixSecondToNow(seconds) {
	const start = DateTime.fromSeconds(seconds);

	const diff = DateTime.now()
		.diff(start, ["days", "hours", "minutes"])
		.toObject();

	if (diff.days > 3) {
		return start.toLocaleString();
	}

	if (diff.days) {
		return `${diff.days} days ago`;
	} else if (!diff.days && diff.hours) {
		return `${diff.hours} hours ago`;
	} else {
		return `${Math.floor(diff.minutes)} minutes ago`;
	}
}
