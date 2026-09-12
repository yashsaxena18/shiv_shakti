type ProfileProgressProps = {
  step: number;
};

export function ProfileProgress({
  step,
}: ProfileProgressProps) {
  const percentage = (step / 3) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Step {step} of 3
        </p>

        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {Math.round(percentage)}%
        </p>
      </div>

      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-2 rounded-full bg-zinc-950 transition-all duration-500 dark:bg-white"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}