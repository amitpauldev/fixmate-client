export function FeaturedTechniciansLoading() {
	return (
		<section
			aria-label="Loading featured technicians"
			className="border-b border-border bg-card"
		>
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="max-w-2xl">
					<div className="h-4 w-44 animate-pulse rounded bg-muted" />
					<div className="mt-4 h-10 w-96 max-w-full animate-pulse rounded bg-muted" />
					<div className="mt-4 h-12 w-[32rem] max-w-full animate-pulse rounded bg-muted" />
				</div>
				<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{[0, 1, 2, 3].map((item) => (
						<div
							key={item}
							className="h-52 animate-pulse rounded-xl border border-border bg-muted"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
