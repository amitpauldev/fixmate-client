"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { PublicNavItem } from "@/components/layout/public-navbar";
import { authClient } from "@/lib/auth/auth-client";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

type PublicMobileNavProps = {
	items: PublicNavItem[];
};

export function PublicMobileNav({ items }: PublicMobileNavProps) {
	const [open, setOpen] = useState(false);
	const [signOutOpen, setSignOutOpen] = useState(false);
	const [signingOut, setSigningOut] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = authClient.useSession();

	const handleSignOut = async () => {
		if (signingOut) return;
		setSigningOut(true);
		try {
			await authClient.signOut();
			toast.success("Signed out successfully.");
			setOpen(false);
			setSignOutOpen(false);
			router.push("/");
			router.refresh();
		} catch {
			toast.error("Unable to sign out. Please try again.");
		} finally {
			setSigningOut(false);
		}
	};

	useEffect(() => {
		if (!open) return;

		const handlePointerDown = (event: PointerEvent) => {
			if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
				menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
			}
		};
		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [open]);

	return (
		<div ref={menuRef} className="md:hidden">
			<button
				type="button"
				aria-label={open ? "Close navigation menu" : "Open navigation menu"}
				aria-expanded={open}
				aria-controls="public-mobile-menu"
				onClick={() => setOpen((current) => !current)}
				className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				{open ? (
					<X className="size-5" aria-hidden="true" />
				) : (
					<Menu className="size-5" aria-hidden="true" />
				)}
			</button>

			{open ? (
				<div
					id="public-mobile-menu"
					className="absolute inset-x-4 top-[4.75rem] max-w-50 rounded-2xl border border-border bg-card p-2 shadow-lg"
				>
					<div className="flex flex-col">
						{items.map((item) =>
							(() => {
								const active =
									item.href === "/"
										? pathname === "/"
										: pathname === item.href ||
											pathname.startsWith(`${item.href}/`);

								return (
									<Link
										key={item.href}
										href={item.href}
										onClick={() => setOpen(false)}
										aria-current={active ? "page" : undefined}
										className={
											active
												? "rounded-lg border-l-2 border-primary bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
												: "rounded-lg px-4 py-3 text-sm font-semibold text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
										}
									>
										{item.label}
									</Link>
								);
							})(),
						)}
						{session?.user ? (
							""
						) : (
							<div className="mt-2 flex flex-col gap-2 border-t border-border pt-2">
								<Link
									href="/sign-in"
									onClick={() => setOpen(false)}
									className="rounded-lg border border-border px-4 py-3 text-center text-sm font-semibold text-card-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								>
									Sign in
								</Link>
								<Link
									href="/sign-up"
									onClick={() => setOpen(false)}
									className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								>
									Get started
								</Link>
							</div>
						)}
					</div>
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
