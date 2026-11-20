"use client";

import { useState } from "react";
import { deleteService } from "../actions/service.action";
import toast from "react-hot-toast";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Trash2 } from "lucide-react";
import { Service } from "../types/service";
import { useRouter } from "next/navigation";

const DeleteService = ({ service }: { service: Service }) => {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		setDeleting(true);
		try {
			await deleteService(service._id);
			toast.success("Service deleted successfully.");
			setDeleteDialogOpen(false);
			router.refresh();
		} catch (error) {
			toast.error(
				"An error occurred while deleting the service. Please try again.",
			);
		} finally {
			setDeleting(false);
		}
	};

	return (
		<>
			<button
				type="button"
				aria-label={`Delete ${service.title}`}
				onClick={() => {
					setDeleteDialogOpen(true);
				}}
				className="cursor-pointer inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<Trash2 className="size-4" aria-hidden="true" />
			</button>

			<ConfirmationDialog
				open={deleteDialogOpen}
				title="Delete Service?"
				description="Are you sure you want to delete this service? This action cannot be undone."
				confirmLabel={"delete"}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDelete}
				isConfirming={deleting}
			/>
		</>
	);
};

export default DeleteService;
