import { diffFromUnixSecondToNow } from "@/utils/time";
import CommentsList from "./CommentsList";
import Link from "next/link";

export async function generateMetadata({ params }) {
	const story = await getStory(params.id);

	return {
		title: `${story.title} - Hacker News`,
	};
}

async function getStory(id) {
	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json`,
		{ next: { revalidate: 60 } },
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
			fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
				next: { revalidate: 60 },
			}).then((res) => res.json()),
		),
	);

	await Promise.all(comment.kids.map((c) => getAllChildComments(c)));
}

async function getCommentsOfStory(story, page = 1) {
	const commentsPerPage = 10;
	const commentsStartIndex = (page - 1) * commentsPerPage;
	const commentsEndIndex = commentsStartIndex + commentsPerPage;

	const topLevelCommentsId = story.kids.slice(
		commentsStartIndex,
		commentsEndIndex,
	);

	const isNextPageAvailable = !!story.kids[commentsEndIndex + 1];

	const comments = await Promise.all(
		topLevelCommentsId.map((id) =>
			fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
				next: { revalidate: 60 },
			}).then((res) => res.json()),
		),
	);

	await Promise.all(comments.map((c) => getAllChildComments(c)));

	return { comments, isNextPageAvailable };
}

export default async function Story({ params, searchParams }) {
	const page = Number(searchParams.page ?? 1);

	const story = await getStory(params.id);
	const { comments, isNextPageAvailable } = await getCommentsOfStory(
		story,
		page,
	);

	return (
		<main>
			<div className="bg-white dark:bg-black md:rounded border border-t-0 border-x-0 md:border-t md:border-x border-neutral-200 dark:border-neutral-800 md:mx-auto md:my-6 md:max-w-[70ch] p-4 divide-y-2 divide-neutral-200 dark:divide-neutral-800 overflow-x-auto">
				<div className="pb-6">
					<p className="text-neutral-400 dark:text-neutral-500 font-mono text-xs">
						Posted by {story.by}{" "}
						{diffFromUnixSecondToNow(story.time)}
					</p>
					{story.url ? (
						<div className="flex items-baseline gap-1 flex-wrap">
							<a
								href={story.url}
								className="hover:underline mt-4 inline-block font-medium"
							>
								{story.title}
							</a>
							<span className="text-sm text-neutral-400 dark:text-neutral-500">
								({new URL(story.url).hostname})
							</span>
						</div>
					) : (
						<p className="mt-4 font-medium">{story.title}</p>
					)}
					{story.text && (
						<div
							className="mt-2 max-w-none prose prose-neutral dark:prose-invert"
							dangerouslySetInnerHTML={{ __html: story.text }}
						></div>
					)}
					<div className="text-neutral-400 dark:text-neutral-500 flex justify-between font-mono text-sm mt-4">
						<div className="flex gap-3">
							<span>{story.score} points</span>
							<span>{story.descendants} comments</span>
						</div>
						{page > 1 && <span>page {page}</span>}
					</div>
				</div>

				<div>
					<CommentsList comments={comments} />
				</div>
			</div>
			{isNextPageAvailable && (
				<div className="flex items-center gap-4 mx-4 my-6 md:max-w-[70ch] md:mx-auto">
					<Link
						href={{ query: { page: page + 1 } }}
						className="bg-orange-600 text-white flex items-center justify-center rounded w-full p-2 font-medium hover:bg-orange-500 focus-visible:bg-orange-500 transition-colors"
					>
						More comments...
					</Link>
				</div>
			)}
		</main>
	);
}
