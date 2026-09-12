import { cn } from "@/lib/utils";

type AuthButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  onClick?: () => void;
};

export function AuthButton({
  children,
  loading = false,
  variant = "primary",
  type = "button",
  onClick,
}: AuthButtonProps) {
  const base =
    "flex h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]";

  const styles =
    variant === "primary"
      ? "bg-zinc-950 text-white hover:bg-zinc-800 hover:shadow-lg"
      : "border border-zinc-300 bg-white text-zinc-700 hover:border-zinc-950 hover:text-zinc-950";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={cn(base, styles)}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}