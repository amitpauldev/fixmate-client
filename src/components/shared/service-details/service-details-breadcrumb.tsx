import Link from "next/link";
import type { Service } from "@/features/services/types/service";

type ServiceDetailsBreadcrumbProps = {
	category: Service["category"];
};

export function ServiceDetailsBreadcrumb({
	category,
}: ServiceDetailsBreadcrumbProps) {
	return (
		<nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm">
			<Link
				href="/services"
				className="font-medium text-muted-foreground transition-colors hover:text-secondary"
			>
				Services
			</Link>
			<span className="text-muted-foreground">/</span>
			<span className="font-medium text-secondary">{category}</span>
		</nav>
	);
}
