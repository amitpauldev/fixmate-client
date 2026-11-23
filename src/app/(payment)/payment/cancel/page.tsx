import Link from "next/link";

export default function PaymentCancelPage() {
	return (
		<main className="mx-auto flex min-h-[calc(100vh-4.5rem)] w-full max-w-xl items-center px-4 py-12">
			<section className="w-full rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
				<div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
					<span aria-hidden="true" className="text-2xl font-bold">
						!
					</span>
				</div>
				<h1 className="mt-5 text-2xl font-bold text-card-foreground">
					Payment cancelled
				</h1>
				<p className="mt-3 text-sm leading-6 text-muted-foreground">
					No payment was completed. Your booking remains unpaid and can be paid later.
				</p>
				<Link
					href="/dashboard/customer/bookings"
					className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-brand-accent px-5 text-sm font-bold text-brand-accent-foreground transition-colors hover:bg-brand-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					Return to my bookings
				</Link>
			</section>
		</main>
	);
}
