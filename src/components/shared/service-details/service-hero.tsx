import { Wrench } from "lucide-react";

type ServiceHeroProps = {
	title: string;
	image: string;
};

export function ServiceHero({ title, image }: ServiceHeroProps) {
	return (
		<div
			className="relative min-h-72 overflow-hidden rounded-3xl border border-border bg-muted sm:min-h-96 lg:min-h-[420px]"
			role="img"
			aria-label={`${title} service image`}
		>
			{image ? (
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url("${image}")` }}
				/>
			) : (
				<div className="absolute inset-0 flex items-center justify-center text-secondary">
					<Wrench className="size-16" strokeWidth={1.25} aria-hidden="true" />
				</div>
			)}
			<div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
		</div>
	);
}
