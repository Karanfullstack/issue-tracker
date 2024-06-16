import prisma from "@/prisma/client";
import IssueSumary from "./IssueSumary";
import LatestIssue from "./LatestIssue";

export default async function Home() {
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
		<main>
			<IssueSumary inProgress={inProgress} closed={closed}  open={open}/>
		</main>
	);
}
