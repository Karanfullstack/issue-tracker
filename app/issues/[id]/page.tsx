import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/authOptions";
import AssigneSelect from "../_components/AssigneSelect";

interface Props {
	params: { id: string };
}
export default async function page({ params }: Props) {
	const session = await getServerSession(AuthOptions);
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
			<Box className=" md:col-span-4">
				<IssueDetails issue={issue} />
			</Box>

			{session && (
				<Flex direction={"column"} gap={"4"}>
					<AssigneSelect issue={issue} />
					<EditIssueButton issueId={issue.id} />
					<DeleteIssueButton issueId={issue.id} />
				</Flex>
			)}
		</Grid>
	);
}
