import Link from "next/link";
import { Mail, MapPin, Phone, Wrench } from "lucide-react";

const serviceLinks = [
  { label: "Browse services", href: "/services" },
  { label: "Find a technician", href: "/services" },
  { label: "Become a technician", href: "/sign-up" },
];

const companyLinks = [
  { label: "About FixMate", href: "/about" },
  { label: "Sign in", href: "/sign-in" },
  { label: "Create account", href: "/sign-up" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="FixMate home"
              className="inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wrench className="size-5" aria-hidden="true" />
              </span>
              <span className="text-xl font-bold tracking-tight text-card-foreground">
                Fix<span className="text-secondary">Mate</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Connecting customers with trusted, skilled repair professionals for
              reliable service at every step.
            </p>
          </div>

          <nav aria-label="Service links">
            <h2 className="text-sm font-bold text-card-foreground">Services</h2>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company links">
            <h2 className="text-sm font-bold text-card-foreground">FixMate</h2>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold text-card-foreground">Contact</h2>
            <address className="mt-4 space-y-3 not-italic">
              <a
                href="mailto:support@fixmate.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                support@fixmate.com
              </a>
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                +880 1700-000000
              </a>
              <p className="flex items-start gap-2 text-sm leading-5 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Dhaka, Bangladesh
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} FixMate. All rights reserved.</p>
          <div className="flex gap-5">
            <Link
              href="/about"
              className="transition-colors hover:text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Privacy
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
