import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueFilter from "./IssueFilter";

export default function IssueActions() {
	return (
		<Flex mb={"4"} justify={"between"}>
			<IssueFilter />
			<Button>
				<Link href="/issues/new">Create</Link>
			</Button>
		</Flex>
	);
}
