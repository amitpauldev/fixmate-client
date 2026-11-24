import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	const pathname = request.nextUrl.pathname;
	const appRole = session.user.appRole;

	// Admin routes
	if (pathname.startsWith("/dashboard/admin")) {
		if (appRole !== "admin") {
			return NextResponse.redirect(new URL("/unauthorized", request.url));
		}
	}

	// Technician routes
	if (pathname.startsWith("/dashboard/technician")) {
		if (appRole !== "technician") {
			return NextResponse.redirect(new URL("/unauthorized", request.url));
		}
	}

	// Customer routes
	if (pathname.startsWith("/dashboard/customer")) {
		if (appRole !== "customer") {
			return NextResponse.redirect(new URL("/unauthorized", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
