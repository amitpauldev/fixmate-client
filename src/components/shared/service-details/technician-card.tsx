import { MapPin } from "lucide-react";

type TechnicianCardProps = {
	name: string;
	image: string | null;
	location: string;
};

function getInitials(name: string) {
	return name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");
}

export function TechnicianCard({
	name,
	image,
	location,
}: TechnicianCardProps) {
	const initials = getInitials(name) || "FT";

	return (
		<aside className="rounded-3xl border border-border bg-card p-6 shadow-sm">
			<p className="text-sm font-bold text-muted-foreground">Your technician</p>
			<div className="mt-4 flex items-center gap-3">
				{image ? (
					<div
						role="img"
						aria-label={`${name} profile image`}
						className="size-14 shrink-0 rounded-full border-2 border-card bg-cover bg-center shadow-sm"
						style={{ backgroundImage: `url("${image}")` }}
					/>
				) : (
					<div
						className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
						aria-label={`${name} profile`}
					>
						{initials}
					</div>
				)}
				<div className="min-w-0">
					<p className="truncate text-base font-bold text-card-foreground">
						{name}
					</p>
					<p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
						<MapPin className="size-3.5" aria-hidden="true" />
						<span className="truncate">{location}</span>
					</p>
				</div>
			</div>
			<p className="mt-5 text-sm leading-6 text-muted-foreground">
				Certified HVAC and home-appliance technician. AC, fridge and washing
				machine specialist.
			</p>
			<p className="mt-4 text-sm text-muted-foreground">
				<span className="font-bold text-card-foreground">4 jobs</span> completed
				on FixMate, member since 1 Jul 2026
			</p>
		</aside>
	);
}
