"use client";

export type BookingFilter = "all" | "active" | "to-pay" | "paid" | "closed";

type BookingStatusTabsProps = {
	activeFilter: BookingFilter;
	onFilterChange: (filter: BookingFilter) => void;
	counts: Record<BookingFilter, number>;
};

export function BookingStatusTabs({
	activeFilter,
	onFilterChange,
	counts,
}: BookingStatusTabsProps) {
	const tabs: Array<{ value: BookingFilter; label: string }> = [
		{ value: "all", label: "All" },
		{ value: "active", label: "Active" },
		{ value: "to-pay", label: "To pay" },
		{ value: "paid", label: "Paid" },
		{ value: "closed", label: "Closed" },
	];

	return (
		<div
			className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1.5 shadow-sm"
			aria-label="Booking filters"
		>
			{tabs.map((tab) => {
				const selected = activeFilter === tab.value;

				return (
					<button
						key={tab.value}
						type="button"
						aria-pressed={selected}
						onClick={() => onFilterChange(tab.value)}
						className={`h-9 shrink-0 rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
							selected
								? "bg-primary text-primary-foreground"
								: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						}`}
					>
						{tab.label} ({counts[tab.value]})
					</button>
				);
			})}
		</div>
	);
}
