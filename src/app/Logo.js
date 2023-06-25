"use client";

import { useRouter } from "next/navigation";

export default function Logo() {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className="flex items-center justify-center gap-2 w-fit group"
		>
			<div className="bg-orange-600 text-white rounded aspect-square w-8 h-8 flex items-center justify-center font-medium select-none">
				H
			</div>
			<span className="hidden md:block">Hacker News</span>
		</button>
	);
}
