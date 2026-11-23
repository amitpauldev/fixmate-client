import { PaymentStatus } from "@/features/bookings/types/booking";

export type Payment = {
	_id: string;
	stripeSessionId: string;
	amount: number;
	bookingId: string;
	currency: string;
	customerEmail: string;
	customerId: string;
	customerName: string;
	paidAt: string;
	paymentStatus: PaymentStatus;
	serviceTitle: string;
	technicianEmail: string;
	technicianId: string;
	technicianName: string;
	transactionId: string;
};
