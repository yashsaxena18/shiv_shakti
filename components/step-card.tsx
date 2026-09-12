type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-sm font-semibold text-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white">
        {step}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{description}</p>
    </div>
  );
}
