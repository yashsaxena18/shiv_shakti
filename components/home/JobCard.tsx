import { ArrowUpRight } from "lucide-react";

type JobCardProps = {
  company: string;
  location: string;
  type: string;
};

export function JobCard({
  company,
  location,
  type,
}: JobCardProps) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border-2
        border-black
        bg-white
        text-zinc-950
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]

        dark:border-white
        dark:bg-zinc-900
        dark:text-white
        dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)]

        sm:rounded-2xl
      "
    >
      {/* =====================================================
          MOBILE + DESKTOP CARD
      ====================================================== */}

      <div className="p-3 sm:p-5">
        {/* ===================================================
            COMPANY INITIAL
        ==================================================== */}

        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-black
            text-xs
            font-bold
            text-white

            dark:bg-white
            dark:text-black

            sm:h-10
            sm:w-10
            sm:text-sm
          "
        >
          {company.charAt(0)}
        </div>

        {/* ===================================================
            COMPANY NAME
        ==================================================== */}

        <h3
          className="
            mt-3
            line-clamp-2
            text-[11px]
            font-bold
            leading-4
            text-black

            dark:text-white

            sm:mt-4
            sm:text-base
            sm:leading-5
          "
        >
          {company}
        </h3>

        {/* ===================================================
            LOCATION
        ==================================================== */}

        <div
          className="
            mt-3
            border-t
            border-zinc-200
            pt-2.5

            dark:border-zinc-700

            sm:mt-4
            sm:pt-3
          "
        >
          <p
            className="
              truncate
              text-[8px]
              font-medium
              text-zinc-500

              dark:text-zinc-300

              sm:text-xs
            "
          >
            {location}
          </p>
        </div>
      </div>

      {/* =====================================================
          DESKTOP EXTRA INFORMATION
      ====================================================== */}

      <div
        className="
          hidden
          border-t
          border-zinc-200
          px-5
          py-3

          dark:border-zinc-700

          sm:flex
          sm:items-center
          sm:justify-between
        "
      >
        {/* Type */}

        <span
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-zinc-500

            dark:text-zinc-400
          "
        >
          {type}
        </span>

        {/* View */}

        <span
          className="
            inline-flex
            items-center
            gap-1
            text-xs
            font-bold
            text-black

            dark:text-white
          "
        >
          View Opportunity

          <ArrowUpRight
            size={13}
            className="
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </span>
      </div>

      {/* =====================================================
          BOTTOM HOVER LINE
      ====================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-1
          w-0
          bg-black
          transition-all
          duration-300
          group-hover:w-full

          dark:bg-white
        "
      />
    </article>
  );
}