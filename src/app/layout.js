import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Hacker News reader",
	description: "Simple Hacker News reader application built with Next.js",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} bg-zinc-950 text-zinc-50 relative`}
			>
				<header className="bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0">
					<Link
						href="/"
						className="flex items-center justify-center gap-2 group"
					>
						<div className="bg-orange-600 rounded aspect-square w-8 h-8 flex items-center justify-center font-medium select-none group-hover:-rotate-12 transition-all">
							H
						</div>
						<span>Hacker News</span>
					</Link>
				</header>

				{children}
			</body>
		</html>
	);
}
