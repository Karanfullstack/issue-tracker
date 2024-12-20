import prisma from "@/prisma/client";
import IssueSumary from "./IssueSumary";
import LatestIssue from "./LatestIssue";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Dashboard() {
    const inProgress = await prisma.issue.count({
        where: { status: "IN_PROGRESS" },
    });
    const open = await prisma.issue.count({
        where: { status: "OPEN" },
    });
    const closed = await prisma.issue.count({
        where: { status: "CLOSED" },
    });
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
            <Flex direction={"column"} gap={"6"}>
                <IssueSumary
                    inProgress={inProgress}
                    closed={closed}
                    open={open}
                />

                <IssueChart
                    inProgress={inProgress}
                    closed={closed}
                    open={open}
                />
            </Flex>

            <LatestIssue />
        </Grid>
    );
}

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
    title: "Issue Tracker - Dashboard",
    description: "View a summary of project issues",
};
