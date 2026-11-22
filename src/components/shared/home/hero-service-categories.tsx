"use client";

import Link from "next/link";
import { Droplets, MoreHorizontal, Wind, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const categoryLinks = [
	{
		label: "Electrical",
		href: "/services?category=Electrical",
		icon: Zap,
		iconClassName: "text-brand-accent",
	},
	{
		label: "Plumbing",
		href: "/services",
		icon: Droplets,
		iconClassName: "text-secondary",
	},
	{
		label: "AC Repair",
		href: "/services?category=AC",
		icon: Wind,
		iconClassName: "text-secondary",
	},
	{
		label: "More Services",
		href: "/services",
		icon: MoreHorizontal,
		iconClassName: "text-muted-foreground",
	},
] as const;

export function HeroServiceCategories() {
	const reduceMotion = useReducedMotion();

	return (
		<div
			aria-label="Popular service categories"
			className="absolute right-[-2%] top-[12%] z-20 hidden w-[145px] space-y-2.5 md:block lg:right-[-1%] lg:w-[154px]"
		>
			{categoryLinks.map((category, index) => {
				const Icon = category.icon;

				return (
					<motion.div
						key={category.label}
						initial={reduceMotion ? false : { opacity: 0, x: 12 }}
						animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
						transition={{
							duration: 0.38,
							delay: reduceMotion ? 0 : 0.18 + index * 0.08,
							ease: "easeOut",
						}}
					>
						<motion.div
							animate={
								reduceMotion
									? undefined
									: { y: [0, index % 2 === 0 ? -3 : 3, 0] }
							}
							transition={{
								duration: 3.8 + index * 0.35,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<Link
								href={category.href}
								aria-label={`Browse ${category.label}`}
								className="flex h-[54px] items-center gap-2.5 rounded-xl border border-border bg-card px-3 text-card-foreground shadow-md transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent">
									<Icon
										className={`size-4.5 ${category.iconClassName}`}
										aria-hidden="true"
									/>
								</span>
								<span className="text-xs font-bold leading-4">
									{category.label}
								</span>
							</Link>
						</motion.div>
					</motion.div>
				);
			})}
		</div>
	);
}
