import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/authOptions";
import AssigneSelect from "../_components/AssigneSelect";
import { cache } from "react";

interface Props {
    params: { id: string };
}

const fetchData = cache((issueId: number) =>
    prisma.issue.findUnique({
        where: { id: issueId },
        include: {
            assignedToUser: true,
        },
    }),
);
export default async function page({ params }: Props) {
    const session = await getServerSession(AuthOptions);
    const issue = await fetchData(Number(params.id));

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
            <Box className=" md:col-span-4">
                <IssueDetails issue={issue} user={issue.assignedToUser} />
            </Box>

            {session && (
                <Flex direction={"column"} gap={"4"}>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                    <AssigneSelect issue={issue} />
                </Flex>
            )}
        </Grid>
    );
}

export async function generateMetadata({ params }: Props) {
    const issue = await fetchData(Number(params.id));

    return {
        title: issue?.title,
        description: issue?.description.substring(200, 300),
    };
}
