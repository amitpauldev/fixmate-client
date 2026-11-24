"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/auth-client";
import { uploadProfileImage } from "@/features/users/actions/profile.action";

type ProfileUser = {
	id?: string;
	name?: string;
	email?: string;
	appRole?: string;
	image?: string | null;
	phone?: string;
	area?: string;
	bio?: string;
};

function getInitials(name?: string) {
	if (!name) return "FM";

	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");
}

function getRoleLabel(appRole?: string) {
	if (appRole === "technician") return "Technician";
	if (appRole === "admin") return "Admin";
	return "Customer";
}

export default function ProfilePage() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return (
			<div className="p-4 sm:p-6 lg:p-8">
				<div className="h-8 w-56 animate-pulse rounded bg-muted" />
				<div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-muted" />
				<div className="mt-8 h-[520px] animate-pulse rounded-2xl border border-border bg-muted" />
			</div>
		);
	}

	if (!session?.user) {
		return (
			<div className="p-4 sm:p-6 lg:p-8">
				<div className="rounded-2xl border border-border bg-card p-8">
					<h1 className="text-2xl font-bold text-card-foreground">
						Update profile
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						Please sign in to update your profile.
					</p>
				</div>
			</div>
		);
	}

	const user = session.user as ProfileUser;

	return <ProfileForm key={user.id || user.email || "profile"} user={user} />;
}

function ProfileForm({ user }: { user: ProfileUser }) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [name, setName] = useState(user.name || "");
	const [phone, setPhone] = useState(user.phone || "");
	const [area, setArea] = useState(user.area || "");
	const [bio, setBio] = useState(user.bio || "");
	const [image, setImage] = useState(user.image || "");
	const [preview, setPreview] = useState(user.image || "");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		return () => {
			if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
		};
	}, [preview]);

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
			toast.error("Choose a JPG, PNG, or WebP image.");
			event.target.value = "";
			return;
		}

		if (file.size > 8 * 1024 * 1024) {
			toast.error("Choose an image smaller than 8 MB.");
			event.target.value = "";
			return;
		}

		setSelectedFile(file);
		setPreview(URL.createObjectURL(file));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (submitting) return;

		const cleanName = name.trim();
		if (!cleanName) {
			toast.error("Full name is required.");
			return;
		}

		setSubmitting(true);
		try {
			let imageUrl = image;

			if (selectedFile) {
				const upload = await uploadProfileImage(selectedFile);
				if (!upload.success || !upload.imageUrl) {
					toast.error(upload.message);
					return;
				}
				imageUrl = upload.imageUrl;
			}

			const { error } = await authClient.updateUser({
				name: cleanName,
				image: imageUrl,
				phone,
				area,
				bio,
			});

			if (error) {
				toast.error(error.message || "Unable to update your profile.");
				return;
			}

			setImage(imageUrl);
			setPreview(imageUrl);
			setSelectedFile(null);
			toast.success("Profile updated successfully.");
		} catch {
			toast.error("Unable to update your profile.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="p-4 sm:p-6 lg:p-8">
			<div>
				<h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
					Update profile
				</h1>
				<p className="mt-2 text-sm text-muted-foreground sm:text-base">
					Your name and photo show in the navbar and on your services.
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				noValidate
				className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8"
			>
				<div className="flex items-center gap-5">
					<div className="relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-border bg-muted sm:size-24">
						{preview ? (
							<Image
								src={preview}
								alt={`${name || "FixMate"} profile`}
								fill
								sizes="96px"
								unoptimized
								className="object-cover"
							/>
						) : (
							<span className="flex size-full items-center justify-center bg-accent text-sm font-bold text-accent-foreground sm:text-base">
								{getInitials(name)}
							</span>
						)}
					</div>

					<div>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/jpeg,image/png,image/webp"
							onChange={handleImageChange}
							className="sr-only"
							aria-label="Choose profile photo"
						/>
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="h-10 rounded-lg border border-border bg-background px-4 text-sm font-bold text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							Upload photo
						</button>
						<p className="mt-2 text-xs leading-5 text-muted-foreground">
							JPG, PNG or WebP. Up to 8 MB.
						</p>
					</div>
				</div>

				<div className="mt-8 grid gap-5 sm:grid-cols-2">
					<ProfileField
						id="profile-name"
						label="Full name"
						value={name}
						onChange={setName}
						autoComplete="name"
					/>
					<ProfileField
						id="profile-phone"
						label="Phone"
						value={phone}
						onChange={setPhone}
						autoComplete="tel"
						placeholder="01XXX-XXXXXX"
					/>
					<ProfileField
						id="profile-email"
						label="Email"
						value={user.email || ""}
						readOnly
						autoComplete="email"
					/>
					<ProfileField
						id="profile-role"
						label="Role"
						value={getRoleLabel(user.appRole)}
						readOnly
					/>
					<div className="sm:col-span-2">
						<ProfileField
							id="profile-area"
							label="Area"
							value={area}
							onChange={setArea}
							autoComplete="address-level2"
							placeholder="Enter your area, e.g., Uttara, Dhaka"
						/>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="profile-bio"
							className="mb-2 block text-sm font-semibold text-card-foreground"
						>
							Bio
						</label>
						<textarea
							id="profile-bio"
							name="bio"
							value={bio}
							onChange={(event) => setBio(event.target.value)}
							rows={5}
							placeholder="Tell others a little about yourself"
							className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm text-card-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
						/>
					</div>
				</div>

				<div className="mt-8 flex justify-end border-t border-border pt-6">
					<button
						type="submit"
						disabled={submitting}
						className="cursor-pointer h-11 min-w-32 rounded-lg bg-brand-accent px-5 text-sm font-bold text-brand-accent-foreground shadow-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
					>
						{submitting ? "Saving..." : "Save profile"}
					</button>
				</div>
			</form>
		</div>
	);
}

type ProfileFieldProps = {
	id: string;
	label: string;
	value: string;
	onChange?: (value: string) => void;
	readOnly?: boolean;
	autoComplete?: string;
	placeholder?: string;
};

function ProfileField({
	id,
	label,
	value,
	onChange,
	readOnly = false,
	autoComplete,
	placeholder,
}: ProfileFieldProps) {
	return (
		<div>
			<label
				htmlFor={id}
				className="mb-2 block text-sm font-semibold text-card-foreground"
			>
				{label}
			</label>
			<input
				id={id}
				name={id.replace("profile-", "")}
				type="text"
				value={value}
				onChange={(event) => onChange?.(event.target.value)}
				readOnly={readOnly}
				autoComplete={autoComplete}
				placeholder={placeholder}
				className={`h-12 w-full rounded-xl border border-input px-4 text-sm outline-none transition-colors ${
					readOnly
						? "cursor-not-allowed bg-muted text-muted-foreground"
						: "bg-background text-card-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
				}`}
			/>
		</div>
	);
}
