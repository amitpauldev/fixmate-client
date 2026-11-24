"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/auth-client";
import { AuthShowcase } from "@/components/auth/auth-showcase";
import {
	getPasswordErrors,
	PasswordField,
} from "@/components/auth/password-field";

type SignUpRole = "customer" | "technician";
type SignUpErrors = {
	fullName?: string;
	email?: string;
	password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpForm() {
	const router = useRouter();
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<SignUpRole>("customer");
	const [errors, setErrors] = useState<SignUpErrors>({});
	const [submitting, setSubmitting] = useState(false);

	const validate = () => {
		const passwordErrors = getPasswordErrors(password);
		const nextErrors: SignUpErrors = {};

		if (!fullName.trim()) nextErrors.fullName = "Full name is required.";
		if (!email.trim()) {
			nextErrors.email = "Email is required.";
		} else if (!emailPattern.test(email.trim())) {
			nextErrors.email = "Enter a valid email address.";
		}
		if (!password) {
			nextErrors.password = "Password is required.";
		} else if (Object.values(passwordErrors).some(Boolean)) {
			nextErrors.password = "Your password does not meet all requirements.";
		}

		setErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!validate()) return;

		setSubmitting(true);
		try {
			const safeRole: SignUpRole =
				role === "technician" ? "technician" : "customer";
			const { error } = await authClient.signUp.email({
				name: fullName.trim(),
				email: email.trim(),
				password,
				appRole: safeRole,
			});

			if (error) {
				toast.error(error.message || "Unable to create your account.");
				return;
			}

			toast.success("Account created successfully.");
			router.push(
				safeRole === "technician"
					? "/dashboard/technician"
					: "/dashboard/customer",
			);
			router.refresh();
		} catch {
			toast.error("Unable to create your account. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<main className="min-h-screen bg-background p-4 sm:p-6">
			<div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-8">
				<AuthShowcase
					title="Quality repairs start with the right connection."
					description="Join FixMate as a customer or technician and manage reliable repair services in one professional marketplace."
				/>

				<section
					aria-labelledby="sign-up-title"
					className="flex items-center justify-center py-6 lg:py-10"
				>
					<div className="w-full max-w-md">
						<div className="mb-8 flex items-center justify-between lg:hidden">
							<Link
								href="/"
								className="flex items-center gap-2 text-lg font-bold text-foreground"
							>
								<span className="text-secondary">Fix</span>Mate
							</Link>
						</div>

						<div>
							<p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-secondary">
								Create account
							</p>
							<h2
								id="sign-up-title"
								className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
							>
								Join FixMate
							</h2>
							<p className="mt-2 text-sm text-muted-foreground">
								Create your account and choose how you want to use FixMate.
							</p>
						</div>

						<form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="full-name"
									className="mb-2 block text-sm font-semibold text-foreground"
								>
									Full name
								</label>
								<input
									id="full-name"
									name="name"
									type="text"
									value={fullName}
									onChange={(event) => setFullName(event.target.value)}
									aria-invalid={Boolean(errors.fullName)}
									aria-describedby={
										errors.fullName ? "full-name-error" : undefined
									}
									autoComplete="name"
									placeholder="Enter your full name"
									className="h-12 w-full rounded-xl border border-input bg-card px-4 text-sm text-card-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
								/>
								{errors.fullName ? (
									<p
										id="full-name-error"
										className="mt-1.5 text-xs font-medium text-destructive"
									>
										{errors.fullName}
									</p>
								) : null}
							</div>

							<div>
								<label
									htmlFor="sign-up-email"
									className="mb-2 block text-sm font-semibold text-foreground"
								>
									Email address
								</label>
								<input
									id="sign-up-email"
									name="email"
									type="email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									aria-invalid={Boolean(errors.email)}
									aria-describedby={
										errors.email ? "sign-up-email-error" : undefined
									}
									autoComplete="email"
									placeholder="you@example.com"
									className="h-12 w-full rounded-xl border border-input bg-card px-4 text-sm text-card-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
								/>
								{errors.email ? (
									<p
										id="sign-up-email-error"
										className="mt-1.5 text-xs font-medium text-destructive"
									>
										{errors.email}
									</p>
								) : null}
							</div>

							<PasswordField
								id="sign-up-password"
								value={password}
								onChange={setPassword}
								error={errors.password}
								autoComplete="new-password"
							/>

							<fieldset>
								<legend className="mb-2 text-sm font-semibold text-foreground">
									Choose your role
								</legend>
								<div className="grid grid-cols-2 gap-3">
									{[
										{
											value: "customer" as const,
											label: "Customer",
											icon: UserRound,
										},
										{
											value: "technician" as const,
											label: "Technician",
											icon: BriefcaseBusiness,
										},
									].map((option) => {
										const Icon = option.icon;
										const selected = role === option.value;
										return (
											<label
												key={option.value}
												className={
													selected
														? "flex cursor-pointer items-center gap-3 rounded-xl border-2 border-primary bg-accent p-3 text-sm font-bold text-accent-foreground"
														: "flex cursor-pointer items-center gap-3 rounded-xl border border-input bg-card p-3 text-sm font-semibold text-card-foreground transition-colors hover:border-primary/50"
												}
											>
												<input
													type="radio"
													name="role"
													value={option.value}
													checked={selected}
													onChange={() => setRole(option.value)}
													className="sr-only"
												/>
												<span
													className={
														selected
															? "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
															: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
													}
												>
													<Icon className="size-4" aria-hidden="true" />
												</span>
												{option.label}
											</label>
										);
									})}
								</div>
							</fieldset>

							<button
								type="submit"
								disabled={submitting}
								className="h-12 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
							>
								{submitting ? "Creating account..." : "Create account"}
							</button>
						</form>

						<p className="mt-6 text-center text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link
								href="/sign-in"
								className="font-bold text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								Sign in
							</Link>
						</p>
					</div>
				</section>
			</div>
		</main>
	);
}
