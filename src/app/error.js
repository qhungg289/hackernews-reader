"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="flex flex-col items-center justify-center">
			<div className="space-y-8 rounded bg-black border border-neutral-200 dark:border-neutral-800 w-5/6 max-w-md p-4 mt-24">
				<div className="space-y-4 font-bold">
					<p className="text-8xl">:(</p>
					<p className="text-xl">Something went wrong!</p>
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
