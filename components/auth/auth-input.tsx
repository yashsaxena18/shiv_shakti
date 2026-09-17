import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AuthInputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  min?: string | number;
};

export function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  min,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
        {label}
      </label>
      <div className="relative">
        <input
  id={id}
  
  type={inputType}
  value={value}
  onChange={(event) => onChange(event.target.value)}
  placeholder={placeholder}
  autoComplete={autoComplete}
  min={min}
  className="h-11 sm:h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 pr-12 text-sm outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
/>
        {type === "password" ? (
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute inset-y-0 right-3 flex items-center text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
