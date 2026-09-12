import { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

type SkillsInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
};

export function SkillsInput<T extends FieldValues>({
  control,
  name,
  label,
  error,
  required = false,
  placeholder = "Add a skill",
}: SkillsInputProps<T>) {
  const [draft, setDraft] = useState("");

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const skills = (field.value as string[] | undefined) ?? [];

        const addSkill = () => {
          const value = draft.trim();
          if (!value || skills.includes(value)) {
            setDraft("");
            return;
          }

          field.onChange([...skills, value]);
          setDraft("");
        };

        const removeSkill = (skillToRemove: string) => {
          field.onChange(skills.filter((skill) => skill !== skillToRemove));
        };

        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              {label}
              {required ? <span className="ml-1 text-zinc-500">*</span> : null}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950/80 dark:text-zinc-100 dark:focus:border-white dark:focus:ring-zinc-800"
              />
              <button
                type="button"
                onClick={addSkill}
                className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-white dark:hover:text-white"
              >
                Add
              </button>
            </div>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-zinc-500 transition hover:text-zinc-950 dark:hover:text-white"
                      aria-label={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
            {error ? (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            ) : null}
          </div>
        );
      }}
    />
  );
}
