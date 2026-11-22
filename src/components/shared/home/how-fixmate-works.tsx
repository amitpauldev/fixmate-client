"use client";

import type { ComponentType } from "react";
import {
	CalendarCheck,
	Search,
	Wrench,
	type LucideProps,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type ProcessStep = {
	number: string;
	title: string;
	description: string;
	icon: ComponentType<LucideProps>;
};

const processSteps: ProcessStep[] = [
	{
		number: "01",
		title: "Find a Service",
		description:
			"Explore available services and choose the repair your home needs.",
		icon: Search,
	},
	{
		number: "02",
		title: "Book Your Repair",
		description:
			"Choose your preferred technician, select a suitable time and submit your booking.",
		icon: CalendarCheck,
	},
	{
		number: "03",
		title: "Get It Fixed",
		description:
			"Get your repair handled by a professional and enjoy a hassle-free experience.",
		icon: Wrench,
	},
];

export function HowFixMateWorks() {
	const reduceMotion = useReducedMotion();

	return (
		<section
			aria-labelledby="how-fixmate-works-title"
			className="relative overflow-hidden border-b border-border bg-card"
		>
			<div
				aria-hidden="true"
				className="absolute left-[-7rem] top-12 size-64 rounded-full bg-accent/50 blur-3xl"
			/>
			<div
				aria-hidden="true"
				className="absolute bottom-[-9rem] right-[-5rem] size-72 rounded-full bg-brand-accent/10 blur-3xl"
			/>

			<div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<header className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">
						Simple process
					</p>
					<h2
						id="how-fixmate-works-title"
						className="mt-3 text-3xl font-bold leading-tight tracking-tight text-card-foreground sm:text-4xl"
					>
						Getting things fixed is easy.
					</h2>
					<p className="mt-4 text-base leading-7 text-muted-foreground">
						Three simple steps to get your home back in order.
					</p>
				</header>

				<div className="relative mt-12 sm:mt-14">
					<div
						aria-hidden="true"
						className="absolute left-[calc(16.666%-1.5rem)] right-[calc(16.666%-1.5rem)] top-[54px] hidden h-px overflow-hidden bg-border lg:block"
					>
						<motion.div
							initial={reduceMotion ? false : { scaleX: 0 }}
							whileInView={reduceMotion ? undefined : { scaleX: 1 }}
							viewport={{ once: true, amount: 0.35 }}
							transition={{ duration: 0.8, ease: "easeOut" }}
							className="h-full origin-left bg-secondary/60"
						/>
					</div>

					<ol className="relative grid gap-5 lg:grid-cols-3 lg:gap-8">
						{processSteps.map((step, index) => {
							const Icon = step.icon;

							return (
								<motion.li
									key={step.number}
									initial={
										reduceMotion ? false : { opacity: 0, y: 18 }
									}
									whileInView={
										reduceMotion ? undefined : { opacity: 1, y: 0 }
									}
									viewport={{ once: true, amount: 0.25 }}
									transition={{
										duration: 0.44,
										delay: reduceMotion ? 0 : index * 0.12,
										ease: "easeOut",
									}}
									className="relative"
								>
									<motion.article
										whileHover={
											reduceMotion ? undefined : { y: -5 }
										}
										transition={{ duration: 0.22, ease: "easeOut" }}
										className="relative h-full rounded-xl border border-border bg-background p-6 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-secondary/35 hover:shadow-md sm:p-7"
									>
										<div className="flex items-start justify-between gap-4">
											<span
												aria-hidden="true"
												className="flex size-11 items-center justify-center rounded-full border border-secondary/25 bg-accent text-secondary"
											>
												<Icon className="size-5" strokeWidth={1.8} />
											</span>
											<span className="text-5xl font-bold leading-none tracking-tight text-border sm:text-6xl">
												{step.number}
											</span>
										</div>

										<h3 className="mt-8 text-xl font-bold tracking-tight text-card-foreground">
											{step.title}
										</h3>
										<p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
											{step.description}
										</p>
									</motion.article>

									{index < processSteps.length - 1 ? (
										<div
											aria-hidden="true"
											className="mx-auto h-5 w-px bg-secondary/30 lg:hidden"
										/>
									) : null}
								</motion.li>
							);
						})}
					</ol>
				</div>
			</div>
		</section>
	);
}
