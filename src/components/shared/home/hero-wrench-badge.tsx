"use client";

import { Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function HeroWrenchBadge() {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
			animate={
				reduceMotion
					? undefined
					: { opacity: 1, scale: 1, y: [0, -4, 0] }
			}
			transition={
				reduceMotion
					? undefined
					: {
							opacity: { duration: 0.3, delay: 0.5 },
							scale: { duration: 0.4, delay: 0.5, ease: "easeOut" },
							y: {
								duration: 3.6,
								delay: 0.5,
								repeat: Infinity,
								ease: "easeInOut",
							},
						}
			}
			className="absolute bottom-[22%] left-[8%] z-30 hidden size-14 items-center justify-center rounded-full border border-border bg-card text-secondary shadow-lg lg:flex"
			aria-hidden="true"
		>
			<Wrench className="size-6" strokeWidth={2} />
		</motion.div>
	);
}
