import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { getServices } from "@/lib/api/services";
import type { Service } from "@/features/services/types/service";
import { PopularServicesGrid } from "./popular-services-grid";

async function loadPopularServices(): Promise<Service[]> {
	const services = await getServices({ sort: "newest" });
	return services
		.filter((service) => service.isAvailable)
		.filter((service) => service.approvalStatus === "approved")
		.slice(0, 3);
}

export async function PopularServices() {
	let services: Service[] = [];
	let unavailable = false;

	try {
		services = await loadPopularServices();
	} catch {
		unavailable = true;
	}

	return (
		<section
			aria-labelledby="popular-services-title"
			className="border-b border-border bg-background"
		>
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-2xl">
						<p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-secondary">
							Popular services
						</p>
						<h2
							id="popular-services-title"
							className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl"
						>
							Services for every home.
						</h2>
						<p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
							From everyday maintenance to essential repairs, find the right
							professional for every job.
						</p>
					</div>

					<Link
						href="/services"
						className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						Explore All Services
						<ArrowRight
							className="size-4 transition-transform group-hover:translate-x-0.5"
							aria-hidden="true"
						/>
					</Link>
				</div>

				<div className="mt-9 sm:mt-11">
					{unavailable ? (
						<div
							role="status"
							className="rounded-xl border border-border bg-card px-6 py-10 text-center"
						>
							<p className="font-bold text-card-foreground">
								Services are temporarily unavailable
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								Please try again shortly or explore the full services directory.
							</p>
							<Link
								href="/services"
								className="mt-5 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								View services
							</Link>
						</div>
					) : services.length === 0 ? (
						<div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
							<span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-secondary">
								<Wrench className="size-5" aria-hidden="true" />
							</span>
							<p className="mt-4 font-bold text-card-foreground">
								No available services yet
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								New repair services will appear here as technicians join.
							</p>
						</div>
					) : (
						<PopularServicesGrid services={services} />
					)}
				</div>
			</div>
		</section>
	);
}
