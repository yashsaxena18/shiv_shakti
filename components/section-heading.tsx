type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
        {title}
      </h2>
      <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">{description}</p>
    </div>
  );
}
