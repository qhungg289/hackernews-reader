import { diffFromUnixSecondToNow } from "@/utils/time";
import CommentsList from "./CommentsList";

export async function generateMetadata({ params }) {
	const story = await getStory(params.id);

	return {
		title: `${story.title} - Hacker News`,
	};
}

async function getStory(id) {
	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`,
		{ cache: "no-store" },
	);

	if (!res.ok) {
		throw new Error(`Can't get story ID: ${id}.`);
	}

	return res.json();
}

async function getAllChildComments(comment) {
	if (!comment.kids) {
		return;
	}

	const childCommentsId = comment.kids;

	comment.kids = await Promise.all(
		childCommentsId.map((id) =>
			fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
				(res) => res.json(),
			),
		),
	);

	await Promise.all(comment.kids.map((c) => getAllChildComments(c)));
}

async function getCommentsOfStory(story) {
	const topLevelCommentsId = story.kids;

	const comments = await Promise.all(
		topLevelCommentsId.map((id) =>
			fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
				(res) => res.json(),
			),
		),
	);

	await Promise.all(comments.map((c) => getAllChildComments(c)));

	return comments;
}

export default async function Story({ params }) {
	const story = await getStory(params.id);
	const comments = await getCommentsOfStory(story);

	return (
		<main>
			<div className="bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 dark:border-t-zinc-600 mx-4 my-6 md:max-w-[65ch] md:mx-auto p-4 divide-y-2 divide-zinc-200 dark:divide-zinc-800">
				<div className="pb-4">
					<p className="text-zinc-500 text-xs">
						Posted by {story.by}{" "}
						{diffFromUnixSecondToNow(story.time)}
					</p>
					{story.url ? (
						<div className="space-x-1">
							<a
								href={story.url}
								className="hover:underline mt-4 inline-block font-medium"
							>
								{story.title}
							</a>
							<span className="text-sm text-zinc-500">
								({new URL(story.url).hostname})
							</span>
						</div>
					) : (
						<p className="text-xl mt-4 font-medium">
							{story.title}
						</p>
					)}
					{story.text && (
						<div
							className="mt-2 prose dark:prose-invert"
							dangerouslySetInnerHTML={{ __html: story.text }}
						></div>
					)}
					<div className="text-zinc-500 text-sm space-x-3 mt-4">
						<span>{story.score} points</span>
						<span>{story.descendants} comments</span>
					</div>
				</div>

				<div>
					<CommentsList comments={comments} />
				</div>
			</div>
		</main>
	);
}
