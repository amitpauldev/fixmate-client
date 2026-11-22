import Image from "next/image";
import Link from "next/link";

const exploreLinks = [
	{ label: "Home", href: "/" },
	{ label: "All services", href: "/services" },
	{ label: "How it works", href: "/#how-fixmate-works-title" },
	{ label: "Become a technician", href: "/sign-up" },
];

const repairLinks = [
	{ label: "Smartphone", category: "Smartphone" },
	{ label: "Laptop & PC", category: "Laptop & PC" },
	{ label: "AC", category: "AC" },
	{ label: "Refrigerator", category: "Refrigerator" },
	{ label: "TV", category: "TV" },
] as const;

export function PublicFooter() {
	return (
		<footer className="border-t border-primary-foreground/10 bg-primary text-primary-foreground">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_0.85fr_0.95fr_1.35fr] lg:gap-12">
					<div className="max-w-sm">
						<Link
							href="/"
							aria-label="FixMate home"
							className="inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
						>
							<Image
								src="/images/logo.png"
								alt=""
								width={42}
								height={42}
								unoptimized
								className="size-10 rounded-lg bg-primary-foreground p-1"
							/>
							<span className="text-xl font-bold tracking-tight">
								Fix<span className="text-brand-accent">Mate</span>
							</span>
						</Link>

						<p className="mt-5 text-sm leading-7 text-primary-foreground/75">
							Verified technicians for phones, laptops and home appliances.
							Track every job, pay only when it is done.
						</p>

						<div
							aria-label="Social links"
							className="mt-6 flex items-center gap-2"
						>
							{[
								{ label: "X", text: "X" },
								{ label: "Facebook", text: "f" },
								{ label: "LinkedIn", text: "in" },
							].map((social) => (
								<span
									key={social.label}
									role="img"
									aria-label={social.label}
									className="flex size-9 items-center justify-center rounded-md border border-primary-foreground/15 text-xs font-bold text-primary-foreground/80"
								>
									{social.text}
								</span>
							))}
						</div>
					</div>

					<nav aria-label="Explore FixMate">
						<h2 className="text-sm font-bold text-primary-foreground">
							Explore
						</h2>
						<ul className="mt-5 space-y-3.5">
							{exploreLinks.map((item) => (
								<li key={item.label}>
									<Link
										href={item.href}
										className="text-sm font-medium text-primary-foreground/75 transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<nav aria-label="Repair categories">
						<h2 className="text-sm font-bold text-primary-foreground">
							Repairs
						</h2>
						<ul className="mt-5 space-y-3.5">
							{repairLinks.map((item) => (
								<li key={item.label}>
									<Link
										href={`/services?category=${encodeURIComponent(item.category)}`}
										className="text-sm font-medium text-primary-foreground/75 transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div>
						<h2 className="text-sm font-bold text-primary-foreground">
							Contact
						</h2>
						<address className="mt-5 space-y-3 text-sm leading-6 not-italic text-primary-foreground/75">
							<a
								href="mailto:support@fixmate.com"
								className="block transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
							>
								support@fixmate.com
							</a>
							<a
								href="tel:+8801700000000"
								className="block transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
							>
								+880 1700-000000
							</a>
							<p>
								House 22, Road 4, Dhanmondi, Dhaka
								<br />
								1205
							</p>
							<p>
								Saturday to Thursday, 9 am to 9 pm
							</p>
						</address>
					</div>
				</div>
			</div>

			<div className="border-t border-primary-foreground/10">
				<div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
					<p className="text-xs text-primary-foreground/65 sm:text-sm">
						© {new Date().getFullYear()} FixMate. Built for Programming Hero
						Assignment 9 as a demo.
					</p>
				</div>
			</div>
		</footer>
	);
}
