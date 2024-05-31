import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function IssuePage() {
	return (
		<div>
			<Button>
				<Link href="/issues/new">Create</Link>
			</Button>
		</div>
	);
}
