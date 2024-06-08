"use client";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";
export default function Navbar() {
	const currentPath = usePathname();
	const navbar = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues/lists" },
	];
	return (
		<nav className="flex space-x-4 p-4 h-20 border items-center mb-5">
			<Link href={"/"}>
				<AiFillBug size={25} />
			</Link>
			<ul className="flex space-x-3">
				{navbar.map((item) => (
					<li key={item.label}>
						<Link
							className={classNames({
								"text-zinc-900": currentPath === item.href,
								"text-zinc-500": currentPath !== item.href,
								"text-zinc-500 hover:text-zinc-800 transition-colors": true,
							})}
							href={item.href}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
