import Logo from "./Logo";
import SearchParamsNavLink from "./SearchParamsNavLink";

export default function Header() {
	return (
		<header className="bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 p-4 sticky top-0 isolate z-50">
			<div className="md:max-w-[80ch] md:mx-auto flex items-center justify-between md:justify-start gap-8">
				<Logo />
				<div className="flex items-center gap-8">
					<SearchParamsNavLink
						href={{ pathname: "/", query: { type: "top" } }}
					>
						Top
					</SearchParamsNavLink>
					<SearchParamsNavLink
						href={{ pathname: "/", query: { type: "best" } }}
					>
						Best
					</SearchParamsNavLink>
					<SearchParamsNavLink
						href={{ pathname: "/", query: { type: "new" } }}
					>
						New
					</SearchParamsNavLink>
				</div>
			</div>
		</header>
	);
}
