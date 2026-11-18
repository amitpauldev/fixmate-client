"use client";

import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/auth-client";

type SessionUser = {
  name?: string;
  email?: string;
  role?: string;
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

function getDashboardPath(role?: string) {
  if (role === "technician") return "/dashboard/technician";
  if (role === "admin") return "/dashboard/admin";
  return "/dashboard/customer";
}

function getRoleLabel(role?: string) {
  if (role === "technician") return "Technician";
  if (role === "admin") return "Admin";
  return "Customer";
}

export function PublicUserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (isPending) {
    return (
      <span
        aria-hidden="true"
        className="hidden size-11 animate-pulse rounded-full bg-muted md:block"
      />
    );
  }

  if (!session?.user) {
    return (
      <div className="hidden items-center gap-2 md:flex">
        <Link
          href="/sign-in"
          className="rounded-lg px-3.5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Get started
        </Link>
      </div>
    );
  }

  const user = session.user as SessionUser;
  const dashboardPath = getDashboardPath(user.role);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully.");
      setOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Unable to sign out. Please try again.");
    }
  };

  return (
    <div ref={menuRef} className="relative hidden md:block">
      <button
        type="button"
        aria-label="Open account menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
          {getInitials(user.name)}
        </span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Account menu"
          className="absolute right-0 top-[3.25rem] w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
        >
          <div className="border-b border-border px-5 py-5">
            <p className="truncate text-base font-bold text-card-foreground">
              {user.name || "FixMate user"}
            </p>
            <p className="mt-1 truncate text-sm text-muted-foreground">
              {user.email}
            </p>
            <span className="mt-3 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
              {getRoleLabel(user.role)}
            </span>
          </div>

          <div className="p-2">
            <Link
              role="menuitem"
              href={dashboardPath}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Dashboard
            </Link>
            <Link
              role="menuitem"
              href="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Update profile
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
