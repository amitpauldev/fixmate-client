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
			role: {
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

// Server-side authentication
export const authServer = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return session;
};

export type AuthUserSummary = {
	id: string;
	name: string;
	image: string | null;
};

export async function getAuthUserById(
	id: string,
): Promise<AuthUserSummary | null> {
	if (!id) return null;

	const user = await db.collection("user").findOne({
		$or: [{ _id: new ObjectId(id) }, { id }],
	});

	if (!user) return null;

	return {
		id: typeof user.id === "string" ? user.id : String(user._id),
		name: typeof user.name === "string" ? user.name : "FixMate technician",
		image: typeof user.image === "string" ? user.image : null,
	};
}
