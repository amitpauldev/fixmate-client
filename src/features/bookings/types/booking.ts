export type BookingStatus =
	| "requested"
	| "accepted"
	| "rejected"
	| "in-progress"
	| "completed"
	| "cancelled";

export type PaymentStatus = "unpaid" | "paid";

export type BookingFormValues = {
	serviceId: string;
	serviceTitle: string;
	serviceImage: string;
	category: string;
	basePrice: number;
	technicianId: string;
	technicianName: string;
	technicianEmail: string;
	customerId: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	address: string;
	preferredDate: Date;
	problemDescription: string;
};

export type Booking = BookingFormValues & {
	_id: string;
	status: BookingStatus;
	finalAmount: number;
	paymentStatus: PaymentStatus;
	createdAt: string;
	updatedAt: string;
};
