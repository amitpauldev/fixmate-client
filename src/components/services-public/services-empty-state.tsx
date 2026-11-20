import Link from "next/link";
import { RotateCcw, Wrench } from "lucide-react";

type ServicesEmptyStateProps = {
	error?: string;
};

export function ServicesEmptyState({ error }: ServicesEmptyStateProps) {
	const isError = Boolean(error);

	return (
		<section
			className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center"
			aria-labelledby="services-empty-title"
		>
			<div className="relative flex size-16 items-center justify-center rounded-2xl bg-accent text-secondary">
				<Wrench className="size-7" strokeWidth={1.7} aria-hidden="true" />
				<span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-card bg-brand-accent" />
			</div>
			<h2
				id="services-empty-title"
				className="mt-5 text-xl font-bold text-card-foreground"
			>
				{isError ? "We couldn't load services" : "No services found"}
			</h2>
			<p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
				{error ||
					"Try clearing your filters or checking back soon. Trusted technicians may add new repair options at any time."}
			</p>
			{!isError ? (
				<Link
					href="/services"
					className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<RotateCcw className="size-4" aria-hidden="true" />
					Reset filters
				</Link>
			) : null}
		</section>
	);
}
