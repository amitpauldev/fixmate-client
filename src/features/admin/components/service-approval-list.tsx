"use client";

import { useMemo, useState, useTransition } from "react";
import { Wrench } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { updateServiceApproval } from "@/features/admin/actions/admin.action";
import type { Service } from "@/features/services/types/service";
import { ServiceDetailsDialog } from "./service-details-dialog";

type FilterStatus = "all" | Service["approvalStatus"];

type ServiceApprovalListProps = {
	services: Service[];
};

const filters: Array<{ label: string; value: FilterStatus }> = [
	{ label: "Pending", value: "pending" },
	{ label: "Approved", value: "approved" },
	{ label: "Rejected", value: "rejected" },
	{ label: "All", value: "all" },
];

function statusClassName(status: Service["approvalStatus"]) {
	if (status === "approved") {
		return "border-status-completed/30 bg-status-completed/10 text-status-completed";
	}
	if (status === "rejected") {
		return "border-status-rejected/30 bg-status-rejected/10 text-status-rejected";
	}
	return "border-brand-accent/40 bg-brand-accent/10 text-brand-accent-foreground";
}

function formatStatus(status: Service["approvalStatus"]) {
	return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDate(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Unknown";

	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(date);
}

function ServiceImage({ service }: { service: Service }) {
	return service.image ? (
		<img
			src={service.image}
			alt={`${service.title} service`}
			className="size-14 rounded-xl object-cover"
		/>
	) : (
		<div className="flex size-14 items-center justify-center rounded-xl border border-secondary/10 bg-accent text-secondary">
			<Wrench className="size-6" aria-hidden="true" />
		</div>
	);
}

export function ServiceApprovalList({ services }: ServiceApprovalListProps) {
	const router = useRouter();
	const [activeFilter, setActiveFilter] = useState<FilterStatus>("pending");
	const [updatingId, setUpdatingId] = useState<string | null>(null);
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [, startTransition] = useTransition();

	const counts = useMemo(
		() =>
			services.reduce(
				(accumulator, service) => {
					accumulator[service.approvalStatus] += 1;
					accumulator.all += 1;
					return accumulator;
				},
				{ pending: 0, approved: 0, rejected: 0, all: 0 },
			),
		[services],
	);

	const visibleServices =
		activeFilter === "all"
			? services
			: services.filter((service) => service.approvalStatus === activeFilter);

	async function handleApproval(
		serviceId: string,
		approvalStatus: "approved" | "rejected",
	) {
		setUpdatingId(serviceId);
		const result = await updateServiceApproval(serviceId, approvalStatus);
		setUpdatingId(null);

		if (!result.success) {
			toast.error(result.message);
			return;
		}

		toast.success(result.message);
		startTransition(() => router.refresh());
	}

	return (
		<div>
			<div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
						Service approval
					</h1>
					<p className="mt-2 text-base font-medium text-muted-foreground">
						Only approved and available services appear on the public site.
					</p>
				</div>

				<div
					aria-label="Filter service approvals"
					className="flex w-fit max-w-full overflow-x-auto rounded-2xl border border-border bg-card p-1.5 shadow-sm"
				>
					{filters.map((filter) => {
						const count =
							filter.value === "all"
								? counts.all
								: counts[filter.value];
						const active = activeFilter === filter.value;

						return (
							<button
								key={filter.value}
								type="button"
								onClick={() => setActiveFilter(filter.value)}
								aria-pressed={active}
								className={`cursor-pointer whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition-colors sm:px-5 ${
									active
										? "bg-primary text-primary-foreground shadow-sm"
										: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
								}`}
							>
								{filter.label} <span className="ml-1">{count}</span>
							</button>
						);
					})}
				</div>
			</div>

			{visibleServices.length === 0 ? (
				<div className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
					<Wrench className="mx-auto size-9 text-muted-foreground" aria-hidden="true" />
					<h2 className="mt-4 text-lg font-bold text-foreground">
						No {activeFilter === "all" ? "" : activeFilter} services
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						There are no service requests in this category.
					</p>
				</div>
			) : (
				<>
					<div className="hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-sm md:block">
						<table className="w-full min-w-[900px] border-collapse">
							<thead>
								<tr className="border-b border-border text-left text-sm font-bold text-secondary">
									<th className="px-5 py-4">Service</th>
									<th className="px-4 py-4">Technician</th>
									<th className="px-4 py-4">Price</th>
									<th className="px-4 py-4">Submitted</th>
									<th className="px-4 py-4">Status</th>
									<th className="px-5 py-4 text-right">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
						{visibleServices.map((service) => {
							const updating = updatingId === service._id;
							return (
								<tr key={service._id} className="hover:bg-accent/30">
									<td className="px-5 py-4">
										<div className="flex min-w-48 items-center gap-3">
											<ServiceImage service={service} />
											<div className="min-w-0">
												<h2 className="truncate text-sm font-bold text-primary">{service.title}</h2>
												<p className="mt-1 text-xs text-muted-foreground">{service.category}</p>
											</div>
										</div>
									</td>
									<td className="px-4 py-4 text-sm font-medium text-primary">{service.technicianName}</td>
									<td className="px-4 py-4 text-sm font-bold text-primary">${service.basePrice}</td>
									<td className="px-4 py-4 text-sm text-muted-foreground">{formatDate(service.createdAt)}</td>
									<td className="px-4 py-4">
											<span
												className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusClassName(service.approvalStatus)}`}
											>
												{formatStatus(service.approvalStatus)}
											</span>
									</td>
									<td className="px-5 py-4">
										<div className="flex items-center justify-end gap-2">
											<button
												type="button"
												onClick={() => setSelectedService(service)}
												className="cursor-pointer h-9 rounded-lg border border-border px-3 text-xs font-bold text-primary transition-colors hover:bg-accent"
											>
												Details
											</button>
									{service.approvalStatus === "pending" ? (
										<>
											<button
												type="button"
												disabled={updatingId !== null}
												onClick={() => handleApproval(service._id, "approved")}
												className="cursor-pointer h-9 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
											>
												{updating ? "Saving..." : "Approve"}
											</button>
											<button
												type="button"
												disabled={updatingId !== null}
												onClick={() => handleApproval(service._id, "rejected")}
												className="cursor-pointer h-9 rounded-lg border border-border bg-card px-3 text-xs font-bold text-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
											>
												Reject
											</button>
										</>
									) : null}
										</div>
									</td>
								</tr>
							);
						})}
							</tbody>
						</table>
					</div>

					<div className="grid gap-4 md:hidden">
						{visibleServices.map((service) => (
							<article key={service._id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
								{service.image ? (
									<img src={service.image} alt={`${service.title} service`} className="h-44 w-full object-cover" />
								) : (
									<div className="flex h-44 w-full items-center justify-center bg-accent text-secondary">
										<Wrench className="size-10" aria-hidden="true" />
									</div>
								)}
								<div className="p-4">
									<div className="flex items-start justify-between gap-3">
										<div>
											<h2 className="font-bold text-primary">{service.title}</h2>
											<p className="mt-1 text-sm text-muted-foreground">{service.category}</p>
										</div>
										<span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold ${statusClassName(service.approvalStatus)}`}>
											{formatStatus(service.approvalStatus)}
										</span>
									</div>
									<div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
										<div>
											<p className="text-xs text-muted-foreground">Technician</p>
											<p className="mt-1 text-sm font-semibold text-primary">{service.technicianName}</p>
										</div>
										<div>
											<p className="text-xs text-muted-foreground">Price</p>
											<p className="mt-1 text-sm font-bold text-primary">${service.basePrice}</p>
										</div>
									</div>
									<div className="mt-4 flex gap-2">
										<button type="button" onClick={() => setSelectedService(service)} className="cursor-pointer h-10 flex-1 rounded-lg border border-border px-3 text-sm font-bold text-primary hover:bg-accent">
											Details
										</button>
										{service.approvalStatus === "pending" ? (
											<>
												<button type="button" disabled={updatingId !== null} onClick={() => handleApproval(service._id, "approved")} className="cursor-pointer h-10 flex-1 rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground disabled:opacity-60">
													{updatingId === service._id ? "Saving..." : "Approve"}
												</button>
												<button type="button" disabled={updatingId !== null} onClick={() => handleApproval(service._id, "rejected")} className="cursor-pointer h-10 flex-1 rounded-lg border border-border px-3 text-sm font-bold text-primary disabled:opacity-60">
													Reject
												</button>
											</>
										) : null}
									</div>
								</div>
							</article>
						))}
					</div>

					<ServiceDetailsDialog
						service={selectedService}
						onClose={() => setSelectedService(null)}
					/>
				</>
			)}
		</div>
	);
}
