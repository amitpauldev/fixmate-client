export function PopularServicesLoading() {
	return (
		<section
			aria-label="Loading popular services"
			className="border-b border-border bg-background"
		>
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="max-w-2xl">
					<div className="h-4 w-32 animate-pulse rounded bg-muted" />
					<div className="mt-4 h-10 w-80 max-w-full animate-pulse rounded bg-muted" />
					<div className="mt-4 h-14 w-[34rem] max-w-full animate-pulse rounded bg-muted" />
				</div>
				<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{[0, 1, 2].map((item) => (
						<div
							key={item}
							className="h-[360px] animate-pulse rounded-xl border border-border bg-muted"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
