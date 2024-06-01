import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { number } from "zod";

interface Props {
	params: { id: string };
}
export default async function page({ params }: Props) {
	if (typeof params.id !== "number") notFound();

	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});
	if (!issue) notFound();
	return (
		<div>
			<p>{issue.title}</p>
			<p>{issue.status}</p>
			<p>{issue.description}</p>
			<p>{issue.createdAt.toDateString()}</p>
		</div>
	);
}
