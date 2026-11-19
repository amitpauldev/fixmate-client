"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ComponentType } from "react";
import {
	ArrowLeft,
	CalendarCheck,
	ChevronLeft,
	ChevronRight,
	ClipboardCheck,
	ClipboardList,
	LayoutDashboard,
	LogOut,
	Menu,
	ReceiptText,
	Settings,
	ShieldCheck,
	Users,
	Wrench,
	X,
	type LucideProps,
} from "lucide-react";
import toast from "react-hot-toast";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { authClient } from "@/lib/auth/auth-client";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type DashboardRole = "customer" | "technician" | "admin";

type DashboardMenuItem = {
	label: string;
	href: string;
	icon: ComponentType<LucideProps>;
};

type SessionUser = {
	role?: string;
};

const menuItems: Record<DashboardRole, DashboardMenuItem[]> = {
	customer: [
		{ label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
		{
			label: "My bookings",
			href: "/dashboard/customer/bookings",
			icon: CalendarCheck,
		},
		{
			label: "Payment history",
			href: "/dashboard/customer/payments",
			icon: ReceiptText,
		},
		{ label: "Update Profile", href: "/dashboard/profile", icon: Settings },
	],
	technician: [
		{ label: "Overview", href: "/dashboard/technician", icon: LayoutDashboard },
		{
			label: "Add a service",
			href: "/dashboard/technician/add-service",
			icon: Wrench,
		},
		{
			label: "My services",
			href: "/dashboard/technician/my-services",
			icon: ClipboardCheck,
		},
		{
			label: "Manage Request",
			href: "/dashboard/technician/requests",
			icon: ClipboardList,
		},
		{ label: "Update Profile", href: "/dashboard/profile", icon: Settings },
	],
	admin: [
		{ label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
		{ label: "Manage users", href: "/dashboard/admin/users", icon: Users },
		{
			label: "Service Approval",
			href: "/dashboard/admin/services",
			icon: ShieldCheck,
		},
		{
			label: "All Bookings",
			href: "/dashboard/admin/bookings",
			icon: CalendarCheck,
		},
		{
			label: "Transactions",
			href: "/dashboard/admin/transactions",
			icon: ReceiptText,
		},
		{ label: "Update Profile", href: "/dashboard/profile", icon: Settings },
	],
};

export function getInitials(name?: string) {
	if (!name) return "--";
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");
}

function getDashboardRole(role?: string): DashboardRole {
	if (role === "technician" || role === "admin") return role;
	return "customer";
}

function isActiveRoute(pathname: string, href: string) {
	if (
		href === "/dashboard/profile" ||
		href === "/dashboard/customer" ||
		href === "/dashboard/technician" ||
		href === "/dashboard/admin"
	) {
		return pathname === href;
	}
	return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [signOutOpen, setSignOutOpen] = useState(false);
	const [signingOut, setSigningOut] = useState(false);

	const role = getDashboardRole(
		(session?.user as SessionUser | undefined)?.role,
	);
	const items = isPending ? menuItems.customer : menuItems[role];

	const handleSignOut = async () => {
		if (signingOut) return;
		setSigningOut(true);
		try {
			await authClient.signOut();
			toast.success("Signed out successfully.");
			setSignOutOpen(false);
			setMobileOpen(false);
			router.push("/");
			router.refresh();
		} catch {
			toast.error("Unable to sign out. Please try again.");
		} finally {
			setSigningOut(false);
		}
	};

	const renderSidebarContent = (expanded: boolean) => (
		<>
			<div
				className={`flex h-18 items-center border-b border-sidebar-border ${
					expanded ? "justify-between px-5" : "justify-center px-3"
				}`}
			>
				<Link
					href="/"
					aria-label="FixMate home"
					className="flex min-w-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					onClick={() => setMobileOpen(false)}
				>
					<Image
						src="/images/logo.png"
						alt=""
						width={40}
						height={40}
						priority
						className="size-10 shrink-0 rounded-xl object-contain"
					/>
					{expanded ? (
						<span className="truncate text-lg font-bold tracking-tight text-sidebar-foreground">
							Fix<span className="text-secondary">Mate</span>
						</span>
					) : null}
				</Link>

				<div className={collapsed ? "hidden" : ""}>
					<ThemeToggle />
				</div>

				<button
					type="button"
					aria-label="Close mobile menu"
					onClick={() => setMobileOpen(false)}
					className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
				>
					<X className="size-5" aria-hidden="true" />
				</button>
			</div>

			<nav
				aria-label="Dashboard navigation"
				className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 py-5"
			>
				{items.map((item) => {
					const Icon = item.icon;
					const active = isActiveRoute(pathname, item.href);

					return (
						<Link
							key={item.href}
							href={item.href}
							title={expanded ? undefined : item.label}
							aria-current={active ? "page" : undefined}
							onClick={() => setMobileOpen(false)}
							className={`relative flex h-11 items-center rounded-xl text-sm font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring ${
								expanded ? "gap-3 px-3" : "justify-center px-0"
							} ${
								active
									? "bg-primary text-primary-foreground shadow-sm"
									: "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
							}`}
						>
							<Icon className="size-5 shrink-0" aria-hidden="true" />
							{expanded ? <span className="truncate">{item.label}</span> : null}
						</Link>
					);
				})}
			</nav>

			<div className="border-t border-sidebar-border p-3">
				<Link
					href="/"
					title={expanded ? undefined : "Back to site"}
					onClick={() => setMobileOpen(false)}
					className={`flex h-11 items-center rounded-xl text-sm font-semibold text-sidebar-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
						expanded ? "gap-3 px-3" : "justify-center px-0"
					}`}
				>
					<ArrowLeft className="size-5 shrink-0" aria-hidden="true" />
					{expanded ? <span>Back to site</span> : null}
				</Link>
				<button
					type="button"
					title={expanded ? undefined : "Sign out"}
					onClick={() => setSignOutOpen(true)}
					className={`mt-1 flex h-11 w-full items-center rounded-xl text-sm font-semibold text-destructive transition-colors duration-200 hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
						expanded ? "gap-3 px-3" : "justify-center px-0"
					}`}
				>
					<LogOut className="size-5 shrink-0" aria-hidden="true" />
					{expanded ? <span>Sign out</span> : null}
				</button>
			</div>
		</>
	);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<aside
				className={`fixed inset-y-0 left-0 z-50 hidden flex-col border-r border-sidebar-border bg-sidebar shadow-sm transition-[width] duration-300 ease-in-out lg:flex ${
					collapsed ? "w-20" : "w-72"
				}`}
			>
				{renderSidebarContent(!collapsed)}
				<button
					type="button"
					aria-label={
						collapsed
							? "Expand dashboard sidebar"
							: "Collapse dashboard sidebar"
					}
					title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
					onClick={() => setCollapsed((current) => !current)}
					className="absolute -right-4.5 top-18 flex size-9 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-md transition-transform duration-200 hover:scale-105 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					{collapsed ? (
						<ChevronRight className="size-4" aria-hidden="true" />
					) : (
						<ChevronLeft className="size-4" aria-hidden="true" />
					)}
				</button>
			</aside>

			<div
				className={`transition-[padding] duration-300 ease-in-out ${
					collapsed ? "lg:pl-20" : "lg:pl-72"
				}`}
			>
				<main className="relative min-h-[calc(100vh-4.5rem)]">
					<header className="sticky top-0 z-40 flex h-18 items-center justify-between border-b border-border bg-sidebar px-4 backdrop-blur ">
						<div className="flex items-center gap-3">
							<button
								type="button"
								aria-label="Open dashboard menu"
								aria-expanded={mobileOpen}
								onClick={() => setMobileOpen(true)}
								className="lg:hidden flex size-10 items-center justify-center rounded-lg text-card-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								<Menu className="size-5" aria-hidden="true" />
							</button>
							<span className="truncate text-lg font-bold tracking-tight text-sidebar-foreground">
								Dashboard
							</span>
						</div>
						<div className="flex items-center gap-3">
							<span className="text-sm font-medium text-muted-foreground">
								{session?.user.role}
							</span>
							<Link href="/dashboard/profile">
								{session?.user.image ? (
									<div className="relative h-10 w-10 overflow-hidden rounded-full border border-border bg-card">
										<Image
											src={session.user.image}
											alt="User profile"
											width={40}
											height={40}
											className="rounded-full *:object-cover"
										/>
									</div>
								) : (
									<span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
										{getInitials(session?.user.name)}
									</span>
								)}
							</Link>
						</div>
					</header>

					{children}
				</main>
			</div>

			{mobileOpen ? (
				<div className="fixed inset-0 z-50 lg:hidden">
					<button
						type="button"
						aria-label="Close dashboard menu"
						onClick={() => setMobileOpen(false)}
						className="absolute inset-0 bg-black/45"
					/>
					<aside className="absolute inset-y-0 left-0 flex w-[min(18rem,calc(100%-3rem))] flex-col border-r border-sidebar-border bg-sidebar shadow-2xl">
						{renderSidebarContent(true)}
					</aside>
				</div>
			) : null}

			<ConfirmationDialog
				open={signOutOpen}
				title="Sign out of FixMate?"
				description="You will need to sign in again to access your account and dashboards."
				confirmLabel="Sign out"
				onOpenChange={setSignOutOpen}
				onConfirm={handleSignOut}
				isConfirming={signingOut}
			/>
		</div>
	);
}
