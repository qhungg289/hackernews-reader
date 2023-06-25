import "./globals.css";
import { Roboto, Roboto_Mono } from "next/font/google";
import ScrollToTopButton from "./ScrollToTopButton";
import SearchParamsNavLink from "./SearchParamsNavLink";
import Logo from "./Logo";

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
				<header className="bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 p-4 sticky top-0 isolate z-50">
					<div className="md:max-w-[80ch] md:mx-auto flex items-center justify-between md:justify-start gap-8">
						<Logo />
						<div className="flex items-center gap-8">
							<SearchParamsNavLink
								href={{ query: { type: "top" } }}
							>
								Top
							</SearchParamsNavLink>
							<SearchParamsNavLink
								href={{ query: { type: "best" } }}
							>
								Best
							</SearchParamsNavLink>
							<SearchParamsNavLink
								href={{ query: { type: "new" } }}
							>
								New
							</SearchParamsNavLink>
						</div>
					</div>
				</header>

				{children}

				<ScrollToTopButton />
			</body>
		</html>
	);
}
