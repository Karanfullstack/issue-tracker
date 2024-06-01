import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
	params: { id: string };
}
export default async function page({ params }: Props) {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});
	if (!issue) notFound();
	return (
		<div>
			<Heading>{issue.title}</Heading>
			<Flex gap={"3"} my={"3"}>
				<IssueStatusBadge status={issue.status} />
				<p>{issue.createdAt.toDateString()}</p>
			</Flex>
			<Card>{issue.description}</Card>
		</div>
	);
}
