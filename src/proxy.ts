import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	const pathname = request.nextUrl.pathname;

	// Prevent logged-in users from accessing sign-in/sign-up
	if (pathname === "/sign-in" || pathname === "/sign-up") {
		if (session) {
			const role = session.user.appRole;

			const dashboardPath = {
				admin: "/dashboard/admin",
				technician: "/dashboard/technician",
				customer: "/dashboard/customer",
			}[role];

			if (dashboardPath) {
				return NextResponse.redirect(new URL(dashboardPath, request.url));
			}
		}

		return NextResponse.next();
	}

	if (!session) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

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
	matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
