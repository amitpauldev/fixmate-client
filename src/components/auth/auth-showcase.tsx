import Image from "next/image";
import { ShieldCheck, Wrench } from "lucide-react";

type AuthShowcaseProps = {
  title: string;
  description: string;
};

export function AuthShowcase({ title, description }: AuthShowcaseProps) {
  return (
    <aside className="relative hidden min-h-[calc(100vh-2rem)] overflow-hidden rounded-[1.75rem] bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:p-14">
      <div className="absolute -right-24 -top-24 size-72 rounded-full border-[44px] border-primary-foreground/5" />
      <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-secondary/25" />

      <div className="relative flex items-center gap-3">
        <Image
          src="/images/logo.png"
          alt=""
          width={52}
          height={52}
          priority
          className="size-13 rounded-xl object-contain"
        />
        <span className="text-2xl font-bold tracking-tight">FixMate</span>
      </div>

      <div className="relative max-w-lg">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
          <Wrench className="size-3.5" aria-hidden="true" />
          Trusted repair marketplace
        </span>
        <h1 className="text-4xl font-bold leading-[1.12] tracking-tight xl:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-primary-foreground/75">
          {description}
        </p>
      </div>

      <div className="relative flex items-center gap-3 text-sm text-primary-foreground/80">
        <ShieldCheck className="size-5 text-brand-accent" aria-hidden="true" />
        Secure access for customers and technicians
      </div>
    </aside>
  );
}
