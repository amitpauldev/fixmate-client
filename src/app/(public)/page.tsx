import type { Metadata } from "next";
import { HomeHero } from "@/components/shared/home/home-hero";
import { getServices } from "@/lib/api/services";
import type { Service } from "@/features/services/types/service";

export const metadata: Metadata = {
	title: "FixMate | Trusted Repair Services",
	description:
		"Find skilled technicians, compare repair services, and manage reliable repair requests with FixMate.",
};

export default async function HomePage() {
	let featuredService: Service | null = null;

	try {
		const services = await getServices({ sort: "newest" });
		featuredService =
			services.find((service) => Boolean(service.image)) ?? services[0] ?? null;
	} catch {
		featuredService = null;
	}

	return <HomeHero featuredService={featuredService} />;
}
