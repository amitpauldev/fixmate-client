"use client";

import Link from "next/link";
import { ArrowRight, House, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function FinalCallToAction() {
	const reduceMotion = useReducedMotion();

	return (
		<section
			aria-labelledby="final-cta-title"
			className="bg-background"
		>
			<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
				<motion.div
					initial={reduceMotion ? false : { opacity: 0, y: 16 }}
					whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.48, ease: "easeOut" }}
					className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary px-6 py-12 shadow-sm sm:px-10 sm:py-14 lg:px-14 lg:py-16"
				>
					<div
						aria-hidden="true"
						className="absolute inset-y-0 right-0 hidden w-[38%] border-l border-primary-foreground/10 bg-primary-foreground/[0.03] lg:block"
					/>
					<div
						aria-hidden="true"
						className="absolute -right-16 -top-16 size-44 rounded-full border border-primary-foreground/10"
					/>
					<div
						aria-hidden="true"
						className="absolute right-8 top-8 hidden size-36 rounded-full border border-primary-foreground/10 lg:block"
					/>

					<motion.div
						animate={
							reduceMotion
								? undefined
								: { y: [0, -5, 0], rotate: [0, 1.5, 0] }
						}
						transition={{
							duration: 4.2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						aria-hidden="true"
						className="absolute bottom-8 right-10 hidden size-24 items-center justify-center rounded-full border border-primary-foreground/15 bg-primary-foreground/10 text-primary-foreground lg:flex"
					>
						<House className="size-10" strokeWidth={1.5} />
						<span className="absolute -right-2 -top-2 flex size-10 items-center justify-center rounded-full bg-brand-accent text-brand-accent-foreground">
							<Wrench className="size-4" strokeWidth={2} />
						</span>
					</motion.div>

					<div className="relative max-w-2xl">
						<p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground/75">
							<span className="h-px w-7 bg-brand-accent" aria-hidden="true" />
							Ready to get started?
						</p>
						<h2
							id="final-cta-title"
							className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl"
						>
							Your home deserves the right hands.
						</h2>
						<p className="mt-5 max-w-xl text-base leading-7 text-primary-foreground/75 sm:text-lg sm:leading-8">
							From small fixes to bigger repairs, FixMate makes finding the
							right professional easier.
						</p>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								href="/services"
								className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-accent px-5 text-sm font-bold text-brand-accent-foreground shadow-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
							>
								Explore Services
								<ArrowRight
									className="size-4 transition-transform group-hover:translate-x-0.5"
									aria-hidden="true"
								/>
							</Link>
							<Link
								href="/sign-up"
								className="inline-flex h-12 items-center justify-center rounded-lg border border-primary-foreground/30 bg-primary-foreground/10 px-5 text-sm font-bold text-primary-foreground transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary-foreground/50 hover:bg-primary-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
							>
								Join as Technician
							</Link>
						</div>

						<p className="mt-7 text-sm font-semibold text-primary-foreground/70">
							Your home. Your comfort. Our commitment.
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
