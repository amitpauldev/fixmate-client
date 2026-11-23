import { CalendarClock, CircleCheckBig, ClipboardList, Wallet } from "lucide-react";
import type { Booking } from "@/features/bookings/types/booking";
import type { Payment } from "@/features/payments/types/types";
import type { Service } from "@/features/services/types/service";
import { OverviewStatCard } from "./overview-stat-card";
import { NewRequestsPanel } from "./new-requests-panel";
import { RecentEarningsPanel } from "./recent-earnings-panel";

type TechnicianOverviewProps = {
	technicianName?: string;
	services: Service[];
	payments: Payment[];
	bookings: Booking[];
	error?: string;
};

function formatAmount(amount: number, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency.toUpperCase(),
		maximumFractionDigits: 0,
	}).format(amount);
}

export function TechnicianOverview({
	technicianName,
	services,
	payments,
	bookings,
	error,
}: TechnicianOverviewProps) {
	const approvedServices = services.filter(
		(service) => service.approvalStatus === "approved",
	);
	const pendingServices = services.filter(
		(service) => service.approvalStatus === "pending",
	);
	const pendingRequests = bookings.filter(
		(booking) => booking.status === "requested",
	);
	const activeJobs = bookings.filter((booking) =>
		["accepted", "in-progress"].includes(booking.status),
	);
	const totalEarnings = payments.reduce(
		(sum, payment) => sum + payment.amount,
		0,
	);
	const currency = payments[0]?.currency || "USD";
	const firstName = technicianName?.trim().split(/\s+/)[0];

	return (
		<div>
			<div>
				<h1 className="text-3xl font-bold tracking-tight text-primary">
					Overview
				</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					{firstName ? `Welcome back, ${firstName}. ` : ""}
					Your services, jobs and earnings.
				</p>
			</div>

			{error ? (
				<div className="mt-6 rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-sm text-destructive">
					{error}
				</div>
			) : (
				<>
					<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						<OverviewStatCard
							label="Total services"
							value={services.length}
							detail={`${approvedServices.length} approved services`}
							icon={ClipboardList}
						/>
						<OverviewStatCard
							label="Active jobs"
							value={activeJobs.length}
							detail={`${pendingRequests.length} waiting for your response`}
							icon={CalendarClock}
							accent="progress"
						/>
						<OverviewStatCard
							label="Pending approvals"
							value={pendingServices.length}
							detail="Services waiting for admin review"
							icon={CircleCheckBig}
							accent="accepted"
						/>
						<article className="relative overflow-hidden rounded-2xl border border-primary/10 bg-primary p-5 text-primary-foreground shadow-sm">
							<div
								className="absolute -right-8 -top-10 size-28 rounded-full border border-primary-foreground/10"
								aria-hidden="true"
							/>
							<div className="relative flex items-start justify-between gap-3">
								<div>
									<p className="text-sm font-semibold text-primary-foreground/75">
										Total earnings
									</p>
									<p className="mt-4 text-3xl font-bold">
										{formatAmount(totalEarnings, currency)}
									</p>
								</div>
								<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/10 text-primary-foreground">
									<Wallet className="size-5" aria-hidden="true" />
								</span>
							</div>
							<p className="relative mt-1 text-xs text-primary-foreground/70">
								Across {payments.length} paid {payments.length === 1 ? "job" : "jobs"}
							</p>
						</article>
					</div>

					<div className="mt-5 grid gap-5 lg:grid-cols-2">
						<NewRequestsPanel bookings={bookings} />
						<RecentEarningsPanel payments={payments} />
					</div>
				</>
			)}
		</div>
	);
}
