import { Status } from "@prisma/client";
import { Card, Flex, Text, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
	open: number;
	inProgress: number;
	closed: number;
}
interface StatusProps {
	label: string;
	value: number;
	status: Status;
}
export default function IssueSumary({ open, inProgress, closed }: Props) {
	const status: StatusProps[] = [
		{ label: "Open Issues", value: open, status: "OPEN" },
		{ label: "Closed Issues", value: closed, status: "CLOSED" },
		{ label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
	];
	return (
		<section>
			<Flex gap={"4"}>
				{status.map((status) => (
					<Link
						key={status.status}
						href={`/issues/lists/?status=${status.status}`}
					>
						<Card>
							<Flex align={"start"} direction={"column"} gap={"2"}>
								<Heading weight={"medium"} size={"3"}>
									{status.label}
								</Heading>
								<Text size={"5"} weight={"bold"} align={"center"}>
									{status.value}
								</Text>
							</Flex>
						</Card>
					</Link>
				))}
			</Flex>
		</section>
	);
}
