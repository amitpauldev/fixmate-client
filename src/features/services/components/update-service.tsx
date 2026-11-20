"use client";

import React from "react";
import { Service } from "../types/service";
import { updateService } from "../actions/service.action";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { ServiceForm } from "./service-form";

const UpdateServiceForm = ({
	serviceToUpdate,
	id,
}: {
	serviceToUpdate: Service;
	id: string;
}) => {
	const router = useRouter();
	const handleSubmit = async (values: any, imageFile?: File | null) => {
		try {
			const result = await updateService(id, values, imageFile);
			if (!result.success) {
				toast.error(result.message);
				return;
			}
			toast.success(result.message);
			router.push("/dashboard/technician/my-services");
		} catch (error) {
			toast.error("Failed to update service. Please try again.");
		}
	};
	return (
		<ServiceForm
			key={`${id}`}
			initialValues={{
				...serviceToUpdate,
			}}
			submitLabel="Update Service"
			onSubmit={handleSubmit}
		/>
	);
};

export default UpdateServiceForm;
