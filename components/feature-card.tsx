type FeatureCardProps = {
  title: string;
  description: string;
  index: string;
};

export function FeatureCard({ title, description, index }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-900/90">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">{index}</p>
      <h3 className="mt-4 text-xl font-semibold text-zinc-950 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{description}</p>
    </div>
  );
}
