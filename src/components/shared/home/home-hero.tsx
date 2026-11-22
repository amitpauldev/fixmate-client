import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { HeroProgressCard } from "./hero-progress-card";
import { HeroServiceCategories } from "./hero-service-categories";
import { HeroTrustBadge } from "./hero-trust-badge";
import { HeroWrenchBadge } from "./hero-wrench-badge";

export function HomeHero() {
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
							href="/about"
							className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-card px-20 text-sm font-bold text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							About us
						</Link>
					</div>
				</div>

				<HomeHeroVisual />
			</div>
		</section>
	);
}

export function HomeHeroVisual() {
	return (
		<div className="relative mx-auto w-full max-w-[560px]">
			<div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#f0f4ef]">
				<Image
					src="/images/Technician-with-Building.png"
					alt="FixMate technician ready to help with a repair"
					fill
					sizes="(max-width: 1024px) 100vw, 52vw"
					priority
					unoptimized
					className="object-contain object-bottom"
				/>
			</div>

			<HeroProgressCard />
			<HeroServiceCategories />
			<HeroTrustBadge />
			<HeroWrenchBadge />
		</div>
	);
}
