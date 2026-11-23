"use client";

export type TechnicianRequestFilter =
	| "all"
	| "requested"
	| "accepted"
	| "in-progress"
	| "completed";

type TechnicianStatusTabsProps = {
	activeFilter: TechnicianRequestFilter;
	onFilterChange: (filter: TechnicianRequestFilter) => void;
	counts: Record<TechnicianRequestFilter, number>;
};

const tabs: Array<{ value: TechnicianRequestFilter; label: string }> = [
	{ value: "all", label: "All" },
	{ value: "requested", label: "Requested" },
	{ value: "accepted", label: "Accepted" },
	{ value: "in-progress", label: "In progress" },
	{ value: "completed", label: "Completed" },
];

export function TechnicianStatusTabs({
	activeFilter,
	onFilterChange,
	counts,
}: TechnicianStatusTabsProps) {
	return (
		<div
			aria-label="Filter technician requests"
			className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1.5 shadow-sm"
		>
			{tabs.map((tab) => (
				<button
					key={tab.value}
					type="button"
					aria-pressed={activeFilter === tab.value}
					onClick={() => onFilterChange(tab.value)}
					className={`h-9 shrink-0 cursor-pointer rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
						activeFilter === tab.value
							? "bg-primary text-primary-foreground"
							: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
					}`}
				>
					{tab.label} <span className="ml-1">{counts[tab.value]}</span>
				</button>
			))}
		</div>
	);
}
