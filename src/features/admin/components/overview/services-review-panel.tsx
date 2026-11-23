import Link from "next/link";
import { ArrowUpRight, ClipboardCheck } from "lucide-react";
import type { Service } from "@/features/services/types/service";

type ServicesReviewPanelProps = {
	services: Service[];
};

function formatAmount(amount: number) {
	return `Tk ${amount.toFixed(0)}`;
}

export function ServicesReviewPanel({ services }: ServicesReviewPanelProps) {
	const pendingServices = [...services]
		.filter((service) => service.approvalStatus === "pending")
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		.slice(0, 4);

	return (
		<section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-card-foreground">
					Services awaiting review
				</h2>
				<Link
					href="/dashboard/admin/services"
					className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary"
				>
					Review services
					<ArrowUpRight className="size-4" aria-hidden="true" />
				</Link>
			</div>

			{pendingServices.length === 0 ? (
				<div className="mt-5 flex min-h-28 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center">
					<ClipboardCheck
						className="size-6 text-muted-foreground"
						aria-hidden="true"
					/>
					<p className="mt-2 text-sm text-muted-foreground">
						No services need review
					</p>
				</div>
			) : (
				<div className="mt-4 grid">
					{pendingServices.map((service) => (
						<Link
							key={service._id}
							href="/dashboard/admin/services"
							className="flex items-center justify-between gap-4 border-b border-border/60 py-3 last:border-b-0"
						>
							<div className="min-w-0">
								<p className="truncate text-sm font-bold text-card-foreground">
									{service.title}
								</p>
								<p className="mt-1 truncate text-xs text-muted-foreground">
									{service.technicianName}, {service.category}
								</p>
							</div>
							<p className="shrink-0 text-sm font-bold text-card-foreground">
								{formatAmount(service.basePrice)}
							</p>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
