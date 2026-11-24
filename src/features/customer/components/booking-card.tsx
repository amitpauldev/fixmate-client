"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Wrench } from "lucide-react";
import type { Booking, BookingStatus } from "../../bookings/types/booking";
import { cancelBooking } from "../../bookings/actions/booking.action";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

type BookingCardProps = {
	booking: Booking;
};

const statusStyles: Record<BookingStatus, string> = {
	requested: "bg-status-requested/12 text-status-requested",
	accepted: "bg-status-accepted/12 text-status-accepted",
	rejected: "bg-status-rejected/12 text-status-rejected",
	"in-progress": "bg-status-progress/12 text-status-progress",
	completed: "bg-status-completed/12 text-status-completed",
	cancelled: "bg-status-cancelled/12 text-status-cancelled",
};

function formatStatus(status: BookingStatus) {
	return status
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
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

export function BookingCard({ booking }: BookingCardProps) {
	const router = useRouter();
	const [cancelOpen, setCancelOpen] = useState(false);
	const [cancelling, setCancelling] = useState(false);

	const [isPaying, setIsPaying] = useState(false);

	const handleCancel = async () => {
		setCancelling(true);
		try {
			const result = await cancelBooking(booking._id);
			if (!result.success) {
				toast.error(result.message);
				return;
			}

			toast.success(result.message);
			setCancelOpen(false);
			router.refresh();
		} catch {
			toast.error("Unable to cancel this booking.");
		} finally {
			setCancelling(false);
		}
	};

	const handlePayment = async () => {
		if (isPaying) return;

		try {
			setIsPaying(true);

			const response = await fetch("/api/checkout_session", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					bookingId: booking._id,
				}),
			});

			const result = await response.json();
			console.log("Checkout API response:", result);

			if (!response.ok) {
				throw new Error(result.message || "Unable to initiate payment");
			}
			if (!result.url) {
				throw new Error("Stripe Checkout URL was not provided");
			}
			toast.success("Redirecting to Stripe Checkout...");
			window.location.href = result.url;
		} catch (error) {
			console.error("Payment error:", error);
			toast.error(
				error instanceof Error ? error.message : "Something went wrong",
			);
		} finally {
			setIsPaying(false);
		}
	};

	return (
		<>
			<article className="relative grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:grid-cols-[112px_minmax(0,1fr)] lg:grid-cols-[112px_minmax(0,1fr)_210px]">
				<div className="m-5 flex w-20 h-20 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted sm:m-5 sm:mb-auto">
					{booking.serviceImage ? (
						<div
							role="img"
							aria-label={`${booking.serviceTitle} service image`}
							className="h-full w-full bg-cover bg-center"
							style={{ backgroundImage: `url("${booking.serviceImage}")` }}
						/>
					) : (
						<Wrench
							className="size-9 text-secondary"
							strokeWidth={1.5}
							aria-hidden="true"
						/>
					)}
				</div>

				<div className="min-w-0 px-5 pb-5 sm:px-0 sm:py-5 sm:pr-5">
					<h2 className="truncate text-base font-bold text-card-foreground sm:text-lg">
						{booking.serviceTitle}
					</h2>
					<p className="mt-1 truncate text-sm text-muted-foreground">
						{booking.technicianName}
						{booking.technicianEmail ? `, ${booking.technicianEmail}` : ""}
					</p>

					<div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
						<p>
							Requested{" "}
							<span className="font-bold text-card-foreground">
								{formatDate(booking.createdAt)}
							</span>
						</p>
						<p>
							Preferred{" "}
							<span className="font-bold text-card-foreground">
								{formatDate(booking.preferredDate)}
							</span>
						</p>
					</div>

					<p className="mt-5 line-clamp-2 text-sm leading-6 text-muted-foreground">
						{booking.problemDescription}
					</p>
				</div>

				<div className="border-t border-dashed border-border px-5 py-5 lg:border-l lg:border-t-0">
					<p className="text-xs text-muted-foreground">
						Ticket{" "}
						<span className="font-semibold">
							#{booking._id.slice(-5).toUpperCase()}
						</span>
					</p>

					<div className="mt-2 flex flex-wrap gap-2">
						<span
							className={`inline-flex h-6 items-center rounded-full px-2.5 text-xs font-bold ${statusStyles[booking.status]}`}
						>
							<span className="mr-1.5 size-1.5 rounded-full bg-current" />
							{formatStatus(booking.status)}
						</span>
						<span
							className={`inline-flex h-6 items-center rounded-full border px-2.5 text-xs font-semibold ${
								booking.paymentStatus === "paid"
									? "border-status-completed/30 bg-status-completed/10 text-status-completed"
									: "border-border bg-muted text-muted-foreground"
							}`}
						>
							{booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
						</span>
					</div>

					<p className="mt-4 text-xs text-muted-foreground">
						{booking.status === "completed" ? "Final amount" : "Starting price"}
					</p>
					<p className="mt-1 text-2xl font-bold text-card-foreground">
						$
						{booking.status === "completed" && booking.finalAmount
							? booking.finalAmount.toFixed(0)
							: booking.basePrice.toFixed(0)}
					</p>

					{booking.status === "requested" && (
						<button
							type="button"
							onClick={() => setCancelOpen(true)}
							className="mt-4 h-10 w-full rounded-lg border border-destructive/30 text-sm font-bold text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							Cancel
						</button>
					)}

					{booking.status === "completed" &&
						booking.paymentStatus === "unpaid" && (
							<button
								type="button"
								onClick={handlePayment}
								disabled={isPaying}
								className="mt-4 h-10 w-full rounded-lg bg-brand-accent text-sm font-bold text-brand-accent-foreground transition-colors hover:bg-brand-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								{isPaying ? "Opening checkout..." : "Pay now"}
							</button>
						)}
				</div>
			</article>

			<ConfirmationDialog
				open={cancelOpen}
				title="Cancel this booking?"
				description={`Your request for ${booking.serviceTitle} will be cancelled.`}
				confirmLabel="Cancel booking"
				cancelLabel="Keep booking"
				onOpenChange={setCancelOpen}
				onConfirm={handleCancel}
				isConfirming={cancelling}
			/>
		</>
	);
}
