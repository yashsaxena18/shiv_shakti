import { cn } from "@/lib/utils";
type AuthCardProps = {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function AuthCard({ title, description, children, footer, className = "" }: AuthCardProps) {
  return (
    <div className={cn(
  "rounded-3xl border border-zinc-200 bg-white p-5 sm:p-8",
  className
)}>
      <div className="space-y-2 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
 Shiv Shakti Multi Service
</p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-[1.75rem]">
          {title}
        </h1>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">{description}</p>
      </div>
      <div className="mt-7 space-y-4">{children}</div>
      {footer ? <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">{footer}</div> : null}
    </div>
  );
}
