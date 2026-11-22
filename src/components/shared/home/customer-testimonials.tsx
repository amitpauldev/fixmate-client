"use client";

import { motion, useReducedMotion } from "motion/react";
import {
	TestimonialSlider,
	type Testimonial,
} from "./testimonial-slider";

const demoTestimonials: Testimonial[] = [
	{
		name: "Nadia Rahman",
		initials: "NR",
		review:
			"The booking process was straightforward, and the technician arrived prepared. Our repair was completed with care and without unnecessary delays.",
		rating: 5,
		service: "Air conditioner repair",
		verified: true,
	},
	{
		name: "Farhan Ahmed",
		initials: "FA",
		review:
			"Finding the right service was much easier than expected. Communication was clear from booking through completion.",
		rating: 5,
		service: "Electrical repair",
		verified: true,
	},
	{
		name: "Tasnim Chowdhury",
		initials: "TC",
		review:
			"The repair professional was courteous and explained the issue clearly. It felt reassuring to have the whole process in one place.",
		rating: 5,
		service: "Washing machine service",
		verified: true,
	},
];

export function CustomerTestimonials() {
	const reduceMotion = useReducedMotion();

	return (
		<section
			aria-labelledby="customer-testimonials-title"
			className="relative overflow-hidden border-b border-border bg-background"
		>
			<div
				aria-hidden="true"
				className="absolute left-[-8rem] bottom-[-10rem] size-80 rounded-full bg-accent/50 blur-3xl"
			/>
			<div
				aria-hidden="true"
				className="absolute right-[-6rem] top-10 size-64 rounded-full bg-brand-accent/10 blur-3xl"
			/>

			<div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<motion.header
					initial={reduceMotion ? false : { opacity: 0, y: 14 }}
					whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.35 }}
					transition={{ duration: 0.44, ease: "easeOut" }}
					className="max-w-2xl"
				>
					<p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-secondary">
						Customer stories
					</p>
					<h2
						id="customer-testimonials-title"
						className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl"
					>
						Don&apos;t just take our word for it.
					</h2>
					<p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
						See what customers have to say about their experience with FixMate.
					</p>
				</motion.header>

				<motion.div
					initial={reduceMotion ? false : { opacity: 0, y: 18 }}
					whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.48, delay: reduceMotion ? 0 : 0.1, ease: "easeOut" }}
					className="mt-9 max-w-3xl sm:mt-11"
				>
					<TestimonialSlider testimonials={demoTestimonials} />
				</motion.div>
			</div>
		</section>
	);
}
