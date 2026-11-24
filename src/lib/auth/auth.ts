import { betterAuth } from "better-auth";
import { MongoClient, ObjectId } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { headers } from "next/headers";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("fix_mate");

export const auth = betterAuth({
	database: mongodbAdapter(db, {
		client,
	}),
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 6,
	},

	plugins: [admin()],

	user: {
		additionalFields: {
			appRole: {
				type: "string",
				defaultValue: "customer",
				input: true,
			},
			bio: {
				type: "string",
				defaultValue: "",
				input: true,
			},
			phone: {
				type: "string",
				defaultValue: "",
				input: true,
			},
			area: {
				type: "string",
				defaultValue: "",
				input: true,
			},
			image: {
				type: "string",
				defaultValue: "",
				input: true,
			},
		},
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					const appRole =
						user.appRole === "technician" || user.appRole === "admin"
							? user.appRole
							: "customer";

					return {
						data: {
							...user,
							appRole,
						},
					};
				},
			},
		},
	},
});

// Server-side authentication
export const authServer = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return session;
};
