"use client";

import Image from "next/image";
import type { ComponentType } from "react";
import {
	CalendarCheck,
	Clock,
	Headset,
	ShieldCheck,
	type LucideProps,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type Benefit = {
	title: string;
	description: string;
	icon: ComponentType<LucideProps>;
};

const benefits: Benefit[] = [
	{
		title: "Trusted Professionals",
		description:
			"Find reliable service providers for your home maintenance needs.",
		icon: ShieldCheck,
	},
	{
		title: "Easy Booking",
		description:
			"Book your preferred service without unnecessary hassle.",
		icon: CalendarCheck,
	},
	{
		title: "Save Your Time",
		description:
			"Find the services you need in one convenient place.",
		icon: Clock,
	},
	{
		title: "Customer Support",
		description: "Get assistance whenever you need help.",
		icon: Headset,
	},
];

export function WhyChooseFixMate() {
	const reduceMotion = useReducedMotion();

	return (
		<section
			aria-labelledby="why-choose-fixmate-title"
			className="relative overflow-hidden border-b border-border bg-background"
		>
			<div
				aria-hidden="true"
				className="absolute right-[-10rem] top-[-8rem] size-80 rounded-full bg-accent/45 blur-3xl"
			/>

			<div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.96fr)_minmax(440px,1.04fr)] lg:px-8 lg:py-24">
				<motion.div
					initial={reduceMotion ? false : { opacity: 0, x: -18 }}
					whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="max-w-xl"
				>
					<p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">
						Why FixMate
					</p>
					<h2
						id="why-choose-fixmate-title"
						className="mt-3 text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
					>
						More than repairs. Peace of mind.
					</h2>
					<p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
						We make finding and booking home services simpler, safer and more
						convenient.
					</p>

					<ul className="mt-8 divide-y divide-border border-y border-border">
						{benefits.map((benefit, index) => (
							<BenefitRow
								key={benefit.title}
								benefit={benefit}
								index={index}
								reduceMotion={Boolean(reduceMotion)}
							/>
						))}
					</ul>
				</motion.div>

				<motion.div
					initial={
						reduceMotion ? false : { opacity: 0, x: 18, scale: 0.98 }
					}
					whileInView={
						reduceMotion
							? undefined
							: { opacity: 1, x: 0, scale: 1 }
					}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.55, ease: "easeOut" }}
					className="relative mx-auto w-full max-w-[560px]"
				>
					<div className="relative aspect-[4/4.5] overflow-hidden rounded-xl border border-border bg-accent/55 sm:aspect-[5/4] lg:aspect-[4/4.1]">
						<Image
							src="/images/hero-person.png"
							alt="FixMate technician providing professional home repair help"
							fill
							sizes="(max-width: 1024px) 100vw, 52vw"
							priority={false}
							className="object-contain object-bottom"
						/>
					</div>

					<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 10 }}
						whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{
							duration: 0.38,
							delay: reduceMotion ? 0 : 0.32,
							ease: "easeOut",
						}}
						className="absolute bottom-4 left-4 hidden items-center gap-3 rounded-lg border border-border bg-card p-3.5 shadow-lg sm:flex"
					>
						<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-secondary">
							<ShieldCheck className="size-5" aria-hidden="true" />
						</span>
						<div>
							<p className="text-sm font-bold text-card-foreground">
								Reliable help
							</p>
							<p className="mt-0.5 text-xs text-muted-foreground">
								For the jobs that matter
							</p>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

type BenefitRowProps = {
	benefit: Benefit;
	index: number;
	reduceMotion: boolean;
};

function BenefitRow({
	benefit,
	index,
	reduceMotion,
}: BenefitRowProps) {
	const Icon = benefit.icon;

	return (
		<motion.li
			initial={reduceMotion ? false : { opacity: 0, x: -10 }}
			whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
			viewport={{ once: true, amount: 0.5 }}
			transition={{
				duration: 0.34,
				delay: reduceMotion ? 0 : 0.12 + index * 0.08,
				ease: "easeOut",
			}}
		>
			<motion.div
				whileHover={reduceMotion ? undefined : { x: 4 }}
				transition={{ duration: 0.18, ease: "easeOut" }}
				className="flex items-start gap-4 py-4 sm:py-5"
			>
				<span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-accent text-secondary">
					<Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
				</span>
				<div>
					<h3 className="text-base font-bold text-foreground">
						{benefit.title}
					</h3>
					<p className="mt-1 text-sm leading-6 text-muted-foreground">
						{benefit.description}
					</p>
				</div>
			</motion.div>
		</motion.li>
	);
}
