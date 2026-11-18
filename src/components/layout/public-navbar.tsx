import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { PublicMobileNav } from "@/components/layout/public-mobile-nav";
import { PublicNavLinks } from "@/components/layout/public-nav-links";
import { PublicUserMenu } from "@/components/layout/public-user-menu";

export type PublicNavItem = {
  label: string;
  href: string;
};

export const publicNavItems: PublicNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label="FixMate home"
          className="group flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={44}
            height={44}
            priority
            className="size-11 rounded-xl object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Fix<span className="text-secondary">Mate</span>
          </span>
        </Link>

        <PublicNavLinks items={publicNavItems} />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <PublicUserMenu />
          <PublicMobileNav items={publicNavItems} />
        </div>
      </nav>
    </header>
  );
}
