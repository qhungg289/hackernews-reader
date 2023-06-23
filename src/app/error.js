"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="min-h-screen flex flex-col items-center justify-center gap-4">
			<p className="bg-red-500 text-white px-6 py-4 rounded text-lg">
				An error occurred: {error.message}
			</p>
			<button
				onClick={() => reset()}
				className="hover:underline text-orange-500"
			>
				Retry
			</button>
		</main>
	);
}
