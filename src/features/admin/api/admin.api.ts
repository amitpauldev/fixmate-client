export async function getAllServices() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/admin/services`,
			{
				cache: "no-store",
			},
		);
		const result = await res.json();
		if (!res.ok) {
			throw new Error(result.message || "Failed to fetch all services.");
		}
		return result.data;
	} catch (error) {
		console.error("Error fetching all services:", error);
		throw new Error("Failed to fetch all services.");
	}
}
