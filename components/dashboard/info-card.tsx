type InfoCardProps = {
  label: string;
  value: string;
};

export function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-zinc-950">{value}</p>
    </div>
  );
}
