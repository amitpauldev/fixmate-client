import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
	title: "Unauthorized | FixMate",
	description: "You do not have permission to access this page.",
};

export default function UnauthorizedPage() {
	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12 text-foreground sm:px-8">
			<div
				aria-hidden="true"
				className="absolute -left-24 -top-24 size-72 rounded-full bg-secondary/10 blur-3xl sm:size-96"
			/>
			<div
				aria-hidden="true"
				className="absolute -bottom-32 -right-20 size-80 rounded-full bg-brand-accent/10 blur-3xl sm:size-[26rem]"
			/>

			<section
				aria-labelledby="unauthorized-title"
				className="relative w-full max-w-lg rounded-3xl border border-border bg-card px-6 py-10 text-center shadow-[0_24px_80px_-32px_rgba(23,63,53,0.28)] sm:px-12 sm:py-14"
			>
				<div className="mx-auto flex size-20 items-center justify-center rounded-2xl border border-destructive/15 bg-destructive/10 text-destructive sm:size-24">
					<div className="relative">
						<ShieldAlert
							aria-hidden="true"
							className="size-10 sm:size-12"
							strokeWidth={1.8}
						/>
						<LockKeyhole
							aria-hidden="true"
							className="absolute -bottom-2 -right-2 size-5 rounded-full border-2 border-card bg-card text-destructive"
						/>
					</div>
				</div>

				<p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-destructive">
					Error 403
				</p>
				<h1
					id="unauthorized-title"
					className="mt-3 text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl"
				>
					Access denied
				</h1>
				<p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
					This page is restricted to authorized users. If you think this is a
					mistake, please check your account permissions.
				</p>

				<Link
					href="/"
					className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
				>
					<ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2.5} />
					Back to home
				</Link>
			</section>
		</main>
	);
}
