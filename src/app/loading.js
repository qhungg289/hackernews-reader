export default function Loading() {
	return (
		<main>
			<div className="bg-white dark:bg-black border border-t-0 border-x-0 md:border-t md:border-x border-neutral-200 dark:border-neutral-800 md:rounded mb-6 md:max-w-[80ch] md:mx-auto md:mt-6 divide-y divide-neutral-200 dark:divide-neutral-800">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="px-4 py-2 grid grid-cols-[1fr_10fr] animate-pulse"
					>
						<div className="flex flex-col justify-center">
							<span className="bg-neutral-300 dark:bg-neutral-600 w-4 h-4 rounded"></span>
						</div>
						<div>
							<div className="space-x-1">
								<span className="px-20 py-[0.015rem] rounded bg-neutral-300 dark:bg-neutral-600"></span>
								<span className="px-8 py-[0.015rem] rounded bg-neutral-300 dark:bg-neutral-600"></span>
							</div>
							<div className="mt-1">
								<span className="px-8 py-[0.015rem] rounded bg-neutral-300 dark:bg-neutral-600">
									{" "}
								</span>
							</div>
							<div className="mt-2 space-x-3">
								<span className="px-8 py-[0.015rem] rounded bg-neutral-300 dark:bg-neutral-600">
									{" "}
								</span>
								<span className="px-8 py-[0.015rem] rounded bg-neutral-300 dark:bg-neutral-600">
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
