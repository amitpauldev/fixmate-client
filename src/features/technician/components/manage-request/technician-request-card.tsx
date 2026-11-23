"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Booking, BookingStatus } from "@/features/bookings/types/booking";
import {
	addFinalAmount,
	updateBookingStatus,
} from "@/features/bookings/actions/booking.action";
import { CompletionDialog } from "./completion-dialog";

type TechnicianRequestCardProps = {
	booking: Booking;
};

const statusStyles: Record<BookingStatus, string> = {
	requested: "border-status-requested/25 bg-status-requested/10 text-status-requested",
	accepted: "border-status-accepted/25 bg-status-accepted/10 text-status-accepted",
	rejected: "border-status-rejected/25 bg-status-rejected/10 text-status-rejected",
	"in-progress": "border-status-progress/25 bg-status-progress/10 text-status-progress",
	completed: "border-status-completed/25 bg-status-completed/10 text-status-completed",
	cancelled: "border-status-cancelled/25 bg-status-cancelled/10 text-status-cancelled",
};

function formatStatus(status: BookingStatus) {
	return status === "in-progress"
		? "In Progress"
		: status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDate(value: Date | string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Not set";
	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}

export function TechnicianRequestCard({ booking }: TechnicianRequestCardProps) {
	const router = useRouter();
	const [completionOpen, setCompletionOpen] = useState(false);
	const [updatingId, setUpdatingId] = useState<string | null>(null);
	const [, startTransition] = useTransition();

	const updateStatus = async (status: BookingStatus) => {
		setUpdatingId(booking._id);
		try {
			const result = await updateBookingStatus(booking._id, status);
			if (!result.success) {
				toast.error(result.message);
				return;
			}
			toast.success(result.message);
			startTransition(() => router.refresh());
		} catch {
			toast.error("Unable to update this booking.");
	} finally {
			setUpdatingId(null);
		}
	};

	const handleCompleted = async (finalAmount: number) => {
		setUpdatingId(booking._id);
		try {
			const amountResult = await addFinalAmount(booking._id, finalAmount);
			if (!amountResult.success) {
				toast.error(amountResult.message);
				return;
			}

			const statusResult = await updateBookingStatus(booking._id, "completed");
			if (!statusResult.success) {
				toast.error(statusResult.message);
				return;
			}

			toast.success("Job marked completed.");
			setCompletionOpen(false);
			startTransition(() => router.refresh());
		} catch {
			toast.error("Unable to complete this booking.");
		} finally {
			setUpdatingId(null);
		}
	};

	const updating = updatingId === booking._id;
	const amount =
		booking.status === "completed" && booking.finalAmount
			? booking.finalAmount
			: booking.basePrice;

	return (
		<>
			<article className="relative grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-[minmax(0,1fr)_230px]">
				<div className="min-w-0 px-5 py-5">
					<h2 className="text-base font-bold text-card-foreground sm:text-lg">
						{booking.serviceTitle}
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Requested {formatDate(booking.createdAt)}, preferred {formatDate(booking.preferredDate)}
					</p>

					<div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
						<p className="text-muted-foreground">
							Customer: <span className="font-semibold text-card-foreground">{booking.customerName}</span>
						</p>
						<p className="text-muted-foreground">
							Phone: <span className="font-semibold text-card-foreground">{booking.customerPhone || "Not provided"}</span>
						</p>
						<p className="text-muted-foreground sm:col-span-2">
							Address: <span className="font-semibold text-card-foreground">{booking.address}</span>
						</p>
					</div>

					<p className="mt-5 border-t border-dashed border-border pt-4 text-sm leading-6 text-muted-foreground">
						{booking.problemDescription}
					</p>
				</div>

				<div className="border-t border-dashed border-border px-5 py-5 lg:border-l lg:border-t-0">
					<p className="text-xs text-muted-foreground">
						Ticket <span className="font-semibold">#{booking._id.slice(-5).toUpperCase()}</span>
					</p>

					<div className="mt-2 flex flex-wrap gap-2">
						<span className={`inline-flex h-6 items-center rounded-full border px-2.5 text-xs font-bold ${statusStyles[booking.status]}`}>
							<span className="mr-1.5 size-1.5 rounded-full bg-current" />
							{formatStatus(booking.status)}
						</span>
						{(booking.status === "completed" || booking.status === "accepted") && (
							<span className={`inline-flex h-6 items-center rounded-full border px-2.5 text-xs font-bold ${
								booking.paymentStatus === "paid"
									? "border-status-completed/25 bg-status-completed/10 text-status-completed"
									: "border-border bg-muted text-muted-foreground"
							}`}>
								{booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
							</span>
						)}
					</div>

					<p className="mt-4 text-2xl font-bold text-card-foreground">${amount.toFixed(0)}</p>

					{booking.status === "requested" && (
						<div className="mt-4 grid grid-cols-2 gap-2">
							<button type="button" disabled={updating} onClick={() => updateStatus("accepted")} className="h-10 cursor-pointer rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-secondary disabled:opacity-60">
								{updating ? "Saving..." : "Accept"}
							</button>
							<button type="button" disabled={updating} onClick={() => updateStatus("rejected")} className="h-10 cursor-pointer rounded-lg border border-border px-3 text-sm font-bold text-card-foreground transition-colors hover:bg-accent disabled:opacity-60">
								Reject
							</button>
						</div>
					)}

					{booking.status === "accepted" && (
						<button type="button" disabled={updating} onClick={() => updateStatus("in-progress")} className="mt-4 h-10 w-full cursor-pointer rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-secondary disabled:opacity-60">
							{updating ? "Saving..." : "Start work"}
						</button>
					)}

					{booking.status === "in-progress" && (
						<button type="button" disabled={updating} onClick={() => setCompletionOpen(true)} className="mt-4 h-10 w-full cursor-pointer rounded-lg bg-[#ed6818] px-3 text-sm font-bold text-white transition-colors hover:bg-[#d85b11] disabled:opacity-60">
							Mark completed
						</button>
					)}
				</div>
			</article>

			<CompletionDialog
				open={completionOpen}
				serviceTitle={booking.serviceTitle}
				startingAmount={booking.basePrice}
				onOpenChange={setCompletionOpen}
				onConfirm={handleCompleted}
			/>
		</>
	);
}
