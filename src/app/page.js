import { capitalize } from "@/utils/string";
import { diffFromUnixSecondToNow } from "@/utils/time";
import Link from "next/link";

export async function generateMetadata({ searchParams }) {
	let type = searchParams.type;

	if (!searchParams.type) {
		type = "top";
	}

	return {
		title: `${capitalize(type)} stories - Hacker News`,
	};
}

const itemsPerPage = 20;

async function getTopStories(page = 1, type = "top") {
	// 25 pages in total
	const itemsStartIndex = (page - 1) * itemsPerPage;
	const itemsEndIndex = itemsStartIndex + itemsPerPage;

	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/${type}stories.json`,
		{ cache: "no-store" },
	);

	if (!res.ok) {
		throw new Error("Can't get top stories!");
	}

	const topStoriesId = await res.json();
	const filteredTopStoriesId = topStoriesId.slice(
		itemsStartIndex,
		itemsEndIndex,
	);

	const topStories = await Promise.all(
		filteredTopStoriesId.map((id) =>
			fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
				cache: "no-store",
			}).then((res) => res.json()),
		),
	);

	return topStories;
}

export default async function Home({ searchParams }) {
	const page = Number(searchParams.page ?? 1);

	const stories = await getTopStories(page, searchParams.type);

	return (
		<main>
			<div className="flex items-center gap-2 px-4 py-2 mx-4 my-6 md:max-w-[65ch] md:mx-auto bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
				<Link
					className="px-4 py-1 rounded-full text-zinc-400"
					href={{ query: { type: "top" } }}
				>
					Top
				</Link>
				<Link
					className="px-4 py-1 rounded-full text-zinc-400"
					href={{ query: { type: "best" } }}
				>
					Best
				</Link>
				<Link
					className="px-4 py-1 rounded-full text-zinc-400"
					href={{ query: { type: "new" } }}
				>
					New
				</Link>
			</div>

			<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded mx-4 md:max-w-[65ch] md:mx-auto divide-y divide-zinc-200 dark:divide-zinc-800">
				{stories.map((story, index) => (
					<div
						key={story.id}
						className="px-4 py-2 grid grid-cols-[1fr_10fr]"
					>
						<p className="text-zinc-400 dark:text-zinc-500 flex items-center">
							{itemsPerPage * (page - 1) + (index + 1)}.
						</p>
						<div>
							{story.url ? (
								<div className="space-x-1">
									<a
										href={story.url}
										className="hover:underline font-medium"
									>
										{story.title}
									</a>
									<span className="text-sm text-zinc-500">
										({new URL(story.url).hostname})
									</span>
								</div>
							) : (
								<Link
									href={`/story/${story.id}`}
									className="hover:underline font-medium"
								>
									{story.title}
								</Link>
							)}
							<div className="text-xs text-zinc-500 mt-1">
								<span>
									Posted by {story.by}{" "}
									{diffFromUnixSecondToNow(story.time)}
								</span>
							</div>
							<div className="text-zinc-500 space-x-3 mt-2">
								<span>{story.score} points</span>
								<Link
									href={`/story/${story.id}`}
									className="hover:underline"
								>
									{story.descendants} comments
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>

			<p className="text-center mt-6 mx-auto bg-white dark:bg-zinc-900 text-zinc-500 px-4 py-1 rounded border border-zinc-200 dark:border-zinc-800 w-fit">
				Page:{" "}
				<span className="text-black dark:text-zinc-50">{page}</span>/25
			</p>

			<div className="flex items-center gap-4 mx-4 my-6 md:max-w-[65ch] md:mx-auto">
				{page > 1 && (
					<Link
						href={{ query: { page: page - 1 } }}
						className="bg-orange-600 text-white flex items-center justify-center rounded w-full p-2 font-medium hover:bg-orange-500 focus-visible:bg-orange-500"
					>
						Previous
					</Link>
				)}
				{page < 25 && (
					<Link
						href={{
							query: {
								page: page + 1,
							},
						}}
						className="bg-orange-600 text-white flex items-center justify-center rounded w-full p-2 font-medium hover:bg-orange-500 focus-visible:bg-orange-500"
					>
						More
					</Link>
				)}
			</div>
		</main>
	);
}
