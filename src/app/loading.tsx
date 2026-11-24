export default function Loading() {
	return (
		<main
			aria-busy="true"
			aria-label="Loading FixMate"
			className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center bg-background px-4 py-16"
		>
			<div className="w-full max-w-5xl animate-pulse">
				<div className="mx-auto max-w-2xl space-y-4 text-center">
					<div className="mx-auto h-4 w-28 rounded-full bg-muted" />
					<div className="mx-auto h-10 w-4/5 rounded-xl bg-muted sm:h-12" />
					<div className="mx-auto h-4 w-full max-w-lg rounded-full bg-muted" />
				</div>

				<div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className="rounded-2xl border border-border bg-card p-5"
						>
							<div className="h-40 rounded-xl bg-muted" />
							<div className="mt-5 h-5 w-3/5 rounded-full bg-muted" />
							<div className="mt-3 h-4 w-full rounded-full bg-muted" />
							<div className="mt-2 h-4 w-4/5 rounded-full bg-muted" />
							<div className="mt-6 h-10 w-32 rounded-xl bg-muted" />
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
