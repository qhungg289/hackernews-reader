import { capitalize } from "@/utils/string";
import { diffFromUnixSecondToNow } from "@/utils/time";
import Link from "next/link";
import SearchParamsNavLink from "./SearchParamsNavLink";

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

async function getStories(page = 1, type = "top") {
	const storiesStartIndex = (page - 1) * itemsPerPage;
	const storiesEndIndex = storiesStartIndex + itemsPerPage;

	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/${type}stories.json`,
		{ cache: "no-store" },
	);

	if (!res.ok) {
		throw new Error("Can't get top stories!");
	}

	const topStoriesId = await res.json();
	const filteredTopStoriesId = topStoriesId.slice(
		storiesStartIndex,
		storiesEndIndex,
	);

	const isNextPageAvailable = !!topStoriesId[storiesEndIndex + 1];

	const stories = await Promise.all(
		filteredTopStoriesId.map((id) =>
			fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
				cache: "no-store",
			}).then((res) => res.json()),
		),
	);

	return { stories, isNextPageAvailable };
}

export default async function Home({ searchParams }) {
	const page = Number(searchParams.page ?? 1);

	const { stories, isNextPageAvailable } = await getStories(
		page,
		searchParams.type,
	);

	return (
		<main>
			<div className="bg-white dark:bg-black border border-t-0 border-x-0 md:border-t md:border-x border-neutral-200 dark:border-neutral-800 md:rounded md:max-w-[80ch] md:mx-auto md:mt-6 divide-y divide-neutral-200 dark:divide-neutral-800">
				{stories.map((story, index) => (
					<div key={story.id} className="px-4 py-2">
						<p className="text-neutral-500">
							{itemsPerPage * (page - 1) + (index + 1)}.
						</p>
						<div>
							{story.url ? (
								<div className="flex items-baseline flex-wrap gap-1">
									<a
										href={story.url}
										className="hover:underline font-medium"
									>
										{story.title}
									</a>
									<span className="text-sm text-neutral-500">
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
							<div className="font-mono text-xs text-neutral-500 mt-1">
								<span>
									Posted by {story.by}{" "}
									{diffFromUnixSecondToNow(story.time)}
								</span>
							</div>
							<div className="text-neutral-500 font-mono text-xs space-x-3 mt-2">
								<span>
									<span>{story.score} points</span>
									{" | "}
									<Link
										href={`/story/${story.id}`}
										className="hover:underline"
									>
										{story.descendants} comments
									</Link>
								</span>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex items-center gap-4 mx-4 mt-6 mb-16 md:max-w-[80ch] md:mx-auto">
				{isNextPageAvailable && (
					<Link
						href={{
							query: {
								page: page + 1,
								type: searchParams.type,
							},
						}}
						className="bg-orange-600 text-white flex items-center justify-center rounded w-full p-2 font-medium hover:bg-orange-500 focus-visible:bg-orange-500 transition-colors"
					>
						More stories...
					</Link>
				)}
			</div>
		</main>
	);
}
