export default function Loading() {
	return (
		<main>
			<div className="bg-white dark:bg-black md:rounded border border-t-0 border-x-0 md:border-t md:border-x border-neutral-200 dark:border-neutral-800 md:mx-auto md:my-6 md:max-w-[80ch] p-4 divide-y-2 divide-neutral-200 dark:divide-neutral-800 overflow-auto">
				<div className="pb-4 animate-pulse">
					<div className="bg-neutral-300 dark:bg-neutral-600 rounded py-2 px-20 w-3/12"></div>
					<div className="bg-neutral-300 dark:bg-neutral-600 rounded py-2 px-36 mt-4"></div>
					<div className="mt-4 flex gap-1">
						<div className="bg-neutral-300 dark:bg-neutral-600 rounded py-2 w-1/6"></div>
						<div className="bg-neutral-300 dark:bg-neutral-600 rounded py-2 w-1/6"></div>
					</div>
				</div>
				<div className="animate-pulse">
					{[...Array(10)].map((_, i) => (
						<div
							key={i}
							className="my-4 pb-4 border-b-2 border-dashed border-neutral-200 dark:border-neutral-800"
						>
							<div className="bg-neutral-300 dark:bg-neutral-600 rounded py-[0.35rem] w-1/2"></div>
							{[...Array(3)].map((_, j) => (
								<div
									key={j}
									className="bg-neutral-300 dark:bg-neutral-600 rounded py-2 my-2"
								></div>
							))}
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
