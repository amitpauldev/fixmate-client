"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Service } from "@/features/services/types/service";
import { PopularServiceCard } from "./popular-service-card";

type PopularServicesGridProps = {
	services: Service[];
};

export function PopularServicesGrid({ services }: PopularServicesGridProps) {
	const reduceMotion = useReducedMotion();

	return (
		<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{services.map((service, index) => (
				<motion.div
					key={service._id}
					initial={
						reduceMotion ? false : { opacity: 0, y: 16 }
					}
					whileInView={
						reduceMotion ? undefined : { opacity: 1, y: 0 }
					}
					viewport={{ once: true, amount: 0.15 }}
					transition={{
						duration: 0.42,
						delay: reduceMotion ? 0 : index * 0.07,
						ease: "easeOut",
					}}
					className="h-full"
				>
					<PopularServiceCard service={service} />
				</motion.div>
			))}
		</div>
	);
}
