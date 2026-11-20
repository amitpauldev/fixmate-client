import UpdateServiceForm from "@/features/services/components/update-service";
import { getServiceById, getServicesByTechnicianId } from "@/lib/api/services";
import { redirect } from "next/navigation";

const UpdateService = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const { id } = await params;
	if (!id) {
		redirect("/dashboard/technician/my-services");
	}

	const serviceToUpdate = await getServiceById(id);
	if (!serviceToUpdate) {
		redirect("/dashboard/technician/my-services");
	}

	return (
		<div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
			<div className="mb-6">
				<p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">
					Technician service
				</p>
				<h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
					Update service
				</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					Update the details of your service.
				</p>
			</div>
			{serviceToUpdate ? (
				<UpdateServiceForm serviceToUpdate={serviceToUpdate} id={id} />
			) : (
				<div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
					<p className="mt-2 text-sm text-muted-foreground">
						Service not found. Please check the service ID.
					</p>
				</div>
			)}
		</div>
	);
};

export default UpdateService;
