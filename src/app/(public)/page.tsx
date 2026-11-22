import type { Metadata } from "next";
import { HomeHero } from "@/components/shared/home/home-hero";

export const metadata: Metadata = {
	title: "FixMate | Trusted Repair Services",
	description:
		"Find skilled technicians, compare repair services, and manage reliable repair requests with FixMate.",
};

export default function HomePage() {
	return <HomeHero />;
}
