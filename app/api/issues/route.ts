import { IssueScema } from "@/app/validations";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../auth/authOptions";

export async function POST(request: NextRequest) {
    const session = await getServerSession(AuthOptions);
    if (!session) return NextResponse.json({}, { status: 401 });
    const body = await request.json();
    const validation = IssueScema.safeParse(body);

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
