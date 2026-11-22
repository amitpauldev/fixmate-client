import type { Metadata } from "next";
import { Suspense } from "react";
import { HomeHero } from "@/components/shared/home/home-hero";
import { PopularServices } from "@/components/shared/home/popular-services";
import { PopularServicesLoading } from "@/components/shared/home/popular-services-loading";

export const metadata: Metadata = {
	title: "FixMate | Trusted Repair Services",
	description:
		"Find skilled technicians, compare repair services, and manage reliable repair requests with FixMate.",
};

export default function HomePage() {
	return (
		<>
			<HomeHero />
			<Suspense fallback={<PopularServicesLoading />}>
				<PopularServices />
			</Suspense>
		</>
	);
}
