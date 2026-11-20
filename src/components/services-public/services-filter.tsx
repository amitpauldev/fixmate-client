import { Search, SlidersHorizontal, X } from "lucide-react";
import { serviceCategories, serviceModes } from "@/features/services/schemas/service-form";

const controlClassName =
	"h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-card-foreground outline-none transition-[border-color,box-shadow] focus:border-ring focus:ring-2 focus:ring-ring/20";

export function ServicesFilter() {
	return (
		<form
			role="search"
			aria-label="Filter services"
			className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
		>
			<div className="mb-4 flex items-center gap-2 text-sm font-bold text-card-foreground">
				<SlidersHorizontal className="size-4 text-secondary" aria-hidden="true" />
				Filter services
			</div>

			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1.5fr)_repeat(3,minmax(150px,1fr))_auto] lg:items-end">
				<label className="block">
					<span className="mb-2 block text-xs font-bold text-muted-foreground">
						Search
					</span>
					<span className="relative block">
						<Search
							className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
							aria-hidden="true"
						/>
						<input
							type="search"
							name="search"
							placeholder="Search by service"
							className={`${controlClassName} pl-9`}
						/>
					</span>
				</label>

				<label className="block">
					<span className="mb-2 block text-xs font-bold text-muted-foreground">
						Category
					</span>
					<select name="category" className={controlClassName}>
						<option value="">All categories</option>
						{serviceCategories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</label>

				<label className="block">
					<span className="mb-2 block text-xs font-bold text-muted-foreground">
						Service mode
					</span>
					<select name="serviceMode" className={controlClassName}>
						<option value="">All modes</option>
						{serviceModes.map((mode) => (
							<option key={mode} value={mode}>
								{mode}
							</option>
						))}
					</select>
				</label>

				<label className="block">
					<span className="mb-2 block text-xs font-bold text-muted-foreground">
						Sort by
					</span>
					<select name="sort" className={controlClassName}>
						<option value="recommended">Recommended</option>
						<option value="price-low">Price: Low to high</option>
						<option value="price-high">Price: High to low</option>
						<option value="newest">Newest</option>
					</select>
				</label>

				<button
					type="reset"
					className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-bold text-muted-foreground transition-colors hover:border-secondary/50 hover:bg-accent hover:text-accent-foreground sm:col-span-2 lg:col-span-1"
				>
					<X className="size-4" aria-hidden="true" />
					Clear filters
				</button>
			</div>
		</form>
	);
}
