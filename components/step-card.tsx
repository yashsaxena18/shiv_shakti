type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-black
        bg-zinc-50
        p-6

        transition-all
        duration-300

        dark:border-white
        dark:bg-zinc-900/80

        hover:-translate-y-1
        hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]

        active:translate-y-0
        active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]

        dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)]
        dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)]
      "
    >
      {/* Step Number */}
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-black
          bg-white
          text-sm
          font-semibold
          text-zinc-950

          dark:border-white
          dark:bg-zinc-950
          dark:text-white
        "
      >
        {step}
      </div>

      {/* Title */}
      <h3
        className="
          mt-5
          text-lg
          font-semibold
          text-zinc-950
          dark:text-white
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          mt-3
          text-sm
          leading-7
          text-zinc-600
          dark:text-zinc-300
        "
      >
        {description}
      </p>
    </div>
  );
}