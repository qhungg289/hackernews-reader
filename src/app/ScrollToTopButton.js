"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		function handleScroll() {
			if (window.scrollY) {
				setIsShow(true);
				return;
			}

			setIsShow(false);
		}

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<button
			onClick={() => {
				window.scrollTo(0, 0);
			}}
			className={`fixed right-4 bottom-4 bg-orange-600 hover:bg-orange-500 focus-visible:bg-orange-500 text-white rounded ${
				isShow ? "opacity-100" : "pointer-events-none opacity-0"
			} flex items-center gap-1 p-2 transition-all`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
				/>
			</svg>
		</button>
	);
}
