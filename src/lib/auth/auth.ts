import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

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
	user: {
		additionalFields: {
			role: {
				type: "string",
				defaultValue: "customer",
				input: true,
			},
		},
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					const role =
						user.role === "customer" || user.role === "technician"
							? user.role
							: "customer";

					return {
						data: {
							...user,
							role,
						},
					};
				},
			},
		},
	},
});
