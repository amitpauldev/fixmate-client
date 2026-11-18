"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/auth-client";
import { AuthShowcase } from "@/components/auth/auth-showcase";
import { getPasswordErrors, PasswordField } from "@/components/auth/password-field";

type SignInFormProps = {
  callbackUrl?: string;
};

type SignInErrors = {
  email?: string;
  password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSafeCallbackUrl(callbackUrl?: string) {
  if (
    callbackUrl &&
    callbackUrl.startsWith("/") &&
    !callbackUrl.startsWith("//")
  ) {
    return callbackUrl;
  }
  return undefined;
}

export function SignInForm({ callbackUrl }: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<SignInErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: SignInErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (Object.values(getPasswordErrors(password)).some(Boolean)) {
      nextErrors.password = "Enter a valid password.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "Incorrect email or password.");
        return;
      }

      const role =
        data && "user" in data
          ? (data.user as { role?: string }).role
          : undefined;
      const fallback =
        role === "admin"
          ? "/dashboard/admin"
          : role === "technician"
            ? "/dashboard/technician"
            : "/dashboard/customer";
      const destination = getSafeCallbackUrl(callbackUrl) || fallback;

      toast.success("Signed in successfully.");
      router.push(destination);
      router.refresh();
    } catch {
      toast.error("Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-8">
        <AuthShowcase
          title="Welcome back to reliable repairs."
          description="Sign in to manage bookings, payments, technicians, and services from your FixMate dashboard."
        />

        <section
          aria-labelledby="sign-in-title"
          className="flex items-center justify-center py-8 lg:py-10"
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
                Welcome back
              </p>
              <h2
                id="sign-in-title"
                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Sign in to FixMate
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your credentials to continue.
              </p>
            </div>

            <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="sign-in-email"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Email address
                </label>
                <input
                  id="sign-in-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "sign-in-email-error" : undefined}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-input bg-card px-4 text-sm text-card-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
                {errors.email ? (
                  <p id="sign-in-email-error" className="mt-1.5 text-xs font-medium text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <PasswordField
                id="sign-in-password"
                value={password}
                onChange={setPassword}
                error={errors.password}
                showRequirements={false}
                autoComplete="current-password"
              />

              <button
                type="submit"
                disabled={submitting}
                className="h-12 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {submitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New to FixMate?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
