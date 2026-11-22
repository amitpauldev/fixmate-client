"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
	ArrowRight,
	BadgeCheck,
	Handshake,
	ShieldCheck,
	Sparkles,
	type LucideProps,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type CoreValue = {
	title: string;
	description: string;
	icon: ComponentType<LucideProps>;
};

const coreValues: CoreValue[] = [
	{
		title: "Trust",
		description:
			"Helping customers find professionals they can feel comfortable inviting into their homes.",
		icon: ShieldCheck,
	},
	{
		title: "Reliability",
		description:
			"Making service details and booking progress clear from the first request to completion.",
		icon: BadgeCheck,
	},
	{
		title: "Community",
		description:
			"Creating useful connections between local homeowners and skilled technicians.",
		icon: Handshake,
	},
	{
		title: "Simplicity",
		description:
			"Keeping discovery, booking and service management straightforward in one place.",
		icon: Sparkles,
	},
];

export function AboutContent() {
	const reduceMotion = useReducedMotion();

	return (
		<>
			<section
				aria-labelledby="about-hero-title"
				className="relative overflow-hidden border-b border-border bg-background"
			>
				<div
					aria-hidden="true"
					className="absolute right-[-8rem] top-[-8rem] size-72 rounded-full bg-accent/55 blur-3xl"
				/>

				<div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,1.08fr)] lg:px-8 lg:py-24">
					<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 14 }}
						animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						transition={{ duration: 0.46, ease: "easeOut" }}
						className="max-w-xl"
					>
						<p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-secondary">
							About FixMate
						</p>
						<h1
							id="about-hero-title"
							className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
						>
							Making home maintenance simple and stress-free.
						</h1>
						<p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
							FixMate connects homeowners with skilled professionals, making it
							easier to find and book reliable home services.
						</p>
					</motion.div>

					<motion.div
						initial={
							reduceMotion ? false : { opacity: 0, x: 18, scale: 0.98 }
						}
						animate={
							reduceMotion
								? undefined
								: { opacity: 1, x: 0, scale: 1 }
						}
						transition={{
							duration: 0.52,
							delay: reduceMotion ? 0 : 0.08,
							ease: "easeOut",
						}}
						className="relative mx-auto w-full max-w-[560px]"
					>
						<div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-accent/55">
							<Image
								src="/images/hero-person.png"
								alt="A FixMate home repair professional"
								fill
								sizes="(max-width: 1024px) 100vw, 52vw"
								priority
								className="object-contain object-bottom"
							/>
						</div>
					</motion.div>
				</div>
			</section>

			<section
				aria-labelledby="who-we-are-title"
				className="border-b border-border bg-card"
			>
				<div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:px-8 lg:py-24">
					<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 12 }}
						whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.35 }}
						transition={{ duration: 0.42, ease: "easeOut" }}
					>
						<p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">
							Our platform
						</p>
						<h2
							id="who-we-are-title"
							className="mt-3 text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl"
						>
							Who We Are
						</h2>
					</motion.div>

					<motion.p
						initial={reduceMotion ? false : { opacity: 0, y: 12 }}
						whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.35 }}
						transition={{
							duration: 0.42,
							delay: reduceMotion ? 0 : 0.08,
							ease: "easeOut",
						}}
						className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9"
					>
						FixMate is a home-service booking platform designed to connect
						customers with technicians. We make discovering services and
						managing bookings easier through one convenient platform.
					</motion.p>
				</div>
			</section>

			<section
				aria-labelledby="core-values-title"
				className="border-b border-border bg-background"
			>
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
					<h2
						id="core-values-title"
						className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
					>
						Our Core Values
					</h2>

					<ul className="mt-10 grid gap-x-8 gap-y-10 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
						{coreValues.map((value, index) => {
							const Icon = value.icon;

							return (
								<motion.li
									key={value.title}
									initial={
										reduceMotion ? false : { opacity: 0, y: 14 }
									}
									whileInView={
										reduceMotion ? undefined : { opacity: 1, y: 0 }
									}
									viewport={{ once: true, amount: 0.25 }}
									transition={{
										duration: 0.38,
										delay: reduceMotion ? 0 : index * 0.08,
										ease: "easeOut",
									}}
								>
									<motion.div
										whileHover={reduceMotion ? undefined : { y: -3 }}
										transition={{ duration: 0.18, ease: "easeOut" }}
									>
										<span className="flex size-11 items-center justify-center rounded-lg border border-secondary/20 bg-accent text-secondary">
											<Icon
												className="size-5"
												strokeWidth={1.8}
												aria-hidden="true"
											/>
										</span>
										<h3 className="mt-5 text-lg font-bold text-foreground">
											{value.title}
										</h3>
										<p className="mt-2 text-sm leading-6 text-muted-foreground">
											{value.description}
										</p>
									</motion.div>
								</motion.li>
							);
						})}
					</ul>
				</div>
			</section>

			<section
				aria-labelledby="about-final-cta-title"
				className="bg-card"
			>
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
					<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 12 }}
						whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.25 }}
						transition={{ duration: 0.42, ease: "easeOut" }}
						className="flex flex-col items-start justify-between gap-7 border-l-2 border-secondary pl-6 sm:flex-row sm:items-end sm:pl-8"
					>
						<div className="max-w-2xl">
							<h2
								id="about-final-cta-title"
								className="text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl"
							>
								Let&apos;s make home care easier.
							</h2>
							<p className="mt-3 text-base leading-7 text-muted-foreground">
								Find the service you need and get started with FixMate.
							</p>
						</div>

						<Link
							href="/services"
							className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
						>
							Explore Services
							<ArrowRight
								className="size-4 transition-transform group-hover:translate-x-0.5"
								aria-hidden="true"
							/>
						</Link>
					</motion.div>
				</div>
			</section>
		</>
	);
}
