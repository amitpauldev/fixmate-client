"use client";

import { useEffect, useId, useRef, useState } from "react";
import { UserPlus, X } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/auth-client";

type CreateUserDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreated: () => void;
};

type CreateRole = "customer" | "technician" | "admin";

export function CreateUserDialog({
	open,
	onOpenChange,
	onCreated,
}: CreateUserDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<CreateRole>("customer");
	const [phone, setPhone] = useState("");
	const [area, setArea] = useState("");
	const [creating, setCreating] = useState(false);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	const closeDialog = () => {
		if (!creating) onOpenChange(false);
	};

	const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (creating) return;

		setCreating(true);
		try {
			const result = await authClient.admin.createUser({
				name: name.trim(),
				email: email.trim().toLowerCase(),
				password,
				role: role as "admin" | "user",
				data: {
					role,
					phone: phone.trim(),
					area: area.trim(),
				},
			});

			if (result.error) throw new Error(result.error.message);

			toast.success("User created successfully.");
			setName("");
			setEmail("");
			setPassword("");
			setRole("customer");
			setPhone("");
			setArea("");
			onOpenChange(false);
			onCreated();
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Unable to create user.",
			);
		} finally {
			setCreating(false);
		}
	};

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			onCancel={(event) => {
				event.preventDefault();
				closeDialog();
			}}
			onClose={() => {
				if (open) onOpenChange(false);
			}}
			className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/50"
		>
			<form onSubmit={handleCreate}>
				<div className="flex items-start justify-between border-b border-border px-5 py-4 sm:px-6">
					<div className="flex items-center gap-3">
						<span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
							<UserPlus className="size-5" aria-hidden="true" />
						</span>
						<div>
							<h2 id={titleId} className="text-lg font-bold">
								Create new user
							</h2>
							<p className="mt-0.5 text-xs text-muted-foreground">
								Add a FixMate account with a secure password.
							</p>
						</div>
					</div>
					<button
						type="button"
						aria-label="Close create user dialog"
						onClick={closeDialog}
						disabled={creating}
						className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<X className="size-4" aria-hidden="true" />
					</button>
				</div>

				<div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
					<label className="sm:col-span-2">
						<span className="mb-2 block text-sm font-semibold">Full name</span>
						<input
							required
							value={name}
							onChange={(event) => setName(event.target.value)}
							className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
						/>
					</label>
					<label>
						<span className="mb-2 block text-sm font-semibold">Email</span>
						<input
							required
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
						/>
					</label>
					<label>
						<span className="mb-2 block text-sm font-semibold">Password</span>
						<input
							required
							type="password"
							minLength={6}
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
						/>
					</label>
					<label>
						<span className="mb-2 block text-sm font-semibold">Role</span>
						<select
							value={role}
							onChange={(event) => setRole(event.target.value as CreateRole)}
							className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
						>
							<option value="customer">Customer</option>
							<option value="technician">Technician</option>
							<option value="admin">Admin</option>
						</select>
					</label>
					<label>
						<span className="mb-2 block text-sm font-semibold">Phone</span>
						<input
							value={phone}
							onChange={(event) => setPhone(event.target.value)}
							className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
						/>
					</label>
					<label className="sm:col-span-2">
						<span className="mb-2 block text-sm font-semibold">Area</span>
						<input
							value={area}
							onChange={(event) => setArea(event.target.value)}
							className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
						/>
					</label>
				</div>

				<div className="flex flex-col-reverse gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
					<button
						type="button"
						onClick={closeDialog}
						disabled={creating}
						className="h-10 rounded-lg border border-border px-4 text-sm font-bold text-card-foreground hover:bg-accent disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={creating}
						className="h-10 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-secondary disabled:opacity-60"
					>
						{creating ? "Creating..." : "Create user"}
					</button>
				</div>
			</form>
		</dialog>
	);
}
