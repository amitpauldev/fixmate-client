export default function DashboardLoading() {
	return (
		<section
			aria-busy="true"
			aria-label="Loading dashboard"
			className="mx-auto w-full max-w-7xl animate-pulse px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
		>
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div className="space-y-3">
					<div className="h-4 w-28 rounded-full bg-muted" />
					<div className="h-9 w-64 rounded-xl bg-muted" />
					<div className="h-4 w-80 max-w-full rounded-full bg-muted" />
				</div>
				<div className="h-11 w-36 rounded-xl bg-muted" />
			</div>

			<div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{[1, 2, 3, 4].map((item) => (
					<div
						key={item}
						className="rounded-2xl border border-border bg-card p-5"
					>
						<div className="flex items-center justify-between">
							<div className="size-11 rounded-xl bg-muted" />
							<div className="h-4 w-14 rounded-full bg-muted" />
						</div>
						<div className="mt-6 h-8 w-24 rounded-lg bg-muted" />
						<div className="mt-3 h-4 w-32 rounded-full bg-muted" />
					</div>
				))}
			</div>

			<div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
				<div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
					<div className="h-6 w-40 rounded-lg bg-muted" />
					<div className="mt-6 h-64 rounded-xl bg-muted" />
				</div>
				<div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
					<div className="h-6 w-32 rounded-lg bg-muted" />
					<div className="mt-6 space-y-5">
						{[1, 2, 3, 4].map((item) => (
							<div key={item} className="flex items-center gap-3">
								<div className="size-10 rounded-full bg-muted" />
								<div className="flex-1 space-y-2">
									<div className="h-3 w-3/5 rounded-full bg-muted" />
									<div className="h-3 w-4/5 rounded-full bg-muted" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
