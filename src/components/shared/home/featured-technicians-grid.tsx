"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Service } from "@/features/services/types/service";
import type { AuthUserSummary } from "@/lib/auth/auth";
import { FeaturedTechnicianCard } from "./featured-technician-card";

export type FeaturedTechnician = {
	service: Service;
	technician: AuthUserSummary | null;
};

type FeaturedTechniciansGridProps = {
	technicians: FeaturedTechnician[];
};

export function FeaturedTechniciansGrid({
	technicians,
}: FeaturedTechniciansGridProps) {
	const reduceMotion = useReducedMotion();

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{technicians.map((item, index) => (
				<motion.div
					key={item.service.technicianId}
					initial={reduceMotion ? false : { opacity: 0, y: 16 }}
					whileInView={
						reduceMotion ? undefined : { opacity: 1, y: 0 }
					}
					viewport={{ once: true, amount: 0.2 }}
					transition={{
						duration: 0.42,
						delay: reduceMotion ? 0 : index * 0.08,
						ease: "easeOut",
					}}
					className="h-full"
				>
					<FeaturedTechnicianCard
						service={item.service}
						technician={item.technician}
					/>
				</motion.div>
			))}
		</div>
	);
}
