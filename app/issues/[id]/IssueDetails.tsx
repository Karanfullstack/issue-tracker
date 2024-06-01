import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function IssueDetails({ issue }: { issue: Issue }) {
	return (
		<>
			<Heading>{issue.title}</Heading>
			<Flex gap={"3"} my={"3"}>
				<IssueStatusBadge status={issue.status} />
				<p>{issue.createdAt.toDateString()}</p>
			</Flex>
			<Card className="prose mt-6">
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</>
	);
}
