import "./globals.css";
import { Roboto, Roboto_Mono } from "next/font/google";
import ScrollToTopButton from "./ScrollToTopButton";
import Header from "./Header";

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
				<Header />

				{children}

				<ScrollToTopButton />
			</body>
		</html>
	);
}
