import type { Metadata } from "next";
import { AboutContent } from "@/components/shared/about/about-content";

export const metadata: Metadata = {
	title: "About FixMate | Simple, Reliable Home Services",
	description:
		"Learn how FixMate connects homeowners with skilled technicians and makes home-service bookings simpler.",
};

export default function AboutPage() {
	return <AboutContent />;
}
