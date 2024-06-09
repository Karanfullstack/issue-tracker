import { IssueStatusBadge } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Heading, Text, Flex, Card, Avatar } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import StatusSelect from "../_components/StatusSelect";

interface Props {
	issue: Issue;
	user: User | null;
}
export default function IssueDetails({ issue, user }: Props) {
	return (
		<>
			<Heading>{issue.title}</Heading>
			<Flex gap={"3"} my={"3"} align={"center"}>
				<IssueStatusBadge status={issue.status} />
				<p>{issue.createdAt.toDateString()}</p>
				<StatusSelect issue={issue} />
				{user && (
					<Flex gap={"2"}>
						<Avatar size={"1"} src={user?.image!} fallback="?" />
						<Text weight={"medium"}>Assigned To {user?.name}</Text>
					</Flex>
				)}
			</Flex>
			<Card className="prose max-w-full mt-6">
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</>
	);
}
