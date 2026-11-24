"use client";

import { useState } from "react";
import { RepairRequestDialog } from "./repair-request-dialog";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Service } from "@/features/services/types/service";

type ServicePricingCardProps = {
	service: Service;
};

export function ServicePricingCard({ service }: ServicePricingCardProps) {
	const [requestOpen, setRequestOpen] = useState(false);
	const router = useRouter();
	const { data: session } = authClient.useSession();
	const user = session?.user;

	const handleRequestOpen = () => {
		if (!user) {
			toast.error("You need to sign in to request a repair.");
			router.push(
				`/sign-in?callbackUrl=${process.env.NEXT_PUBLIC_BASE_URL}/services/${service._id}`,
			);
			return;
		}
		if (user.appRole !== "customer") {
			toast.error("Only customers can request a repair.");
			return;
		}
		setRequestOpen(true);
	};

	return (
		<>
			<aside className="rounded-3xl border border-border bg-card p-6 shadow-sm">
				<p className="text-sm font-medium text-muted-foreground">
					Starting price
				</p>
				<p className="mt-1 text-4xl font-bold tracking-tight text-card-foreground">
					$ {service.basePrice.toFixed(0)}
				</p>
				<p className="mt-3 text-sm leading-6 text-muted-foreground">
					The technician confirms the final price when the job is done. You pay
					only after that.
				</p>
				<button
					type="button"
					onClick={handleRequestOpen}
					className="cursor-pointer mt-6 h-12 w-full rounded-xl bg-brand-accent px-5 text-sm font-bold text-brand-accent-foreground shadow-sm transition-colors hover:bg-brand-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					Request repair
				</button>
			</aside>

			<RepairRequestDialog
				service={service}
				user={user}
				open={requestOpen}
				onOpenChange={setRequestOpen}
			/>
		</>
	);
}
