import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe/stripe";
import { auth } from "@/lib/auth/auth";

export async function POST(request: NextRequest) {
	try {
		// 1. Authenticate customer using Better Auth
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return NextResponse.json(
				{ success: false, message: "Unauthorized. Please log in." },
				{ status: 401 },
			);
		}
		if (session.user.appRole !== "customer") {
			return NextResponse.json(
				{ success: false, message: "Only customers can make payments." },
				{ status: 403 },
			);
		}

		// 2. Receive booking ID
		const { bookingId } = await request.json();

		if (!bookingId || !/^[a-f\d]{24}$/i.test(bookingId)) {
			return NextResponse.json(
				{ success: false, message: "Invalid booking ID" },
				{ status: 400 },
			);
		}

		// 3. Fetch booking from Express backend
		const bookingResponse = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`,
			{ cache: "no-store" },
		);

		if (!bookingResponse.ok) {
			return NextResponse.json(
				{ success: false, message: "Booking not found" },
				{ status: 404 },
			);
		}

		const bookingResult = await bookingResponse.json();
		const booking = bookingResult.data;

		if (!booking) {
			return NextResponse.json(
				{ success: false, message: "Booking not found" },
				{ status: 404 },
			);
		}

		// 4. Verify booking ownership
		if (String(booking.customerId) !== String(session.user.id)) {
			return NextResponse.json(
				{ success: false, message: "You cannot pay for this booking" },
				{ status: 403 },
			);
		}

		// 5. Validate booking status
		if (booking.status !== "completed" || booking.paymentStatus !== "unpaid") {
			return NextResponse.json(
				{
					success: false,
					message: "This booking is not eligible for payment",
				},
				{ status: 400 },
			);
		}

		// 6. Validate final amount
		if (
			typeof booking.finalAmount !== "number" ||
			!Number.isFinite(booking.finalAmount) ||
			booking.finalAmount <= 0
		) {
			return NextResponse.json(
				{ success: false, message: "Invalid booking amount" },
				{ status: 400 },
			);
		}

		// 7. Create Stripe Checkout Session
		const sessionUrl = process.env.NEXT_PUBLIC_BASE_URL;

		if (!sessionUrl) {
			throw new Error("NEXT_PUBLIC_BASE_URL is not configured");
		}

		const checkoutSession = await stripe.checkout.sessions.create({
			mode: "payment",

			customer_email: booking.customerEmail,

			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: booking.serviceTitle,
						},
						unit_amount: Math.round(booking.finalAmount * 100),
					},
					quantity: 1,
				},
			],

			metadata: {
				bookingId: booking._id.toString(),
			},

			success_url: `${sessionUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

			cancel_url: `${sessionUrl}/payment/cancel`,
		});

		// 8. Return Checkout URL
		return NextResponse.json({
			success: true,
			url: checkoutSession.url,
		});
	} catch (error) {
		console.error("Stripe Checkout Error:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Unable to create checkout session",
			},
			{ status: 500 },
		);
	}
}
