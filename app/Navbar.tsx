import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

export default function Navbar() {
	const navbar = [
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "Issues", href: "/issues" },
	];
	return (
		<nav className="flex space-x-4 p-4 h-20 border items-center mb-5">
			<Link href={"/"}>
				<AiFillBug size={25} />
			</Link>
			<ul className="flex space-x-3">
				{navbar.map((item) => (
					<li>
						<Link className=" text-zinc-500 hover:text-zinc-700 transition-colors" href={item.href}>{item.label}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
