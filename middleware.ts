import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	if (!token) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	return NextResponse.next();
}
export const config = {
	matcher: ["/issues/new", "/issues/:id/edit"],
};
