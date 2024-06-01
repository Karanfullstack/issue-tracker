import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function IssueActions() {
	return (
		<div className="mb-4">
			<Button>
				<Link href="/issues/new">Create</Link>
			</Button>
		</div>
	);
}
