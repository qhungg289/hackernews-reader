import { diffFromUnixSecondToNow } from "@/utils/time";

async function getStory(id) {
	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`,
	);

	if (!res.ok) {
		throw new Error(`Can't get story ID: ${id}.`);
	}

	return res.json();
}

export default async function Story({ params }) {
	const story = await getStory(params.id);

	return (
		<main>
			<div className="bg-zinc-900 rounded border border-zinc-800 mx-4 my-6 p-4 divide-y divide-zinc-700">
				<div className="pb-4">
					<p className="text-zinc-500 text-xs">
						Posted by {story.by}{" "}
						{diffFromUnixSecondToNow(story.time)}
					</p>
					{story.url ? (
						<div className="space-x-1">
							<a
								href={story.url}
								className="hover:underline text-xl mt-4 inline-block font-bold"
							>
								{story.title}
							</a>
							<span className="text-sm text-zinc-500">
								({new URL(story.url).hostname})
							</span>
						</div>
					) : (
						<p className="text-xl mt-4 font-bold">{story.title}</p>
					)}
					{story.text && (
						<p className="text-zinc-400 mt-2">{story.text}</p>
					)}
					<div className="text-zinc-500 text-sm space-x-3 mt-4">
						<span>{story.score} points</span>
						<span>{story.descendants} comments</span>
					</div>
				</div>

				<div></div>
			</div>
		</main>
	);
}
