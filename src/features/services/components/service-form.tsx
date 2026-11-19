"use client";

import Image from "next/image";
import {
	ImageIcon,
	Link2,
	Send,
	Upload,
	X,
	type LucideIcon,
} from "lucide-react";
import {
	type ChangeEvent,
	type FormEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	serviceCategories,
	serviceModes,
	validateServiceForm,
	type ServiceFormErrors,
} from "@/features/services/schemas/service-form";
import type {
	ServiceFormSubmission,
	ServiceFormValues,
} from "@/features/services/types/service";

type ImageMode = "upload" | "url";

type ServiceFormProps = {
	initialValues?: Partial<ServiceFormValues>;
	submitLabel?: string;
	onSubmit: (
		values: ServiceFormValues,
		imageFile?: File | null,
	) => void | Promise<void>;
};

const fieldClassName =
	"h-12 w-full rounded-lg border border-input bg-card px-4 text-sm text-card-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20";

export function ServiceForm({
	initialValues,
	submitLabel = "Submit for review",
	onSubmit,
}: ServiceFormProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imageMode, setImageMode] = useState<ImageMode>(
		initialValues?.image ? "url" : "upload",
	);
	const [preview, setPreview] = useState(initialValues?.image || "");
	const [isAvailable, setIsAvailable] = useState(
		initialValues?.isAvailable ?? true,
	);
	const [errors, setErrors] = useState<ServiceFormErrors>({});
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		return () => {
			if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
		};
	}, [preview]);

	const clearImage = () => {
		if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
		setPreview("");
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleImageFile = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
			setErrors((current) => ({
				...current,
				image: "Choose a JPG, PNG, or WebP image.",
			}));
			return;
		}
		if (file.size > 8 * 1024 * 1024) {
			setErrors((current) => ({
				...current,
				image: "The image must be 8 MB or smaller.",
			}));
			return;
		}
		if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
		setPreview(URL.createObjectURL(file));
		setErrors((current) => ({ ...current, image: undefined }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const imageFile =
			imageMode === "upload" ? (form.get("imageFile") as File | null) : null;

		const values: ServiceFormValues = {
			title: String(form.get("title") || ""),
			category: String(
				form.get("category") || "",
			) as ServiceFormValues["category"],
			description: String(form.get("description") || ""),
			image: imageMode === "url" ? String(form.get("image") || "") : "",
			basePrice: Number(form.get("basePrice")),
			estimatedDuration: String(form.get("estimatedDuration") || ""),
			serviceMode: String(
				form.get("serviceMode") || "",
			) as ServiceFormValues["serviceMode"],
			serviceArea: String(form.get("serviceArea") || ""),
			technicianName: String(form.get("technicianName") || ""),
			technicianEmail: String(form.get("technicianEmail") || ""),
			approvalStatus: "pending",
			isAvailable,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const nextErrors = validateServiceForm(
			values,
			imageFile?.size ? imageFile : null,
		);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length) return;

		setSubmitting(true);
		try {
			await onSubmit(values, imageFile);
		} finally {
			setSubmitting(false);
		}
	};

	const toggleOptions: {
		value: ImageMode;
		label: string;
		icon: LucideIcon;
	}[] = [
		{ value: "upload", label: "Upload image", icon: Upload },
		{ value: "url", label: "Paste URL", icon: Link2 },
	];

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
		>
			<div className="grid grid-cols-1 gap-x-5 gap-y-5 p-5 sm:p-7 lg:grid-cols-2">
				<label className="block lg:col-span-2">
					<span className="mb-2 block text-sm font-semibold text-card-foreground">
						Service title
					</span>
					<input
						name="title"
						defaultValue={initialValues?.title}
						placeholder="e.g. iPhone Screen Replacement"
						className={fieldClassName}
						aria-invalid={Boolean(errors.title)}
					/>
					{errors.title ? (
						<span className="mt-1.5 block text-xs font-medium text-destructive">
							{errors.title}
						</span>
					) : null}
				</label>

				<label className="block">
					<span className="mb-2 block text-sm font-semibold text-card-foreground">
						Category
					</span>
					<select
						name="category"
						defaultValue={initialValues?.category || "Smartphone"}
						className={fieldClassName}
					>
						{serviceCategories.map((category) => (
							<option key={category}>{category}</option>
						))}
					</select>
				</label>

				<label className="block">
					<span className="mb-2 block text-sm font-semibold text-card-foreground">
						Service mode
					</span>
					<select
						name="serviceMode"
						defaultValue={initialValues?.serviceMode || "Home Visit"}
						className={fieldClassName}
					>
						{serviceModes.map((mode) => (
							<option key={mode}>{mode}</option>
						))}
					</select>
				</label>

				<label className="block">
					<span className="mb-2 block text-sm font-semibold text-card-foreground">
						Base price (USD)
					</span>
					<input
						name="basePrice"
						defaultValue={initialValues?.basePrice}
						type="number"
						min="0"
						step="0.01"
						inputMode="decimal"
						placeholder="45"
						className={fieldClassName}
						aria-invalid={Boolean(errors.basePrice)}
					/>
					{errors.basePrice ? (
						<span className="mt-1.5 block text-xs font-medium text-destructive">
							{errors.basePrice}
						</span>
					) : null}
				</label>

				<label className="block">
					<span className="mb-2 block text-sm font-semibold text-card-foreground">
						Estimated duration
					</span>
					<input
						name="estimatedDuration"
						defaultValue={initialValues?.estimatedDuration}
						placeholder="2-3 hours"
						className={fieldClassName}
						aria-invalid={Boolean(errors.estimatedDuration)}
					/>
					{errors.estimatedDuration ? (
						<span className="mt-1.5 block text-xs font-medium text-destructive">
							{errors.estimatedDuration}
						</span>
					) : null}
				</label>

				<label className="block lg:col-span-2">
					<span className="mb-2 block text-sm font-semibold text-card-foreground">
						Service area
					</span>
					<input
						name="serviceArea"
						defaultValue={initialValues?.serviceArea}
						placeholder="Mirpur, Dhaka"
						className={fieldClassName}
						aria-invalid={Boolean(errors.serviceArea)}
					/>
					{errors.serviceArea ? (
						<span className="mt-1.5 block text-xs font-medium text-destructive">
							{errors.serviceArea}
						</span>
					) : null}
				</label>

				<label className="block lg:col-span-2">
					<span className="mb-2 block text-sm font-semibold text-card-foreground">
						Description
					</span>
					<textarea
						name="description"
						defaultValue={initialValues?.description}
						placeholder="What the service includes, models you cover, warranty..."
						rows={5}
						className="w-full resize-y rounded-lg border border-input bg-card px-4 py-3 text-sm leading-6 text-card-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
						aria-invalid={Boolean(errors.description)}
					/>
					{errors.description ? (
						<span className="mt-1.5 block text-xs font-medium text-destructive">
							{errors.description}
						</span>
					) : null}
				</label>

				<fieldset className="lg:col-span-2">
					<legend className="mb-2 text-sm font-semibold text-card-foreground">
						Service image
					</legend>
					<div className="mb-4 inline-flex rounded-lg border border-border bg-muted p-1">
						{toggleOptions.map((option) => {
							const Icon = option.icon;
							const selected = imageMode === option.value;
							return (
								<button
									key={option.value}
									type="button"
									onClick={() => {
										setImageMode(option.value);
										if (
											option.value === "upload" &&
											!preview.startsWith("blob:")
										) {
											setPreview(initialValues?.image || "");
										}
										setErrors((current) => ({ ...current, image: undefined }));
									}}
									aria-pressed={selected}
									className={`flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
								>
									<Icon className="size-4" aria-hidden="true" />
									{option.label}
								</button>
							);
						})}
					</div>

					{imageMode === "upload" ? (
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
							<div className="relative flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-input bg-muted">
								{preview ? (
									<>
										<Image
											src={preview}
											alt="Service preview"
											fill
											unoptimized
											className="object-cover"
										/>
										<button
											type="button"
											aria-label="Remove uploaded image"
											onClick={clearImage}
											className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-card text-card-foreground shadow-sm transition-colors hover:bg-destructive hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
										>
											<X className="size-4" aria-hidden="true" />
										</button>
									</>
								) : (
									<div className="flex flex-col items-center gap-2 text-muted-foreground">
										<ImageIcon className="size-6" aria-hidden="true" />
										<span className="text-xs font-medium">No image yet</span>
									</div>
								)}
							</div>
							<div>
								<input
									ref={fileInputRef}
									name="imageFile"
									type="file"
									accept="image/jpeg,image/png,image/webp"
									onChange={handleImageFile}
									className="sr-only"
									id="service-image-upload"
								/>
								<label
									htmlFor="service-image-upload"
									className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-bold text-card-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-within:ring-2 focus-within:ring-ring"
								>
									<Upload className="size-4" aria-hidden="true" />
									Upload image
								</label>
								<p className="mt-2 max-w-md text-xs leading-5 text-muted-foreground">
									JPG, PNG, or WebP. Up to 8 MB.
								</p>
							</div>
						</div>
					) : (
						<div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_128px] sm:items-start">
							<div>
								<label
									htmlFor="service-image-url"
									className="mb-2 block text-xs font-semibold text-card-foreground"
								>
									Image URL
								</label>
								<div className="relative">
									<Link2 className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
									<input
										id="service-image-url"
										name="image"
										defaultValue={initialValues?.image}
										type="url"
										placeholder="https://example.com/service-image.jpg"
										className={`${fieldClassName} pl-10`}
										onChange={(event) => setPreview(event.target.value)}
									/>
								</div>
							</div>
							<div className="flex size-32 items-center justify-center overflow-hidden rounded-xl border border-dashed border-input bg-muted sm:mt-6">
								{preview ? (
									<Image
										src={preview}
										alt="Service preview"
										fill
										unoptimized
										className="object-cover"
									/>
								) : (
									<ImageIcon
										className="size-6 text-muted-foreground"
										aria-hidden="true"
									/>
								)}
							</div>
						</div>
					)}
					{errors.image ? (
						<p className="mt-2 text-xs font-medium text-destructive">
							{errors.image}
						</p>
					) : null}
				</fieldset>

				<label className="block">
					<span className="mb-2 block text-sm font-semibold text-card-foreground">
						Technician name
					</span>
					<input
						name="technicianName"
						defaultValue={initialValues?.technicianName}
						placeholder="Rahim Uddin"
						readOnly
						className={`${fieldClassName} cursor-not-allowed bg-muted text-muted-foreground`}
						aria-invalid={Boolean(errors.technicianName)}
					/>
					{errors.technicianName ? (
						<span className="mt-1.5 block text-xs font-medium text-destructive">
							{errors.technicianName}
						</span>
					) : null}
				</label>

				<label className="block">
					<span className="mb-2 block text-sm font-semibold text-card-foreground">
						Technician email
					</span>
					<input
						name="technicianEmail"
						defaultValue={initialValues?.technicianEmail}
						type="email"
						placeholder="rahim.tech@fixmate.com"
						readOnly
						className={`${fieldClassName} cursor-not-allowed bg-muted text-muted-foreground`}
						aria-invalid={Boolean(errors.technicianEmail)}
					/>
					{errors.technicianEmail ? (
						<span className="mt-1.5 block text-xs font-medium text-destructive">
							{errors.technicianEmail}
						</span>
					) : null}
				</label>

				<label className="flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/50 px-4 py-3 lg:col-span-2">
					<span>
						<span className="block text-sm font-semibold text-card-foreground">
							Service availability
						</span>
						<span className="mt-1 block text-xs text-muted-foreground">
							Customers can discover and request this service.
						</span>
					</span>
					<button
						type="button"
						role="switch"
						aria-checked={isAvailable}
						onClick={() => setIsAvailable((current) => !current)}
						className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
							isAvailable ? "bg-secondary" : "bg-input"
						}`}
					>
						<span
							aria-hidden="true"
							className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition-transform ${
								isAvailable ? "translate-x-0" : "-translate-x-5"
							}`}
						/>
					</button>
				</label>
			</div>

			<div className="flex justify-end border-t border-border px-5 py-4 sm:px-7">
				<button
					type="submit"
					disabled={submitting}
					className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-accent px-5 text-sm font-bold text-brand-accent-foreground shadow-sm transition-[transform,background-color] hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
				>
					<Send className="size-4" aria-hidden="true" />
					{submitting ? "Submitting..." : submitLabel}
				</button>
			</div>
		</form>
	);
}
