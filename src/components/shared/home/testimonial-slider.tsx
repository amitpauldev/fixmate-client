"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "./testimonial-card";

export type Testimonial = {
	name: string;
	initials: string;
	review: string;
	rating: number;
	service?: string;
	verified?: boolean;
};

type TestimonialSliderProps = {
	testimonials: Testimonial[];
};

export function TestimonialSlider({
	testimonials,
}: TestimonialSliderProps) {
	const reduceMotion = useReducedMotion();
	const [activeIndex, setActiveIndex] = useState(0);
	const touchStartX = useRef<number | null>(null);

	if (testimonials.length === 0) return null;

	const showPrevious = () => {
		setActiveIndex((current) =>
			current === 0 ? testimonials.length - 1 : current - 1,
		);
	};

	const showNext = () => {
		setActiveIndex((current) =>
			current === testimonials.length - 1 ? 0 : current + 1,
		);
	};

	const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
		if (touchStartX.current === null) return;

		const distance = touchStartX.current - event.changedTouches[0].clientX;
		touchStartX.current = null;
		if (Math.abs(distance) < 48) return;
		if (distance > 0) showNext();
		else showPrevious();
	};

	return (
		<div>
			<div
				className="overflow-hidden"
				onTouchStart={(event) => {
					touchStartX.current = event.touches[0].clientX;
				}}
				onTouchEnd={handleTouchEnd}
				onKeyDown={(event) => {
					if (event.key === "ArrowLeft") showPrevious();
					if (event.key === "ArrowRight") showNext();
				}}
				role="region"
				aria-roledescription="carousel"
				aria-label="Customer testimonials"
				tabIndex={0}
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={activeIndex}
						initial={
							reduceMotion ? false : { opacity: 0, x: 24 }
						}
						animate={{ opacity: 1, x: 0 }}
						exit={
							reduceMotion ? undefined : { opacity: 0, x: -24 }
						}
						transition={{ duration: 0.38, ease: "easeOut" }}
					>
						<TestimonialCard testimonial={testimonials[activeIndex]} />
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="mt-6 flex items-center justify-between gap-4">
				<div
					className="flex items-center gap-2"
					aria-label="Choose testimonial"
				>
					{testimonials.map((testimonial, index) => (
						<button
							key={testimonial.name}
							type="button"
							onClick={() => setActiveIndex(index)}
							aria-label={`Show testimonial ${index + 1} by ${testimonial.name}`}
							aria-current={index === activeIndex ? "true" : undefined}
							className={`h-2 rounded-full transition-[width,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
								index === activeIndex
									? "w-8 bg-secondary"
									: "w-2 bg-border hover:bg-muted-foreground"
							}`}
						/>
					))}
				</div>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={showPrevious}
						aria-label="Previous testimonial"
						className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<ChevronLeft className="size-5" aria-hidden="true" />
					</button>
					<button
						type="button"
						onClick={showNext}
						aria-label="Next testimonial"
						className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<ChevronRight className="size-5" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	);
}
