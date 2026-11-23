import Link from "next/link";
import {
	ArrowRight,
	MapPin,
	Store,
	Truck,
	UserRound,
	Wrench,
} from "lucide-react";
import type { Service } from "@/features/services/types/service";

type ServiceCardProps = {
	service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
	return (
		<article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-lg">
			<div className="relative h-52 overflow-hidden bg-muted">
				{service.image ? (
					<div
						role="img"
						aria-label={`${service.title} service image`}
						className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
						style={{ backgroundImage: `url("${service.image}")` }}
					/>
				) : (
					<div className="flex h-full items-center justify-center text-secondary">
						<Wrench className="size-12" strokeWidth={1.3} aria-hidden="true" />
					</div>
				)}
				<span className="absolute left-4 top-4 rounded-full border border-white/40 bg-card/95 px-3 py-1 text-xs font-bold text-card-foreground shadow-sm backdrop-blur">
					{service.category}
				</span>
			</div>

			<div className="p-5">
				<h2 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-card-foreground">
					{service.title}
				</h2>

				<div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-muted-foreground">
					<span className="flex min-w-0 items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
						{service.serviceMode === "Home Visit" ? (
							<Truck
								className="size-4 shrink-0 text-secondary"
								aria-hidden="true"
							/>
						) : (
							<Store
								className="size-4 shrink-0 text-secondary"
								aria-hidden="true"
							/>
						)}
						<span className="truncate">{service.serviceMode}</span>
					</span>
					<span className="flex min-w-0 items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
						<MapPin
							className="size-4 shrink-0 text-secondary"
							aria-hidden="true"
						/>
						<span className="truncate">{service.serviceArea}</span>
					</span>
				</div>

				<div className="mt-5 flex items-end justify-between border-t border-border pt-4">
					<div>
						<p className="text-xs font-semibold text-muted-foreground">
							Starting price
						</p>
						<p className="mt-1 text-xl font-bold text-card-foreground">
							$ {service.basePrice.toFixed(2)}
						</p>
					</div>
					<div className="max-w-[45%] text-right">
						<p className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
							<UserRound className="size-3.5" aria-hidden="true" />
							Technician
						</p>
						<p className="mt-1 truncate text-sm font-bold text-card-foreground">
							{service.technicianName}
						</p>
					</div>
				</div>

				<Link
					href={`/services/${service._id}`}
					className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent text-sm font-bold text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					View Details
					<ArrowRight
						className="size-4 transition-transform group-hover:translate-x-0.5"
						aria-hidden="true"
					/>
				</Link>
			</div>
		</article>
	);
}
