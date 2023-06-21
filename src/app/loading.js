"use client";

import { CircleNotch } from "@phosphor-icons/react";

export default function Loading() {
	return (
		<div className="mt-4 flex justify-center">
			<div className="bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 p-2">
				<div className="animate-spin">
					<CircleNotch size={32} style={{ color: "#f97316" }} />
				</div>
			</div>
		</div>
	);
}
