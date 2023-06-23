export default function Loading() {
	return (
		<main>
			<div className="flex items-center gap-10 p-4 mx-4 my-6 md:max-w-[65ch] md:mx-auto bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 dark:border-t-zinc-600">
				{[...Array(3)].map((_, i) => (
					<span
						key={i}
						className="px-4 py-2 rounded bg-zinc-300 dark:bg-zinc-600 animate-pulse"
					></span>
				))}
			</div>
			<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 dark:border-t-zinc-600 rounded mx-4 mb-6 md:max-w-[65ch] md:mx-auto divide-y divide-zinc-200 dark:divide-zinc-800">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="px-4 py-2 grid grid-cols-[1fr_10fr] animate-pulse"
					>
						<div className="flex flex-col justify-center">
							<span className="bg-zinc-300 dark:bg-zinc-600 w-4 h-4 rounded"></span>
						</div>
						<div>
							<div className="space-x-1">
								<span className="px-20 py-[0.015rem] rounded bg-zinc-300 dark:bg-zinc-600"></span>
								<span className="px-8 py-[0.015rem] rounded bg-zinc-300 dark:bg-zinc-600"></span>
							</div>
							<div className="mt-1">
								<span className="px-8 py-[0.015rem] rounded bg-zinc-300 dark:bg-zinc-600">
									{" "}
								</span>
							</div>
							<div className="mt-2 space-x-3">
								<span className="px-8 py-[0.015rem] rounded bg-zinc-300 dark:bg-zinc-600">
									{" "}
								</span>
								<span className="px-8 py-[0.015rem] rounded bg-zinc-300 dark:bg-zinc-600">
									{" "}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
