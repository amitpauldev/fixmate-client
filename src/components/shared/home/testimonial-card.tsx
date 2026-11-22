"use client";

import { BadgeCheck, Quote, Star } from "lucide-react";
import type { Testimonial } from "./testimonial-slider";

type TestimonialCardProps = {
	testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
	return (
		<article
			aria-label={`Review from ${testimonial.name}`}
			className="relative h-full min-h-[310px] rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
		>
			<Quote
				className="absolute right-6 top-6 size-9 text-accent-foreground/15"
				strokeWidth={1.5}
				aria-hidden="true"
			/>

			<div
				className="flex items-center gap-1 text-brand-accent"
				aria-label={`${testimonial.rating} out of 5 stars`}
			>
				{Array.from({ length: 5 }).map((_, index) => (
					<Star
						key={index}
						className={`size-4 ${
							index < testimonial.rating
								? "fill-brand-accent"
								: "fill-muted text-muted"
						}`}
						aria-hidden="true"
					/>
				))}
			</div>

			<blockquote className="mt-7 max-w-2xl text-xl font-semibold leading-8 tracking-tight text-card-foreground sm:text-2xl sm:leading-9">
				&ldquo;{testimonial.review}&rdquo;
			</blockquote>

			<div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5">
				<div className="flex min-w-0 items-center gap-3">
					<span
						className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
						aria-hidden="true"
					>
						{testimonial.initials}
					</span>
					<div className="min-w-0">
						<p className="flex items-center gap-1.5 truncate text-sm font-bold text-card-foreground">
							{testimonial.name}
							{testimonial.verified ? (
								<BadgeCheck
									className="size-4 shrink-0 text-secondary"
									aria-label="Verified customer"
								/>
							) : null}
						</p>
						{testimonial.service ? (
							<p className="mt-1 truncate text-xs text-muted-foreground">
								{testimonial.service}
							</p>
						) : null}
					</div>
				</div>
			</div>
		</article>
	);
}
