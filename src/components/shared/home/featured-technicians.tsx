import Link from "next/link";
import { ArrowRight, UsersRound } from "lucide-react";
import { FeaturedTechniciansGrid } from "./featured-technicians-grid";
import { getAllTechnican } from "@/features/technician/api/technician";

export async function FeaturedTechnicians() {
	let technicians: Awaited<ReturnType<typeof getAllTechnican>> = [];
	let unavailable = false;

	try {
		technicians = await getAllTechnican();
	} catch {
		technicians = [];
		unavailable = true;
	}

	technicians = technicians
		.filter((technician) => technician.appRole === "technician")
		.slice(0, 4);

	return (
		<section
			aria-labelledby="featured-technicians-title"
			className="border-b border-border bg-card"
		>
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-2xl">
						<p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-secondary">
							Meet the professionals
						</p>
						<h2
							id="featured-technicians-title"
							className="text-3xl font-bold leading-tight tracking-tight text-card-foreground sm:text-4xl"
						>
							Skilled hands. Reliable service.
						</h2>
						<p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
							Meet the professionals ready to help take care of your home.
						</p>
					</div>

					<Link
						href="/services"
						className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						View All Technicians
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
							className="rounded-xl border border-border bg-background px-6 py-10 text-center"
						>
							<p className="font-bold text-card-foreground">
								Technicians are temporarily unavailable
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								Please try again shortly or browse the services directory.
							</p>
						</div>
					) : technicians.length === 0 ? (
						<div className="rounded-xl border border-dashed border-border bg-background px-6 py-12 text-center">
							<span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-secondary">
								<UsersRound className="size-5" aria-hidden="true" />
							</span>
							<p className="mt-4 font-bold text-card-foreground">
								No technicians available yet
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								Available professionals will appear as services are added.
							</p>
						</div>
					) : (
						<FeaturedTechniciansGrid technicians={technicians} />
					)}
				</div>
			</div>
		</section>
	);
}
