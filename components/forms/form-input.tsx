import type { InputHTMLAttributes } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: string;
  required?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "required">;

export function FormInput<T extends FieldValues>({
  id,
  label,
  register,
  error,
  required = false,
  className = "",
  ...rest
}: FormInputProps<T>) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
        {label}
        {required ? <span className="ml-1 text-zinc-500">*</span> : null}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950/80 dark:text-zinc-100 dark:focus:border-white dark:focus:ring-zinc-800 ${className}`}
        {...register(id)}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
