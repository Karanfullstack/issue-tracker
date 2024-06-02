import { NextRequest, NextResponse } from "next/server";
import { IssueScema } from "@/app/validations";
import prisma from "@/prisma/client";

interface ParamsProps {
	params: { id: string };
}
export async function PATCH(request: NextRequest, { params }: ParamsProps) {
	const body = await request.json();
	const validations = IssueScema.safeParse(body);

	if (!validations.success)
		return NextResponse.json(
			{ error: validations.error.format() },
			{ status: 400 }
		);

	const issue = await prisma.issue.findFirst({
		where: { id: parseInt(params.id) },
	});

	if (!issue)
		return NextResponse.json({ error: "Issue Not found" }, { status: 404 });

	const newIssue = await prisma.issue.update({
		where: { id: parseInt(params.id) },
		data: {
			title: validations.data.title,
			description: validations.data.description,
		},
	});
	return NextResponse.json(
		{ newIssue, message: "Issue Updated" },
		{ status: 201 }
	);
}
