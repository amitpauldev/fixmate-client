"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export type PasswordErrors = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
};

export function getPasswordErrors(password: string): PasswordErrors {
  return {
    length: password.length < 6,
    uppercase: !/[A-Z]/.test(password),
    lowercase: !/[a-z]/.test(password),
  };
}

type PasswordFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showRequirements?: boolean;
  autoComplete?: string;
};

export function PasswordField({
  id,
  value,
  onChange,
  error,
  showRequirements = true,
  autoComplete = "current-password",
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const requirements = getPasswordErrors(value);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">
        Password
      </label>
      <div className="relative">
        <input
          id={id}
          name="password"
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : `${id}-requirements`}
          autoComplete={autoComplete}
          placeholder="Enter your password"
          className="h-12 w-full rounded-xl border border-input bg-card px-4 pr-12 text-sm text-card-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
      {showRequirements ? (
        <ul id={`${id}-requirements`} className="mt-2 grid gap-1 text-xs sm:grid-cols-3">
          {[
            ["length", "At least 6 characters"],
            ["uppercase", "One uppercase letter"],
            ["lowercase", "One lowercase letter"],
          ].map(([key, label]) => {
            const failed = requirements[key as keyof PasswordErrors];
            return (
              <li
                key={key}
                className={failed ? "text-muted-foreground" : "text-secondary"}
              >
                <span aria-hidden="true">{failed ? "○" : "✓"}</span> {label}
              </li>
            );
          })}
        </ul>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
