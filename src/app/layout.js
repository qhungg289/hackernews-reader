import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import BackNavigationButton from "./BackNavigationButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Hacker News",
	description:
		"Simple Hacker News reader application built with Next.js (App router)",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={`${inter.className} bg-zinc-100 dark:bg-zinc-950 dark:text-zinc-50 relative`}
			>
				<header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 sticky top-0 isolate z-50">
					<div className="md:max-w-[65ch] md:mx-auto flex items-center justify-center relative">
						<BackNavigationButton />
						<Link
							href="/"
							className="flex items-center justify-center gap-2 w-fit group"
						>
							<div className="bg-orange-600 text-white rounded aspect-square w-8 h-8 flex items-center justify-center font-medium select-none hover:-translate-y-1 transition-all">
								H
							</div>
							<span>Hacker News</span>
						</Link>
					</div>
				</header>

				{children}
			</body>
		</html>
	);
}
