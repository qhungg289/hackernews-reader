"use client";

import { usePathname, useRouter } from "next/navigation";

export default function BackNavigationButton() {
	const router = useRouter();
	const pathname = usePathname();

	if (pathname == "/") return null;

	return (
		<button
			onClick={() => router.back()}
			className="flex items-center justify-center gap-1 absolute inset-y-0 left-0 group"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6 group-hover:-translate-x-1 transition-all"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M15.75 19.5L8.25 12l7.5-7.5"
				/>
			</svg>
			<span className="group-hover:underline">Back</span>
		</button>
	);
}
