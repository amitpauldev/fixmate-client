"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PublicNavItem } from "@/components/layout/public-navbar";

type PublicNavLinksProps = {
  items: PublicNavItem[];
};

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicNavLinks({ items }: PublicNavLinksProps) {
  const pathname = usePathname();

  return (
    <div className="hidden h-full items-center gap-1 md:flex">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "relative flex h-full items-center px-3.5 text-sm font-semibold text-foreground after:absolute after:inset-x-3.5 after:bottom-4 after:h-0.5 after:rounded-full after:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                : "relative flex h-full items-center rounded-lg px-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
