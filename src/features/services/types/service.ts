export type ServiceFormValues = {
	title: string;
	category:
		| "Smartphone"
		| "Laptop & PC"
		| "AC"
		| "Refrigerator"
		| "TV"
		| "Washing Machine"
		| "Electrical";
	description: string;
	image: string;
	basePrice: number;
	estimatedDuration: string;
	serviceMode: "Home Visit" | "Shop Drop-off";
	serviceArea: string;
	technicianId: string;
	technicianName: string;
	technicianEmail: string;
	approvalStatus: "pending" | "approved" | "rejected";
	isAvailable: boolean;
	createdAt: string;
	updatedAt: string;
};

export type ServiceFormSubmission = ServiceFormValues & {
	imageFile: File | null;
};

export type Service = ServiceFormValues & {
	_id: string;
};
