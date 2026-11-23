import Link from "next/link";
import {
	ArrowUpRight,
	CalendarDays,
	CheckCircle2,
	CircleDollarSign,
	Clock3,
	ReceiptText,
	Wrench,
} from "lucide-react";
import type { Booking, BookingStatus } from "../../bookings/types/booking";
import type { Payment } from "../../payments/types/types";

type CustomerOverviewProps = {
	customerName?: string;
	bookings: Booking[];
	payments: Payment[];
	error?: string;
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
	if (Number.isNaN(date.getTime())) return "Date not set";

	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}

function formatAmount(amount: number, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency.toUpperCase(),
		maximumFractionDigits: 0,
	}).format(amount);
}

export function CustomerOverview({
	customerName,
	bookings,
	payments,
	error,
}: CustomerOverviewProps) {
	const activeBookings = bookings.filter((booking) =>
		["requested", "accepted", "in-progress"].includes(booking.status),
	);
	const completedBookings = bookings.filter(
		(booking) => booking.status === "completed",
	);
	const unpaidBookings = bookings.filter(
		(booking) =>
			booking.status === "completed" && booking.paymentStatus === "unpaid",
	);
	const unpaidTotal = unpaidBookings.reduce(
		(sum, booking) => sum + (booking.finalAmount || booking.basePrice),
		0,
	);
	const totalSpent = payments.reduce(
		(sum, payment) => sum + payment.amount,
		0,
	);
	const currency = payments[0]?.currency || "USD";

	const inProgressBookings = activeBookings
		.filter((booking) =>
			["accepted", "in-progress"].includes(booking.status),
		)
		.sort(
			(a, b) =>
				new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
		)
		.slice(0, 4);

	const recentPayments = [...payments]
		.sort(
			(a, b) =>
				new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime(),
		)
		.slice(0, 4);

	const firstName = customerName?.trim().split(/\s+/)[0];

	return (
		<div>
			<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-primary">
						Overview
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						{firstName ? `Welcome back, ${firstName}. ` : ""}
						Your repair jobs at a glance.
					</p>
				</div>
			</div>

			{error ? (
				<div className="mt-6 rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-sm text-destructive">
					{error}
				</div>
			) : (
				<>
					<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						<article className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
							<div className="flex items-start justify-between">
								<p className="text-sm font-semibold text-muted-foreground">
									Total requests
								</p>
								<span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
									<CalendarDays className="size-5" aria-hidden="true" />
								</span>
							</div>
							<p className="mt-5 text-3xl font-bold text-card-foreground">
								{bookings.length}
							</p>
						</article>

						<article className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
							<div className="flex items-start justify-between">
								<p className="text-sm font-semibold text-muted-foreground">
									Active jobs
								</p>
								<span className="flex size-10 items-center justify-center rounded-xl bg-status-progress/10 text-status-progress">
									<Clock3 className="size-5" aria-hidden="true" />
								</span>
							</div>
							<p className="mt-5 text-3xl font-bold text-card-foreground">
								{activeBookings.length}
							</p>
							<p className="mt-1 text-xs text-muted-foreground">
								Requested, accepted or in progress
							</p>
						</article>

						<article className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
							<div className="flex items-start justify-between">
								<p className="text-sm font-semibold text-muted-foreground">
									Completed jobs
								</p>
								<span className="flex size-10 items-center justify-center rounded-xl bg-status-completed/10 text-status-completed">
									<CheckCircle2 className="size-5" aria-hidden="true" />
								</span>
							</div>
							<p className="mt-5 text-3xl font-bold text-card-foreground">
								{completedBookings.length}
							</p>
						</article>

						<article className="relative overflow-hidden rounded-2xl border border-primary/10 bg-primary p-5 text-primary-foreground shadow-sm">
							<div
								className="absolute -right-8 -top-10 size-28 rounded-full border border-primary-foreground/10"
								aria-hidden="true"
							/>
							<div className="relative flex items-start justify-between">
								<p className="text-sm font-semibold text-primary-foreground/75">
									Total spent
								</p>
								<span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/10 text-primary-foreground">
									<CircleDollarSign className="size-5" aria-hidden="true" />
								</span>
							</div>
							<p className="relative mt-5 text-3xl font-bold">
								{formatAmount(totalSpent, currency)}
							</p>
						</article>
					</div>

					{unpaidBookings.length > 0 && (
						<div className="mt-5 flex flex-col gap-4 rounded-2xl border border-brand-accent/35 bg-brand-accent/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
							<div className="flex items-start gap-3">
								<span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-accent text-brand-accent-foreground">
									<ReceiptText className="size-4" aria-hidden="true" />
								</span>
								<p className="text-sm font-bold text-card-foreground">
									{unpaidBookings.length} completed{" "}
									{unpaidBookings.length === 1 ? "job is" : "jobs are"} waiting
									for payment, {formatAmount(unpaidTotal, currency)} in total.
								</p>
							</div>
							<Link
								href="/dashboard/customer/bookings"
								className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-accent px-4 text-sm font-bold text-brand-accent-foreground transition-colors hover:bg-brand-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								Review and pay
								<ArrowUpRight className="size-4" aria-hidden="true" />
							</Link>
						</div>
					)}

					<div className="mt-5 grid gap-5 lg:grid-cols-2">
						<section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
							<div className="flex items-center justify-between">
								<h2 className="font-bold text-card-foreground">
									In progress now
								</h2>
								<Link
									href="/dashboard/customer/bookings"
									className="text-sm font-bold text-secondary hover:text-primary"
								>
									All bookings
								</Link>
							</div>

							{inProgressBookings.length === 0 ? (
								<div className="mt-6 flex min-h-28 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center">
									<Wrench
										className="size-6 text-muted-foreground"
										aria-hidden="true"
									/>
									<p className="mt-2 text-sm text-muted-foreground">
										No active jobs right now
									</p>
								</div>
							) : (
								<div className="mt-4 grid gap-2">
									{inProgressBookings.map((booking) => (
										<div
											key={booking._id}
											className="rounded-xl border border-border/70 px-4 py-3"
										>
											<div className="flex items-start justify-between gap-3">
												<div className="min-w-0">
													<p className="truncate text-sm font-bold text-card-foreground">
														{booking.serviceTitle}
													</p>
													<p className="mt-1 truncate text-xs text-muted-foreground">
														{booking.technicianName}
														{booking.preferredDate
															? `, preferred ${formatDate(booking.preferredDate)}`
															: ""}
													</p>
												</div>
												<span
													className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[booking.status]}`}
												>
													<span className="mr-1.5 size-1.5 rounded-full bg-current" />
													{formatStatus(booking.status)}
												</span>
											</div>
										</div>
									))}
								</div>
							)}
						</section>

						<section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
							<div className="flex items-center justify-between">
								<h2 className="font-bold text-card-foreground">
									Recent payments
								</h2>
								<Link
									href="/dashboard/customer/payments"
									className="text-sm font-bold text-secondary hover:text-primary"
								>
									Payment history
								</Link>
							</div>

							{recentPayments.length === 0 ? (
								<div className="mt-6 flex min-h-28 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center">
									<ReceiptText
										className="size-6 text-muted-foreground"
										aria-hidden="true"
									/>
									<p className="mt-2 text-sm text-muted-foreground">
										No payments yet
									</p>
								</div>
							) : (
								<div className="mt-4 grid">
									{recentPayments.map((payment) => (
										<div
											key={payment._id}
											className="flex items-center justify-between gap-4 border-b border-border/60 py-3 last:border-b-0"
										>
											<div className="min-w-0">
												<p className="truncate text-sm font-bold text-card-foreground">
													{payment.serviceTitle}
												</p>
												<p className="mt-1 text-xs text-muted-foreground">
													{payment.technicianName},{" "}
													paid {formatDate(payment.paidAt)}
												</p>
											</div>
											<p className="shrink-0 text-sm font-bold text-card-foreground">
												{formatAmount(payment.amount, payment.currency)}
											</p>
										</div>
									))}
								</div>
							)}
						</section>
					</div>
				</>
			)}
		</div>
	);
}
