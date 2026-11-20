import { Wrench } from "lucide-react";

export function ServicesPageHeader() {
	return (
		<header className="relative overflow-hidden border-b border-border bg-card">
			<div
				className="pointer-events-none absolute inset-0 opacity-70"
				aria-hidden="true"
			>
				<div className="absolute -left-20 top-10 size-52 rounded-full bg-secondary/10 blur-3xl" />
				<div className="absolute -right-16 bottom-0 size-64 rounded-full bg-brand-accent/10 blur-3xl" />
			</div>
			<div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
				<div className="max-w-3xl">
					<div className="mb-5 flex items-center gap-2 text-sm font-bold text-secondary">
						<span className="flex size-9 items-center justify-center rounded-lg bg-accent">
							<Wrench className="size-4" aria-hidden="true" />
						</span>
						<span>Professional repair services</span>
					</div>
					<h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
						Find the Right Service for Your Needs
					</h1>
					<p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
						Explore trusted repair services from skilled technicians. Choose
						your service, compare options, and get your problem fixed with ease.
					</p>
				</div>
			</div>
		</header>
	);
}
