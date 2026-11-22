type ServicePricingCardProps = {
	basePrice: number;
};

export function ServicePricingCard({ basePrice }: ServicePricingCardProps) {
	return (
		<aside className="rounded-3xl border border-border bg-card p-6 shadow-sm">
			<p className="text-sm font-medium text-muted-foreground">Starting price</p>
			<p className="mt-1 text-4xl font-bold tracking-tight text-card-foreground">
				tk. {basePrice.toFixed(0)}
			</p>
			<p className="mt-3 text-sm leading-6 text-muted-foreground">
				The technician confirms the final price when the job is done. You pay
				only after that.
			</p>
			<button
				type="button"
				className="mt-6 h-12 w-full rounded-xl bg-brand-accent px-5 text-sm font-bold text-brand-accent-foreground shadow-sm transition-colors hover:bg-brand-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				Request repair
			</button>
		</aside>
	);
}
