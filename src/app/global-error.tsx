"use client";

import { AlertTriangle, ArrowLeft, RefreshCw, Wrench } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
	error,
	retry,
}: {
	error: unknown;
	retry: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>Something went wrong | FixMate</title>
			</head>
			<body>
				<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 text-foreground sm:px-6">
					<div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-secondary/10 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full bg-brand-accent/10 blur-3xl" />

					<section className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-xl shadow-primary/5 sm:p-12">
						<div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
							<AlertTriangle aria-hidden="true" size={30} strokeWidth={1.8} />
						</div>

						<div className="mx-auto mt-7 flex items-center justify-center gap-2 text-sm font-bold tracking-[0.18em] text-secondary uppercase">
							<Wrench aria-hidden="true" size={16} />
							FixMate
						</div>
						<h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
							We hit a loose connection
						</h1>
						<p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
							Something unexpected interrupted this page. Try again, and we
							will get things back on track.
						</p>

						<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
							<button
								type="button"
								onClick={retry}
								className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								<RefreshCw aria-hidden="true" size={17} />
								Try again
							</button>
							<Link
								href="/"
								className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 text-sm font-bold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								<ArrowLeft aria-hidden="true" size={17} />
								Back to home
							</Link>
						</div>
					</section>
				</main>
			</body>
		</html>
	);
}