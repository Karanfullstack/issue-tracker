"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
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
	return (
		<Select.Root
			onValueChange={(status) => {
				console.log(status);
			}}
		>
			<Select.Trigger placeholder="Filter by status" />
			<Select.Content>
				{statuses.map((status) => (
					<Select.Item value={status.value || "none"}>
						{status.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
}
