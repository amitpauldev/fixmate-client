import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { User } from "@/features/users/types/types";

type FeaturedTechnicianCardProps = {
	technician: User;
};

function getInitials(name: string) {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("") || "FM";
}

export function FeaturedTechnicianCard({
	technician,
}: FeaturedTechnicianCardProps) {
	const name = technician.name?.trim() || "FixMate technician";

	return (
		<article className="group h-full rounded-xl border border-border bg-card p-4 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-lg">
			<div className="flex items-center gap-3">
				<div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
					{technician.image ? (
						<Image
							src={technician.image}
							alt={`${name} profile`}
							fill
							sizes="56px"
							unoptimized
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					) : (
						<span className="flex size-full items-center justify-center bg-primary text-xs font-bold text-primary-foreground">
							{getInitials(name)}
						</span>
					)}
				</div>

				<div className="min-w-0">
					<h3 className="truncate text-base font-bold text-card-foreground">
						{name}
					</h3>
					<p className="mt-1 truncate text-sm text-secondary">
						{technician.bio?.trim() || "FixMate technician"}
					</p>
				</div>
			</div>

			<div className="mt-4 border-t border-border pt-4">
				<p className="flex items-center gap-1.5 text-xs text-muted-foreground">
					<MapPin className="size-3.5 shrink-0" aria-hidden="true" />
					<span className="truncate">{technician.area?.trim() || "Area not provided"}</span>
				</p>
				<p className="mt-2 text-xs text-muted-foreground">
					Available for repair requests
				</p>
			</div>

			<Link
				href="/services"
				className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-bold text-card-foreground transition-colors hover:border-secondary/40 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				aria-label={`Browse services by ${name}`}
			>
				View service
				<ArrowRight
					className="size-4 transition-transform group-hover:translate-x-0.5"
					aria-hidden="true"
				/>
			</Link>
		</article>
	);
}
