export default function Loading() {
	return (
		<main>
			<div className="bg-white dark:bg-zinc-900 md:rounded border border-zinc-200 dark:border-zinc-800 dark:border-t-zinc-600 md:mx-auto md:my-6 md:max-w-[65ch] p-4 divide-y-2 divide-zinc-200 dark:divide-zinc-800 overflow-auto">
				<div className="pb-4 animate-pulse">
					<div className="bg-zinc-300 dark:bg-zinc-600 rounded py-2 px-20 w-3/12"></div>
					<div className="bg-zinc-300 dark:bg-zinc-600 rounded py-2 px-36 mt-4"></div>
					<div className="mt-4 flex gap-3">
						<div className="bg-zinc-300 dark:bg-zinc-600 rounded py-2 w-1/6"></div>
						<div className="bg-zinc-300 dark:bg-zinc-600 rounded py-2 w-1/6"></div>
					</div>
				</div>
				<div className="animate-pulse">
					{[...Array(10)].map((_, i) => (
						<div key={i} className="my-4">
							<div className="bg-zinc-300 dark:bg-zinc-600 rounded py-[0.35rem] w-1/5"></div>
							{[...Array(3)].map((_, j) => (
								<div
									key={j}
									className="bg-zinc-300 dark:bg-zinc-600 rounded py-2 my-2"
								></div>
							))}
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
