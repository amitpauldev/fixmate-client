import { headers } from "next/headers";
import { auth } from "../auth/auth";
import { redirect } from "next/navigation";

export const getToken = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session || !session.session?.token) {
		redirect("/unauthorized");
	}
	return session.session.token;
};
