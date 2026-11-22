"use client";

import Link from "next/link";
import { ArrowRight, House, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function FinalCallToAction() {
	const reduceMotion = useReducedMotion();

	return (
		<section aria-labelledby="final-cta-title" className="bg-background">
			<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
				<motion.div
					initial={reduceMotion ? false : { opacity: 0, y: 16 }}
					whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.48, ease: "easeOut" }}
					className="relative overflow-hidden rounded-xl border border-border bg-card px-6 py-12 shadow-sm sm:px-10 sm:py-14 lg:px-14 lg:py-16"
				>
					<div
						aria-hidden="true"
						className="absolute inset-y-0 right-0 hidden w-[38%] border-l border-border bg-accent/45 lg:block"
					/>
					<div
						aria-hidden="true"
						className="absolute -right-16 -top-16 size-44 rounded-full border border-border"
					/>
					<div
						aria-hidden="true"
						className="absolute right-8 top-8 hidden size-36 rounded-full border border-border lg:block"
					/>

					<motion.div
						animate={
							reduceMotion ? undefined : { y: [0, -5, 0], rotate: [0, 1.5, 0] }
						}
						transition={{
							duration: 4.2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						aria-hidden="true"
						className="absolute bottom-8 right-10 hidden size-24 items-center justify-center rounded-full border border-border bg-card text-secondary shadow-sm lg:flex"
					>
						<House className="size-10" strokeWidth={1.5} />
						<span className="absolute -right-2 -top-2 flex size-10 items-center justify-center rounded-full bg-secondary text-primary-foreground">
							<Wrench className="size-4" strokeWidth={2} />
						</span>
					</motion.div>

					<div className="relative max-w-2xl">
						<p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-secondary">
							<span className="h-px w-7 bg-brand-accent" aria-hidden="true" />
							Ready to get started?
						</p>
						<h2
							id="final-cta-title"
							className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-card-foreground sm:text-4xl lg:text-5xl"
						>
							Your home deserves the right hands.
						</h2>
						<p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
							From small fixes to bigger repairs, FixMate makes finding the
							right professional easier.
						</p>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								href="/services"
								className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
							>
								Explore Services
								<ArrowRight
									className="size-4 transition-transform group-hover:translate-x-0.5"
									aria-hidden="true"
								/>
							</Link>
							<Link
								href="/sign-up"
								className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-bold text-card-foreground transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
							>
								Join as Technician
							</Link>
						</div>

						<p className="mt-7 text-sm font-semibold text-muted-foreground">
							Your home. Your comfort. Our commitment.
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
