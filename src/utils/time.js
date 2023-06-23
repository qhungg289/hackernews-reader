import { DateTime } from "luxon";

export function diffFromUnixSecondToNow(seconds) {
	const start = DateTime.fromSeconds(seconds);

	const diff = DateTime.now()
		.diff(start, ["days", "hours", "minutes", "seconds"])
		.toObject();

	if (diff.days > 3) {
		return start.toLocaleString();
	}

	if (diff.days) {
		return `${diff.days} ${diff.days == 1 ? "day" : "days"} ago`;
	} else if (!diff.days && diff.hours) {
		return `${diff.hours} ${diff.hours == 1 ? "hour" : "hours"} ago`;
	} else if (!diff.days && !diff.hours && diff.minutes) {
		return `${Math.floor(diff.minutes)} ${
			Math.floor(diff.minutes) == 1 ? "minute" : "minutes"
		} ago`;
	} else {
		return `${Math.floor(diff.seconds)} ${
			Math.floor(diff.seconds) == 1 ? "second" : "seconds"
		} ago`;
	}
}
