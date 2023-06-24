"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SearchParamsNavLink({ href, children }) {
	const searchParams = useSearchParams();
	const isActive =
		searchParams.get("type") == href.query.type ||
		(!searchParams.get("type") && href.query.type == "top");

	return (
		<div className="flex flex-col items-center relative">
			<Link
				className={`px-4 py-1 ${
					isActive
						? "text-orange-500 font-medium"
						: "text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
				} transition-colors`}
				href={href}
			>
				{children}
			</Link>
			{isActive && (
				<div className="absolute bottom-0 w-1 h-1 bg-orange-500 rounded-full"></div>
			)}
		</div>
	);
}
