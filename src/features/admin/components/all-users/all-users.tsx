"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Users } from "lucide-react";
import toast from "react-hot-toast";
import type { User } from "@/features/users/types/types";
import { authClient } from "@/lib/auth/auth-client";
import { CreateUserDialog } from "./create-user-dialog";
import { updateUserRole } from "@/features/users/actions/users.action";

type AllUsersProps = {
	users: User[];
	error?: string;
	currentUserId: string;
};

type UserRole = User["appRole"];
type UserFilter = "all" | UserRole;

const filters: Array<{ value: UserFilter; label: string }> = [
	{ value: "all", label: "All" },
	{ value: "customer", label: "Customers" },
	{ value: "technician", label: "Technicians" },
	{ value: "admin", label: "Admins" },
];

function formatDate(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Not set";

	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}

function getInitials(name: string) {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");
}

export function AllUsers({ users, error, currentUserId }: AllUsersProps) {
	const router = useRouter();
	const [activeFilter, setActiveFilter] = useState<UserFilter>("all");
	const [search, setSearch] = useState("");
	const [createOpen, setCreateOpen] = useState(false);
	const [updatingId, setUpdatingId] = useState<string | null>(null);

	const counts = useMemo<Record<UserFilter, number>>(
		() => ({
			all: users.length,
			customer: users.filter((user) => user.appRole === "customer").length,
			technician: users.filter((user) => user.appRole === "technician").length,
			admin: users.filter((user) => user.appRole === "admin").length,
		}),
		[users],
	);

	const visibleUsers = useMemo(() => {
		const query = search.trim().toLowerCase();

		return [...users]
			.filter((user) => activeFilter === "all" || user.appRole === activeFilter)
			.filter((user) => {
				if (!query) return true;
				return [user.name, user.email, user.area, user.phone]
					.filter(Boolean)
					.some((value) => value!.toLowerCase().includes(query));
			})
			.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			);
	}, [activeFilter, search, users]);

	const handleRoleChange = async (user: User, role: UserRole) => {
		if (user._id === currentUserId) {
			toast.error("Your own role cannot be changed.");
			return;
		}

		setUpdatingId(user._id);
		try {
			const result = await updateUserRole(user._id, role);

			if (!result.success) {
				throw new Error(result.message);
			}

			toast.success(`${user.name}'s role updated.`);
			router.refresh();
		} catch (changeError) {
			toast.error(
				changeError instanceof Error
					? changeError.message
					: "Unable to update the role.",
			);
		} finally {
			setUpdatingId(null);
		}
	};

	return (
		<div>
			<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight text-primary">
						Manage users
					</h1>
					<p className="mt-2 text-sm font-medium text-muted-foreground">
						Manage accounts and assign customer or technician roles.
					</p>
				</div>
				<button
					type="button"
					onClick={() => setCreateOpen(true)}
					className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<Plus className="size-4" aria-hidden="true" />
					Create user
				</button>
			</div>

			{error ? (
				<div className="mt-6 rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-sm text-destructive">
					{error}
				</div>
			) : (
				<>
					<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div
							className="flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1.5 shadow-sm"
							aria-label="Filter users"
						>
							{filters.map((filter) => {
								const active = activeFilter === filter.value;
								return (
									<button
										key={filter.value}
										type="button"
										aria-pressed={active}
										onClick={() => setActiveFilter(filter.value)}
										className={`cursor-pointer whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold transition-colors sm:px-4 ${
											active
												? "bg-primary text-primary-foreground shadow-sm"
												: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
										}`}
									>
										{filter.label}{" "}
										<span className="ml-1">{counts[filter.value]}</span>
									</button>
								);
							})}
						</div>

						<label className="relative block w-full sm:w-72">
							<span className="sr-only">Search users</span>
							<Search
								className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
								aria-hidden="true"
							/>
							<input
								type="search"
								value={search}
								onChange={(event) => setSearch(event.target.value)}
								placeholder="Search users"
								className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm text-card-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
							/>
						</label>
					</div>

					{visibleUsers.length === 0 ? (
						<div className="mt-6 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
							<Users
								className="mx-auto size-9 text-muted-foreground"
								aria-hidden="true"
							/>
							<h2 className="mt-4 text-lg font-bold text-foreground">
								No users found
							</h2>
							<p className="mt-1 text-sm text-muted-foreground">
								Try another role or search term.
							</p>
						</div>
					) : (
						<>
							<div className="mt-6 hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-sm md:block">
								<table className="w-full min-w-[820px] border-collapse">
									<thead>
										<tr className="border-b border-border text-left text-sm font-bold text-secondary">
											<th className="px-5 py-4">User</th>
											<th className="px-4 py-4">Email</th>
											<th className="px-4 py-4">Area</th>
											<th className="px-4 py-4">Joined</th>
											<th className="px-5 py-4 text-right">Role</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-border">
										{visibleUsers.map((user) => {
											const isCurrentUser = user._id === currentUserId;
											const updating = updatingId === user._id;

											return (
												<tr
													key={user._id}
													className="transition-colors hover:bg-accent/30"
												>
													<td className="px-5 py-4">
														<div className="flex items-center gap-3">
															<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
																{getInitials(user.name)}
															</span>
															<div className="min-w-0">
																<p className="truncate text-sm font-bold text-card-foreground">
																	{user.name}
																</p>
																{isCurrentUser && (
																	<p className="mt-0.5 text-xs text-muted-foreground">
																		You
																	</p>
																)}
															</div>
														</div>
													</td>
													<td className="px-4 py-4 text-sm text-primary">
														{user.email}
													</td>
													<td className="px-4 py-4 text-sm text-muted-foreground">
														{user.area || "Not provided"}
													</td>
													<td className="px-4 py-4 text-sm text-muted-foreground">
														{formatDate(user.createdAt)}
													</td>
													<td className="px-5 py-4 text-right">
														<select
															aria-label={`Role for ${user.name}`}
															value={user.appRole}
															disabled={isCurrentUser || updating}
															onChange={(event) =>
																handleRoleChange(
																	user,
																	event.target.value as UserRole,
																)
															}
															className="h-10 min-w-32 cursor-pointer rounded-lg border border-input bg-card px-3 text-sm font-semibold text-card-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
														>
															<option value="customer">Customer</option>
															<option value="technician">Technician</option>
															<option value="admin">Admin</option>
														</select>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>

							<div className="mt-6 grid gap-3 md:hidden">
								{visibleUsers.map((user) => {
									const isCurrentUser = user._id === currentUserId;
									const updating = updatingId === user._id;

									return (
										<article
											key={user._id}
											className="rounded-2xl border border-border bg-card p-4 shadow-sm"
										>
											<div className="flex items-center gap-3">
												<span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
													{getInitials(user.name)}
												</span>
												<div className="min-w-0">
													<p className="truncate font-bold text-card-foreground">
														{user.name}
													</p>
													<p className="mt-1 truncate text-xs text-primary">
														{user.email}
													</p>
												</div>
											</div>

											<div className="mt-4 grid grid-cols-2 gap-3 border-t border-dashed border-border pt-4">
												<div>
													<p className="text-xs text-muted-foreground">Area</p>
													<p className="mt-1 text-sm text-card-foreground">
														{user.area || "Not provided"}
													</p>
												</div>
												<div>
													<p className="text-xs text-muted-foreground">
														Joined
													</p>
													<p className="mt-1 text-sm text-card-foreground">
														{formatDate(user.createdAt)}
													</p>
												</div>
												<label className="col-span-2">
													<span className="text-xs text-muted-foreground">
														Role
													</span>
													<select
														aria-label={`Role for ${user.name}`}
														value={user.appRole}
														disabled={isCurrentUser || updating}
														onChange={(event) =>
															handleRoleChange(
																user,
																event.target.value as UserRole,
															)
														}
														className="mt-1 h-10 w-full rounded-lg border border-input bg-card px-3 text-sm font-semibold text-card-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
													>
														<option value="customer">Customer</option>
														<option value="technician">Technician</option>
														<option value="admin">Admin</option>
													</select>
												</label>
											</div>
										</article>
									);
								})}
							</div>
						</>
					)}
				</>
			)}

			<CreateUserDialog
				open={createOpen}
				onOpenChange={setCreateOpen}
				onCreated={() => router.refresh()}
			/>
		</div>
	);
}
