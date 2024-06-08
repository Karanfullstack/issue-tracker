"use client";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

export default function Navbar() {
	const { status, data: session } = useSession();
	const currentPath = usePathname();
	const navbar = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues/lists" },
	];
	return (
		<nav
			className="
		   border p-6  mb-5"
		>
			<Container>
				<Flex justify={"between"} align={"center"}>
					<Flex gap={"3"}>
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
											"text-zinc-500 hover:text-zinc-800 transition-colors":
												true,
										})}
										href={item.href}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
					<Box>
						{status === "authenticated" && (
							<Link href="/api/auth/signout">Logout</Link>
						)}
						{status === "unauthenticated" && (
							<Link href="/api/auth/signin">Login</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
}
