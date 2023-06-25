import "./globals.css";
import { Roboto, Roboto_Mono } from "next/font/google";
import Link from "next/link";
import BackNavigationButton from "./BackNavigationButton";
import ScrollToTopButton from "./ScrollToTopButton";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-roboto",
});

const roboto_mono = Roboto_Mono({
	subsets: ["latin"],
	variable: "--font-roboto-mono",
});

export const metadata = {
	title: "Hacker News",
	description:
		"Simple Hacker News reader application built with Next.js (App router)",
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className="scroll-smooth selection:bg-orange-500 selection:text-white antialiased"
		>
			<body
				className={`${roboto.variable} ${roboto_mono.variable} font-sans bg-neutral-100 dark:bg-neutral-950 dark:text-neutral-50 relative h-full`}
			>
				<header className="bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 px-3 py-4 md:p-4 sticky top-0 isolate z-50">
					<div className="md:max-w-[70ch] md:mx-auto flex items-center justify-center relative">
						<BackNavigationButton />
						<Link
							href="/"
							className="flex items-center justify-center gap-2 w-fit group"
						>
							<div className="bg-orange-600 text-white rounded aspect-square w-8 h-8 flex items-center justify-center font-medium select-none">
								H
							</div>
							<span>Hacker News</span>
						</Link>
					</div>
				</header>

				{children}

				<ScrollToTopButton />
			</body>
		</html>
	);
}
