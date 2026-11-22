import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Wrench } from "lucide-react";
import type { Service } from "@/features/services/types/service";

type HomeHeroProps = {
	featuredService?: Service | null;
};

export function HomeHero({ featuredService }: HomeHeroProps) {
	return (
		<section
			aria-labelledby="home-hero-title"
			className="relative overflow-hidden border-b border-border bg-background"
		>
			<div
				aria-hidden="true"
				className="absolute inset-y-0 right-0 hidden w-[42%] bg-accent/45 lg:block"
			/>

			<div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)] lg:px-8 lg:py-24">
				<div className="max-w-xl">
					<p className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-secondary">
						<span className="flex size-8 items-center justify-center rounded-lg bg-accent">
							<ShieldCheck className="size-4" aria-hidden="true" />
						</span>
						Trusted repair specialists
					</p>

					<h1
						id="home-hero-title"
						className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
					>
						Repairs handled by people you can trust.
					</h1>

					<p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
						Find skilled technicians, compare clear starting prices, and keep
						your repair request moving from booking to completion.
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Link
							href="/services"
							className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
						>
							Browse repair services
							<ArrowRight className="size-4" aria-hidden="true" />
						</Link>
						<Link
							href="/sign-up"
							className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-card px-5 text-sm font-bold text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							Become a technician
						</Link>
					</div>
				</div>

				<HomeHeroVisual service={featuredService} />
			</div>
		</section>
	);
}

type HomeHeroVisualProps = {
	service?: Service | null;
};

export function HomeHeroVisual({ service }: HomeHeroVisualProps) {
	return (
		<div className="relative">
			<div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
				<div className="relative aspect-[4/3] overflow-hidden bg-muted">
					{service?.image ? (
						<Image
							src={service.image}
							alt={`${service.title} repair service`}
							fill
							sizes="(max-width: 1024px) 100vw, 52vw"
							priority
							unoptimized
							className="object-cover"
						/>
					) : (
						<div className="absolute inset-0 flex items-center justify-center bg-accent">
							<div className="flex size-32 items-center justify-center rounded-full border border-border bg-card text-secondary shadow-sm">
								<Wrench className="size-14" strokeWidth={1.35} aria-hidden="true" />
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="relative -mt-14 ml-4 mr-4 rounded-lg border border-border bg-card p-4 shadow-md sm:absolute sm:bottom-5 sm:left-5 sm:right-auto sm:mt-0 sm:w-[min(21rem,calc(100%-2.5rem))] sm:p-5">
				{service ? (
					<>
						<div className="flex items-start justify-between gap-4">
							<div className="min-w-0">
								<p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">
									{service.category}
								</p>
								<h2 className="mt-1 line-clamp-2 text-base font-bold leading-6 text-card-foreground sm:text-lg">
									{service.title}
								</h2>
							</div>
							<div className="shrink-0 text-right">
								<p className="text-xs text-muted-foreground">From</p>
								<p className="mt-0.5 text-base font-bold text-card-foreground">
									tk. {service.basePrice.toFixed(0)}
								</p>
							</div>
						</div>
						<div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
							<span className="flex min-w-0 items-center gap-1.5">
								<MapPin className="size-3.5 shrink-0 text-secondary" aria-hidden="true" />
								<span className="truncate">{service.serviceArea}</span>
							</span>
							<span className="ml-3 shrink-0 font-semibold text-card-foreground">
								{service.serviceMode}
							</span>
						</div>
					</>
				) : (
					<div className="flex items-center gap-3">
						<span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-secondary">
							<ShieldCheck className="size-5" aria-hidden="true" />
						</span>
						<div>
							<p className="text-sm font-bold text-card-foreground">
								Professional repair help
							</p>
							<p className="mt-0.5 text-xs text-muted-foreground">
								Home visit or shop drop-off
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
