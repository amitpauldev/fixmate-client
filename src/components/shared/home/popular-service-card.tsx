import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import type { Service } from "@/features/services/types/service";

type PopularServiceCardProps = {
	service: Service;
};

export function PopularServiceCard({ service }: PopularServiceCardProps) {
	return (
		<article className="group h-full overflow-hidden rounded-xl border border-border bg-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg">
			<Link
				href={`/services/${service._id}`}
				aria-label={`View ${service.title} service`}
				className="flex h-full flex-col rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<div className="relative aspect-[16/10] overflow-hidden bg-muted">
					{service.image ? (
						<Image
							src={service.image}
							alt={`${service.title} repair service`}
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							unoptimized
							className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
						/>
					) : (
						<div className="absolute inset-0 flex items-center justify-center text-secondary">
							<Wrench
								className="size-12"
								strokeWidth={1.25}
								aria-hidden="true"
							/>
						</div>
					)}
					<span className="absolute left-4 top-4 rounded-full border border-border bg-card/95 px-3 py-1 text-xs font-bold text-card-foreground shadow-sm backdrop-blur">
						{service.category}
					</span>
				</div>

				<div className="flex flex-1 flex-col p-5">
					<h3 className="line-clamp-2 text-lg font-bold leading-7 text-card-foreground">
						{service.title}
					</h3>
					<p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
						{service.description}
					</p>

					<div className="mt-5 flex items-end justify-between border-t border-border pt-4">
						<div>
							<p className="text-xs font-semibold text-muted-foreground">
								Starting price
							</p>
							<p className="mt-1 text-lg font-bold text-card-foreground">
								tk. {service.basePrice.toFixed(2)}
							</p>
						</div>
						<span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
							<ArrowRight
								className="size-4 transition-transform group-hover:translate-x-0.5"
								aria-hidden="true"
							/>
						</span>
					</div>
				</div>
			</Link>
		</article>
	);
}
