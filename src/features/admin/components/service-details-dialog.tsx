"use client";

import { useEffect, useRef } from "react";
import { Wrench, X } from "lucide-react";
import type { Service } from "@/features/services/types/service";

type ServiceDetailsDialogProps = {
	service: Service | null;
	onClose: () => void;
};

function formatDate(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Unknown";
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	}).format(date);
}

export function ServiceDetailsDialog({ service, onClose }: ServiceDetailsDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (service && !dialog.open) dialog.showModal();
		if (!service && dialog.open) dialog.close();
	}, [service]);

	if (!service) return null;

	return (
		<dialog
			ref={dialogRef}
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			onClose={onClose}
			className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/50"
		>
			<div className="relative">
				{service.image ? (
					<img src={service.image} alt={`${service.title} service`} className="h-56 w-full rounded-t-2xl object-cover" />
				) : (
					<div className="flex h-56 items-center justify-center rounded-t-2xl bg-accent text-secondary">
						<Wrench className="size-12" aria-hidden="true" />
					</div>
				)}
				<button type="button" onClick={onClose} aria-label="Close service details" className="absolute right-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-full bg-card/95 text-primary shadow-md">
					<X className="size-4" aria-hidden="true" />
				</button>
			</div>
			<div className="p-5 sm:p-6">
				<p className="text-xs font-bold uppercase tracking-wide text-secondary">{service.category}</p>
				<h2 className="mt-1 text-2xl font-bold text-primary">{service.title}</h2>
				<p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
				<dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
					<div><dt className="text-muted-foreground">Technician</dt><dd className="mt-1 font-semibold text-primary">{service.technicianName}</dd></div>
					<div><dt className="text-muted-foreground">Price</dt><dd className="mt-1 font-bold text-primary">${service.basePrice}</dd></div>
					<div><dt className="text-muted-foreground">Submitted</dt><dd className="mt-1 font-semibold text-primary">{formatDate(service.createdAt)}</dd></div>
					<div><dt className="text-muted-foreground">Availability</dt><dd className="mt-1 font-semibold text-primary">{service.isAvailable ? "Available" : "Unavailable"}</dd></div>
				</dl>
			</div>
		</dialog>
	);
}
