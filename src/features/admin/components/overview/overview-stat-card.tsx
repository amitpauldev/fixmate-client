import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

type OverviewStatCardProps = {
	label: string;
	value: string | number;
	detail: string;
	icon: ComponentType<LucideProps>;
	featured?: boolean;
};

export function OverviewStatCard({
	label,
	value,
	detail,
	icon: Icon,
	featured = false,
}: OverviewStatCardProps) {
	return (
		<article
			className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm ${
				featured
					? "border-primary/10 bg-primary text-primary-foreground"
					: "border-border bg-card text-card-foreground"
			}`}
		>
			{featured && (
				<div
					className="absolute -right-8 -top-10 size-28 rounded-full border border-primary-foreground/10"
					aria-hidden="true"
				/>
			)}
			<div className="relative flex items-start justify-between gap-4">
				<div>
					<p
						className={`text-sm font-semibold ${
							featured
								? "text-primary-foreground/75"
								: "text-muted-foreground"
						}`}
					>
						{label}
					</p>
					<p className="mt-4 text-3xl font-bold">{value}</p>
				</div>
				<span
					className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
						featured
							? "bg-primary-foreground/10 text-primary-foreground"
							: "bg-accent text-primary"
					}`}
				>
					<Icon className="size-5" aria-hidden="true" />
				</span>
			</div>
			<p
				className={`relative mt-1 text-xs ${
					featured
						? "text-primary-foreground/70"
						: "text-muted-foreground"
				}`}
			>
				{detail}
			</p>
		</article>
	);
}
