import Link from "next/link";
import { authServer } from "@/lib/auth/auth";
import { stripe } from "@/lib/stripe/stripe";

type Props = {
	searchParams: Promise<{ session_id?: string }>;
};

export default async function PaymentSuccessPage({ searchParams }: Props) {
	const { session_id } = await searchParams;
	const session = await authServer();

	if (!session?.user.id || !session_id) {
		return <PaymentResult success={false} />;
	}

	try {
		// 1. Retrieve Stripe Checkout Session
		const checkout = await stripe.checkout.sessions.retrieve(session_id);

		const bookingId = checkout.metadata?.bookingId;

		if (
			checkout.mode !== "payment" ||
			checkout.payment_status !== "paid" ||
			!bookingId
		) {
			throw new Error("Payment is not completed.");
		}

		// 2. Verify booking ownership
		const bookingResponse = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`,
			{ cache: "no-store" },
		);

		if (!bookingResponse.ok) {
			throw new Error("Booking not found.");
		}

		const bookingResult = await bookingResponse.json();
		const booking = bookingResult.data;

		if (!booking || String(booking.customerId) !== String(session.user.id)) {
			throw new Error("Booking verification failed.");
		}

		// 3. Verify payment and update booking through backend
		const secret = process.env.PAYMENT_WEBHOOK_SECRET;

		if (!secret) {
			throw new Error("Payment verification is not configured.");
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/payments/checkout-verify`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-webhook-secret": secret,
				},
				body: JSON.stringify({ sessionId: session_id }),
				cache: "no-store",
			},
		);

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.message || "Payment verification failed.");
		}

		return <PaymentResult success={true} />;
	} catch (error) {
		console.error("Payment verification error:", error);

		return <PaymentResult success={false} />;
	}
}

function PaymentResult({ success }: { success: boolean }) {
	return (
		<main className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-xl items-center px-4 py-12">
			<section className="w-full rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
				<div
					className={`mx-auto flex size-14 items-center justify-center rounded-full ${
						success
							? "bg-status-completed/10 text-status-completed"
							: "bg-destructive/10 text-destructive"
					}`}
				>
					<span className="text-2xl font-bold">{success ? "✓" : "!"}</span>
				</div>

				<h1 className="mt-5 text-2xl font-bold text-card-foreground">
					{success ? "Payment Successful!" : "Payment Could Not Be Verified"}
				</h1>

				<p className="mt-3 text-sm leading-6 text-muted-foreground">
					{success
						? "Your payment has been verified. Your booking is now marked as paid."
						: "We couldn't verify your payment. Please check your bookings or contact support."}
				</p>

				<Link
					href="/dashboard/customer/bookings"
					className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-brand-accent px-5 text-sm font-bold text-brand-accent-foreground hover:bg-brand-accent/90"
				>
					View My Bookings
				</Link>
			</section>
		</main>
	);
}
