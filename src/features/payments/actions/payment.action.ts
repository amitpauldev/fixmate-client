// export async function addPayment(paymentData) {
// 	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			paymentData,
// 		}),
// 	});

// 	if (!response.ok) {
// 		const result = await response.json();
// 		throw new Error(result.message || "Unable to create payment intent");
// 	}

// 	return await response.json();
// }
