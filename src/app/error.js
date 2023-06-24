"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="h-full flex flex-col items-center justify-center">
			<div className="space-y-6 rounded border border-neutral-200 dark:border-neutral-800 w-3/4 max-w-md p-4">
				<div className="space-y-4">
					<p className="text-8xl">:(</p>
					<p>Something went wrong!</p>
				</div>
				<button
					onClick={() => reset()}
					className="text-orange-500 hover:underline"
				>
					Try again
				</button>
			</div>
		</main>
	);
}
