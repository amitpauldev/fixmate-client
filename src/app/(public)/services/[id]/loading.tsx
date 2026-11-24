export default function ServiceDetailsLoading() {
	return (
		<main
			aria-busy="true"
			aria-label="Loading service details"
			className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
		>
			<div className="h-4 w-44 animate-pulse rounded-full bg-muted" />

			<div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
				<div className="min-w-0">
					<div className="aspect-[16/9] w-full animate-pulse rounded-3xl bg-muted sm:aspect-[2/1]" />

					<div className="mt-8 animate-pulse space-y-4">
						<div className="h-9 w-4/5 rounded-xl bg-muted sm:h-11" />
						<div className="h-4 w-full max-w-3xl rounded-full bg-muted" />
						<div className="h-4 w-11/12 max-w-3xl rounded-full bg-muted" />
					</div>

					<div className="mt-8 grid gap-4 sm:grid-cols-2">
						{[1, 2, 3, 4].map((item) => (
							<div
								key={item}
								className="h-24 animate-pulse rounded-2xl border border-border bg-card p-5"
							>
								<div className="h-3 w-24 rounded-full bg-muted" />
								<div className="mt-4 h-5 w-32 rounded-full bg-muted" />
							</div>
						))}
					</div>
				</div>

				<aside className="grid gap-5">
					<div className="h-72 animate-pulse rounded-2xl border border-border bg-card" />
					<div className="h-44 animate-pulse rounded-2xl border border-border bg-card" />
				</aside>
			</div>
		</main>
	);
}