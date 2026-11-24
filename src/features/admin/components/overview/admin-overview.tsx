import {
	BadgeDollarSign,
	BriefcaseBusiness,
	ClipboardCheck,
	Users,
	Wrench,
} from "lucide-react";
import type { Booking } from "@/features/bookings/types/booking";
import type { Payment } from "@/features/payments/types/types";
import type { Service } from "@/features/services/types/service";
import type { User } from "@/features/users/types/types";
import { OverviewStatCard } from "./overview-stat-card";
import { ServicesReviewPanel } from "./services-review-panel";
import { LatestBookingsPanel } from "./latest-bookings-panel";
import { RecentRevenuePanel } from "./recent-revenue-panel";

type AdminOverviewProps = {
	adminName?: string;
	users: User[];
	services: Service[];
	bookings: Booking[];
	payments: Payment[];
	error?: string;
};

function formatAmount(amount: number, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency.toUpperCase(),
		maximumFractionDigits: 0,
	}).format(amount);
}

export function AdminOverview({
	adminName,
	users,
	services,
	bookings,
	payments,
	error,
}: AdminOverviewProps) {
	const technicians = users.filter((user) => user.appRole === "technician");
	const customers = users.filter((user) => user.appRole === "customer");
	const pendingServices = services.filter(
		(service) => service.approvalStatus === "pending",
	);
	const activeBookings = bookings.filter((booking) =>
		["requested", "accepted", "in-progress"].includes(booking.status),
	);
	const totalRevenue = payments.reduce(
		(sum, payment) => sum + payment.amount,
		0,
	);
	const currency = payments[0]?.currency || "USD";
	const firstName = adminName?.trim().split(/\s+/)[0];

	return (
		<div>
			<div>
				<h1 className="text-3xl font-extrabold tracking-tight text-primary">
					Platform overview
				</h1>
				<p className="mt-2 text-sm font-medium text-muted-foreground">
					{firstName ? `Welcome back, ${firstName}. ` : ""}
					Users, services, bookings and revenue across FixMate.
				</p>
			</div>

			{error ? (
				<div className="mt-6 rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-sm text-destructive">
					{error}
				</div>
			) : (
				<>
					<div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
						<OverviewStatCard
							label="Total users"
							value={users.length}
							detail={`${customers.length} customers`}
							icon={Users}
						/>
						<OverviewStatCard
							label="Technicians"
							value={technicians.length}
							detail={`${services.length} listed services`}
							icon={Wrench}
						/>
						<OverviewStatCard
							label="Active jobs"
							value={activeBookings.length}
							detail={`${pendingServices.length} services awaiting review`}
							icon={BriefcaseBusiness}
						/>
						<OverviewStatCard
							label="Total revenue"
							value={formatAmount(totalRevenue, currency)}
							detail={`${payments.length} completed payments`}
							icon={BadgeDollarSign}
							featured
						/>
					</div>

					<div className="mt-5 grid gap-5 lg:grid-cols-2">
						<ServicesReviewPanel services={services} />
						<LatestBookingsPanel bookings={bookings} />
						<RecentRevenuePanel payments={payments} />
						<section className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
							<div className="absolute right-0 top-0 size-32 rounded-bl-full bg-accent/70" />
							<div className="relative">
								<span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
									<ClipboardCheck className="size-5" aria-hidden="true" />
								</span>
								<p className="mt-5 text-sm font-semibold text-muted-foreground">
									Platform activity
								</p>
								<p className="mt-2 text-2xl font-bold text-card-foreground">
									{bookings.length} booking requests
								</p>
								<p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
									{pendingServices.length} services need approval while{" "}
									{activeBookings.length} jobs are currently active.
								</p>
							</div>
						</section>
					</div>
				</>
			)}
		</div>
	);
}
