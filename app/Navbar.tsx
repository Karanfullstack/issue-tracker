"use client";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Skeleton from "./components/Skeleton";
import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Text,
	Flex,
	Button,
} from "@radix-ui/themes";
export default function Navbar() {
	return (
		<nav
			className="
		   border p-4  mb-5"
		>
			<Container>
				<Flex justify={"between"} align={"center"}>
					<Flex gap={"3"}>
						<Link href={"/"}>
							<AiFillBug size={25} />
						</Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
}

const NavLinks = () => {
	const currentPath = usePathname();
	const navbar = [
		{ label: "Dashboard", href: "/" },
		{ label: "Issues", href: "/issues/lists" },
	];
	return (
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
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();
	if (status === "loading") return <Skeleton borderRadius={"50%"}  width={"2.5rem"} height={"2.5rem"} />;

	if (status === "unauthenticated") {
		return (
			<Button>
				<Link href="/api/auth/signin">Login</Link>
			</Button>
		);
	}

	return (
		<Box>
			{status === "authenticated" && (
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar
							src={session.user!.image!}
							size={"3"}
							fallback="?"
							radius="full"
						></Avatar>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Label>
							<Text size={"2"}>{session.user!.email}</Text>
						</DropdownMenu.Label>
						<DropdownMenu.Item>
							<Link href="/api/auth/signout">Logout</Link>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			)}
		</Box>
	);
};
