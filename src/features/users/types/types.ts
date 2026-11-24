export type User = {
	_id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	createdAt: string;
	updatedAt: string;
	role: "user" | "admin";
	appRole: "customer" | "technician" | "admin";
	area?: string;
	bio?: string;
	image?: string;
	phone?: string;
};
