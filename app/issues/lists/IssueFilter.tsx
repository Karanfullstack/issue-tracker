"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface IssueFilterProps {
	value?: Status;
	label: string;
}
const statuses: IssueFilterProps[] = [
	{ label: "All" },
	{ label: "In Progress", value: "IN_PROGRESS" },
	{ label: "Closed", value: "CLOSED" },
	{ label: "Open", value: "OPEN" },
];
export default function IssueFilter() {
	const router = useRouter();
	return (
		<Select.Root
			onValueChange={(status) => {
				const query = status === "none" ? "" : `?status=${status}`;
				router.push("/issues/lists" + query);
				router.refresh();
			}}
		>
			<Select.Trigger placeholder="Filter by status" />
			<Select.Content>
				{statuses.map((status) => (
					<Select.Item key={status.label} value={status.value || "none"}>
						{status.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
}
