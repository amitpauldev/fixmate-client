"use client";

import { CalendarDays, CircleCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const progressSteps = ["Select Service", "Choose Time", "Get It Fixed"];

export function HeroProgressCard() {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			initial={reduceMotion ? false : { opacity: 0, x: -14, y: 8 }}
			animate={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
			transition={{ duration: 0.45, ease: "easeOut" }}
			className="absolute left-[-2%] top-[4%] z-20 hidden w-[168px] rounded-xl border border-border bg-card p-3.5 shadow-lg md:block lg:w-[184px]"
		>
			<div className="flex items-center gap-2 border-b border-border pb-3">
				<CalendarDays className="size-4 text-secondary" aria-hidden="true" />
				<h2 className="text-xs font-bold text-card-foreground">
					Book a Service
				</h2>
			</div>

			<ol className="mt-3 space-y-3">
				{progressSteps.map((step, index) => (
					<motion.li
						key={step}
						initial={reduceMotion ? false : { opacity: 0, x: -6 }}
						animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
						transition={{
							duration: 0.32,
							delay: reduceMotion ? 0 : 0.22 + index * 0.1,
							ease: "easeOut",
						}}
						className="relative flex items-center gap-2.5 pl-0.5"
					>
						{index < progressSteps.length - 1 ? (
							<span
								aria-hidden="true"
								className="absolute left-[7px] top-[15px] h-[25px] w-px bg-secondary/40"
							/>
						) : null}
						<CircleCheck
							className="relative z-10 size-4 shrink-0 fill-secondary text-primary-foreground"
							aria-hidden="true"
						/>
						<span className="text-[11px] font-semibold text-muted-foreground">
							{step}
						</span>
					</motion.li>
				))}
			</ol>
		</motion.div>
	);
}
