import { createIssueSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = createIssueSchema.safeParse(body);

	// if validation not success return error
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

	const issue = await prisma.issue.create({
		data: {
			title: validation.data.title,
			description: validation.data.description,
		},
	});

	return NextResponse.json(issue, { status: 201 });
}
