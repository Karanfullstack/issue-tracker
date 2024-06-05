import React from "react";

import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueSkeleton from "../loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueSkeleton />,
});
interface Props {
	params: { id: string };
}
export default async function EditIssuePage({ params }: Props) {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});
	if (!issue) notFound();
	return <IssueForm issue={issue} />;
}
