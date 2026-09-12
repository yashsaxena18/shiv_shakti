type SectionCardProps = {
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({ title, description, children, className = "" }: SectionCardProps) {
  return (
    <section className={`rounded-[1.75rem] border border-zinc-200 bg-white p-4 sm:p-6 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.24)] ${className}`}>
      {title || description ? (
        <div className="mb-5">
          {title ? <h2 className="text-lg font-semibold text-zinc-950">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm text-zinc-600">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
