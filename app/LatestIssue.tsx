import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

export default async function LatestIssue() {
	const issues = await prisma.issue.findMany({
		orderBy: {
			createdAt: "desc",
		},
		take: 5,
		include: {
			assignedToUser: true,
		},
	});
	return (
		<Card >
			<Heading ml={"3"}>Latest Issues</Heading>
			<Table.Root>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Flex align={"start"} justify={"between"}>
									<Flex direction="column" align={"start"} gap={"2"}>
										<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
										<IssueStatusBadge status={issue.status} />
									</Flex>
									{issue.assignedToUser && (
										<Avatar
											size={"2"}
											radius="full"
											src={issue.assignedToUser?.image!}
											fallback="?"
										/>
									)}
								</Flex>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	);
}
