"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";
import { Service } from "@/features/services/types/service";
import { createBooking } from "@/features/bookings/actions/booking.action";
import { BookingFormValues } from "@/features/bookings/types/booking";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getBookingsByCustomerId } from "@/lib/api/booking";

type RepairRequestDialogProps = {
	user?: { name?: string; email?: string; role?: string; id?: string };
	open: boolean;
	onOpenChange: (open: boolean) => void;
	service: Service;
};

export function RepairRequestDialog({
	user,
	open,
	onOpenChange,
	service,
}: RepairRequestDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();
	const [problem, setProblem] = useState("");
	const router = useRouter();

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	const closeDialog = () => onOpenChange(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (!form.reportValidity()) return;

		if (!user || !user.id) {
			toast.error("You need to sign in to request a repair.");
			router.push("/sign-in");
			return;
		}

		if (user.role !== "customer") {
			toast.error("Only customers can request a repair.");
			return;
		}

		const bookings = await getBookingsByCustomerId(user.id);

		const isAlreadyBooked = bookings.filter(
			(booking) => booking.serviceId === service._id,
		);

		if (isAlreadyBooked.length > 0) {
			toast.error("You have already requested this repair.");
			router.push("/dashboard/customer/bookings");
			return;
		}

		const formData = new FormData(event.currentTarget);

		const requestData: BookingFormValues = {
			customerName: String(formData.get("customerName") ?? ""),
			customerEmail: String(formData.get("customerEmail") ?? ""),
			customerPhone: String(formData.get("customerPhone") ?? ""),
			preferredDate: new Date(String(formData.get("preferredDate") ?? "")),
			address: String(formData.get("address") ?? ""),
			problemDescription: String(formData.get("problemDescription") ?? ""),
			serviceId: service._id,
			serviceTitle: service.title,
			serviceImage: service.image,
			category: service.category,
			basePrice: service.basePrice,
			technicianName: service.technicianName,
			technicianEmail: service.technicianEmail,
			technicianId: service.technicianId,
			customerId: user?.id ?? "",
		};

		try {
			await createBooking(requestData);

			toast.success("Repair request sent successfully.");
			form.reset();
			router.push("/dashboard/customer/bookings");
			closeDialog();
		} catch (error) {
			toast.error("An error occurred while sending the repair request.");
		}
	};

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			onCancel={(event) => {
				event.preventDefault();
				closeDialog();
			}}
			onClose={() => {
				if (open) onOpenChange(false);
			}}
			className="m-auto w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-slate-950/55"
		>
			<form onSubmit={handleSubmit}>
				<div className="p-5 sm:p-8">
					<div className="flex items-center justify-between gap-4">
						<h2
							id={titleId}
							className="text-xl font-bold tracking-tight sm:text-2xl"
						>
							Request this repair
						</h2>
						<button
							type="button"
							aria-label="Close repair request"
							onClick={closeDialog}
							className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							<X className="size-5" aria-hidden="true" />
						</button>
					</div>

					<div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
						<label className="grid gap-2 text-sm font-bold text-card-foreground">
							Name
							<input
								name="customerName"
								type="text"
								required
								readOnly
								defaultValue={user?.name ?? ""}
								placeholder="Farhan Ahmed"
								className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground"
							/>
						</label>

						<label className="grid gap-2 text-sm font-bold text-card-foreground">
							Email
							<input
								name="customerEmail"
								type="email"
								required
								readOnly
								defaultValue={user?.email ?? ""}
								placeholder="customer@fixmate.com"
								className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground"
							/>
						</label>

						<label className="grid gap-2 text-sm font-bold text-card-foreground">
							Phone
							<input
								name="customerPhone"
								type="tel"
								required
								placeholder="01611-223344"
								className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
							/>
						</label>

						<label className="grid gap-2 text-sm font-bold text-card-foreground">
							Preferred date
							<input
								name="preferredDate"
								type="date"
								required
								min={new Date().toISOString().split("T")[0]}
								className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm font-normal text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
							/>
						</label>

						<label className="grid gap-2 text-sm font-bold text-card-foreground sm:col-span-2">
							Address
							<input
								name="address"
								type="text"
								required
								placeholder="House, road, area"
								className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
							/>
							<span className="text-xs font-normal text-muted-foreground">
								Where the technician should come.
							</span>
						</label>

						<label className="grid gap-2 text-sm font-bold text-card-foreground sm:col-span-2">
							What is wrong?
							<textarea
								name="problemDescription"
								required
								minLength={20}
								maxLength={500}
								value={problem}
								onChange={(event) => setProblem(event.target.value)}
								placeholder="Model, what happened, and what you have already tried"
								className="min-h-36 resize-y rounded-lg border border-input bg-background px-4 py-3 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
							/>
							<span className="text-xs font-normal text-muted-foreground">
								{problem.length}/500 characters minimum
							</span>
						</label>
					</div>

					<div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
						<button
							type="button"
							onClick={closeDialog}
							className="cursor-pointer h-12 rounded-lg border border-border bg-card px-6 text-sm font-bold text-card-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="cursor-pointer h-12 rounded-lg bg-brand-accent px-6 text-sm font-bold text-brand-accent-foreground transition-colors hover:bg-brand-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							Send request
						</button>
					</div>
				</div>
			</form>
		</dialog>
	);
}
