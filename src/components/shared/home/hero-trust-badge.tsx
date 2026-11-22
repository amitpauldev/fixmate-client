"use client";

import { ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function HeroTrustBadge() {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			initial={reduceMotion ? false : { opacity: 0, y: 10 }}
			animate={reduceMotion ? undefined : { opacity: 1, y: [0, -5, 0] }}
			transition={
				reduceMotion
					? undefined
					: {
							opacity: { duration: 0.38, delay: 0.35 },
							y: {
								duration: 4,
								delay: 0.35,
								repeat: Infinity,
								ease: "easeInOut",
							},
						}
			}
			className="absolute -bottom-8 left-0 sm:bottom-[3%] sm:left-[4%] z-20 w-55 items-center gap-3 rounded-xl border border-border bg-card p-3.5 shadow-lg flex lg:w-58"
		>
			<span className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-full bg-accent text-secondary">
				<ShieldCheck className="size-5" aria-hidden="true" />
			</span>
			<div className="min-w-0">
				<p className="text-[8px] sm:text-xs font-bold text-card-foreground">
					Professional repair help
				</p>
				<p className="mt-1 text-[7px] sm:text-[11px] text-muted-foreground">
					Home visit or shop drop-off
				</p>
			</div>
		</motion.div>
	);
}
