export default function Loading() {
	return (
		<main>
			<div className="bg-white dark:bg-black border border-t-0 border-x-0 md:border-t md:border-x border-neutral-200 dark:border-neutral-800 md:rounded mb-6 md:max-w-[80ch] md:mx-auto md:mt-6 divide-y divide-neutral-200 dark:divide-neutral-800">
				{[...Array(20)].map((_, i) => (
					<div key={i} className="px-4 py-2 animate-pulse">
						<div className="flex flex-col justify-center">
							<span className="bg-neutral-300 dark:bg-neutral-600 p-3 w-3 rounded"></span>
						</div>
						<div>
							<div className="mt-1 grid grid-cols-4 gap-1">
								<span className="col-span-3 py-3 rounded bg-neutral-300 dark:bg-neutral-600"></span>
							</div>
							<div className="mt-1 px-8 py-2 max-w-[30%] rounded bg-neutral-300 dark:bg-neutral-600"></div>
							<div className="mt-1 grid grid-cols-8 gap-1">
								<div className="px-8 py-2 rounded bg-neutral-300 dark:bg-neutral-600">
									{" "}
								</div>
								<div className="px-8 py-2 rounded bg-neutral-300 dark:bg-neutral-600">
									{" "}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
