import { Pencil, Trash2, Wrench } from "lucide-react";
import type { Service } from "@/features/services/types/service";
import Link from "next/link";
import DeleteService from "./deleteService";

type MyServicesListProps = {
	services: Service[];
	error?: string;
};

function statusClassName(status: Service["approvalStatus"]) {
	const styles = {
		approved:
			"border-status-completed/30 bg-status-completed/10 text-status-completed",
		rejected:
			"border-status-rejected/30 bg-status-rejected/10 text-status-rejected",
		pending:
			"border-status-progress/30 bg-status-progress/10 text-status-progress",
	};
	return styles[status];
}

function formatStatus(status: Service["approvalStatus"]) {
	return status.charAt(0).toUpperCase() + status.slice(1);
}

function ServiceImage({ service }: { service: Service }) {
	return service.image ? (
		<div
			role="img"
			aria-label={`${service.title} service image`}
			className="h-48 w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
			style={{ backgroundImage: `url("${service.image}")` }}
		/>
	) : (
		<div className="flex h-48 w-full items-center justify-center bg-accent text-secondary">
			<Wrench className="size-12" strokeWidth={1.3} aria-hidden="true" />
		</div>
	);
}

function AvailabilityToggle({ isAvailable }: { isAvailable: boolean }) {
	return (
		<span className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
			<span
				className={`relative inline-flex h-6 w-11 rounded-full p-0.5 ${
					isAvailable ? "bg-primary" : "bg-muted-foreground/40"
				}`}
				role="img"
				aria-label={isAvailable ? "Available" : "Unavailable"}
			>
				<span
					className={`size-5 rounded-full bg-primary-foreground shadow-sm ${
						isAvailable ? "translate-x-5" : ""
					}`}
				/>
			</span>
			{isAvailable ? "Available" : "Paused"}
		</span>
	);
}

export function MyServicesList({ services, error }: MyServicesListProps) {
	return (
		<>
			{error ? (
				<div className="rounded-2xl border border-status-rejected/30 bg-status-rejected/10 p-6 text-sm text-status-rejected">
					{error}
				</div>
			) : services.length === 0 ? (
				<div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
					<Wrench
						className="mx-auto size-10 text-muted-foreground"
						aria-hidden="true"
					/>
					<h2 className="mt-4 font-bold text-foreground">No services yet</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Add your first listing to start receiving repair requests.
					</p>
				</div>
			) : (
				<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
					{services.map((service) => (
						<article
							key={service._id}
							className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
						>
							<div className="relative overflow-hidden bg-muted">
								<ServiceImage service={service} />
								<span
									className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-bold backdrop-blur-sm ${statusClassName(service.approvalStatus)}`}
								>
									{formatStatus(service.approvalStatus)}
								</span>
							</div>
							<div className="space-y-5 p-5">
								<div>
									<p className="text-xs font-bold uppercase tracking-wide text-secondary">
										{service.category}
									</p>
									<h2 className="mt-1 line-clamp-2 text-lg font-bold text-foreground">
										{service.title}
									</h2>
									<p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
										{service.description}
									</p>
								</div>
								<div className="flex items-end justify-between border-t border-border pt-4">
									<div>
										<p className="text-xs font-semibold text-muted-foreground">
											Starting from
										</p>
										<p className="mt-1 text-xl font-bold text-foreground">
											${service.basePrice.toFixed(2)}
										</p>
									</div>
									<AvailabilityToggle isAvailable={service.isAvailable} />
								</div>
								<div className="flex items-center gap-2">
									<Link
										className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-secondary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
										href={`/dashboard/technician/my-services/update/${service._id}`}
									>
										<Pencil className="size-4" aria-hidden="true" />
										Edit
									</Link>

									<DeleteService service={service} />
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</>
	);
}
