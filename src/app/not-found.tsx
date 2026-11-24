import Link from "next/link";
import { ArrowLeft, Compass, Home, Wrench } from "lucide-react";

export default function NotFound() {
	return (
		<main className="relative flex min-h-[calc(100vh-4.5rem)] items-center justify-center overflow-hidden bg-background px-4 py-16 text-foreground sm:px-6">
			<div className="pointer-events-none absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60 blur-3xl" />

			<section className="relative w-full max-w-2xl text-center">
				<div className="mx-auto flex size-20 items-center justify-center rounded-3xl border border-border bg-card text-secondary shadow-lg shadow-primary/5">
					<Compass aria-hidden="true" size={40} strokeWidth={1.5} />
				</div>
				<p className="mt-8 text-7xl font-extrabold tracking-tight text-secondary sm:text-9xl">
					404
				</p>
				<div className="mx-auto mt-2 flex items-center justify-center gap-2 text-sm font-bold tracking-[0.18em] text-muted-foreground uppercase">
					<Wrench aria-hidden="true" size={15} />
					FixMate
				</div>
				<h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
					This page needs a repair
				</h1>
				<p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
					The address you entered does not point to a service or page we know.
					Let us take you somewhere useful.
				</p>
				<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Link
						href="/"
						className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<Home aria-hidden="true" size={17} />
						Go to homepage
					</Link>
					<Link
						href="/services"
						className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-bold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						Browse services
						<ArrowLeft aria-hidden="true" className="rotate-180" size={17} />
					</Link>
				</div>
			</section>
		</main>
	);
}
