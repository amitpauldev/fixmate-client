"use client";

import toast from "react-hot-toast";
import { ServiceForm } from "@/features/services/components/service-form";
import { authClient } from "@/lib/auth/auth-client";
import type {
	ServiceFormSubmission,
	ServiceFormValues,
} from "@/features/services/types/service";
import { addService } from "@/features/services/actions/service.action";
import { uploadToImgBB } from "@/lib/utils/upload-to-imgbb";

export default function AddServicePage() {
	const { data: session } = authClient.useSession();
	const user = session?.user as { name?: string; email?: string } | undefined;

	const handleSubmit = async (
		values: ServiceFormValues,
		imageFile?: File | null,
	) => {
		const result = await addService(values, imageFile);
		if (!result.success) {
			toast.error(result.message);
			return;
		}
		toast.success(result.message);
	};

	return (
		<div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
			<div className="mb-6">
				<p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">
					Technician service
				</p>
				<h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
					Add a new service
				</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					Share the details customers need before booking.
				</p>
			</div>
			<ServiceForm
				key={`${user?.name || "name"}-${user?.email || "email"}`}
				initialValues={{
					technicianName: user?.name,
					technicianEmail: user?.email,
				}}
				onSubmit={handleSubmit}
			/>
		</div>
	);
}
