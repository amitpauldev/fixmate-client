import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

type OverviewStatCardProps = {
	label: string;
	value: string | number;
	detail: string;
	icon: ComponentType<LucideProps>;
	accent?: "primary" | "progress" | "accepted";
};

export function OverviewStatCard({
	label,
	value,
	detail,
	icon: Icon,
	accent = "primary",
}: OverviewStatCardProps) {
	const iconStyles = {
		primary: "bg-accent text-primary",
		progress: "bg-status-progress/10 text-status-progress",
		accepted: "bg-status-accepted/10 text-status-accepted",
	};

	return (
		<article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
			<div className="flex items-start justify-between gap-3">
				<div>
					<p className="text-sm font-semibold text-muted-foreground">{label}</p>
					<p className="mt-4 text-3xl font-bold text-card-foreground">{value}</p>
				</div>
				<span
					className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconStyles[accent]}`}
				>
					<Icon className="size-5" aria-hidden="true" />
				</span>
			</div>
			<p className="mt-1 text-xs text-muted-foreground">{detail}</p>
		</article>
	);
}
