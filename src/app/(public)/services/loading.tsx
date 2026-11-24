function ServiceCardSkeleton() {
	return (
		<div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
			<div className="h-52 bg-muted" />
			<div className="p-5">
				<div className="h-7 w-4/5 rounded-lg bg-muted" />
				<div className="mt-2 h-7 w-3/5 rounded-lg bg-muted" />
				<div className="mt-4 grid grid-cols-2 gap-2">
					<div className="h-10 rounded-lg bg-muted" />
					<div className="h-10 rounded-lg bg-muted" />
				</div>
				<div className="mt-5 flex items-end justify-between border-t border-border pt-4">
					<div className="space-y-2">
						<div className="h-3 w-24 rounded-full bg-muted" />
						<div className="h-6 w-20 rounded-lg bg-muted" />
					</div>
					<div className="space-y-2 text-right">
						<div className="ml-auto h-3 w-20 rounded-full bg-muted" />
						<div className="ml-auto h-4 w-24 rounded-full bg-muted" />
					</div>
				</div>
				<div className="mt-5 h-11 rounded-lg bg-muted" />
			</div>
		</div>
	);
}

export default function ServicesLoading() {
	return (
		<main
			aria-busy="true"
			aria-label="Loading repair services"
			className="animate-pulse"
		>
			<header className="border-b border-border bg-card">
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
					<div className="max-w-3xl">
						<div className="h-9 w-64 rounded-lg bg-muted" />
						<div className="mt-5 h-12 w-full max-w-2xl rounded-xl bg-muted sm:h-14" />
						<div className="mt-5 h-5 w-full max-w-2xl rounded-full bg-muted" />
						<div className="mt-2 h-5 w-4/5 max-w-xl rounded-full bg-muted" />
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
				<div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
					<div className="mb-4 h-5 w-32 rounded-full bg-muted" />
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1.5fr)_repeat(3,minmax(150px,1fr))_auto]">
						{[1, 2, 3, 4, 5].map((item) => (
							<div key={item} className="h-11 rounded-lg bg-muted" />
						))}
					</div>
				</div>

				<div className="mt-8">
					<div className="mb-4 space-y-2">
						<div className="h-3 w-28 rounded-full bg-muted" />
						<div className="h-7 w-32 rounded-lg bg-muted" />
					</div>
					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<ServiceCardSkeleton key={item} />
						))}
					</div>
				</div>
			</div>
		</main>
	);
}