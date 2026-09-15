"use client";

import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { JobCard } from "@/components/home/JobCard";

const companies = [
  {
    company: "Relaxo Footwear Ltd.",
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "C&S Electric Ltd.",
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "Campus Activewear",
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "Mahindra Logistics",
    location: "Haridwar",
    type: "Full Time",
  },
  {
    company: "Milton Pvt. Ltd.",
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "IPL Biologicals Ltd.",
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
];

export function FeaturedJobs() {
  return (
    <section
      id="jobs"
      className="
        relative
        overflow-hidden
        bg-white
        py-12
        text-zinc-950
        sm:py-16
        lg:py-20

        dark:bg-zinc-950
        dark:text-white
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        <div
          className="
            absolute
            -right-24
            top-20
            h-64
            w-64
            rounded-full
            bg-zinc-100/70
            blur-3xl

            dark:bg-white/[0.02]
          "
        />

        <div
          className="
            absolute
            -left-24
            bottom-0
            h-64
            w-64
            rounded-full
            bg-amber-50/70
            blur-3xl

            dark:bg-amber-500/[0.02]
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-6xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div className="max-w-2xl">
            {/* Eyebrow */}

            <div
              className="
                mb-3
                flex
                items-center
                gap-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-zinc-500
                sm:text-[10px]

                dark:text-zinc-400
              "
            >
              <span
                className="
                  h-px
                  w-5
                  bg-zinc-400

                  dark:bg-zinc-600
                "
              />

              Opportunities
            </div>

            {/* Heading */}

            <h2
              className="
                text-2xl
                font-semibold
                tracking-[-0.04em]
                text-zinc-950
                sm:text-4xl
                lg:text-[2.7rem]

                dark:text-white
              "
            >
              Explore career opportunities.
            </h2>

            {/* Description */}

            <p
              className="
                mt-2.5
                max-w-xl
                text-xs
                leading-5
                text-zinc-500
                sm:mt-3
                sm:text-sm
                sm:leading-6

                dark:text-zinc-400
              "
            >
              Discover opportunities across leading companies and
              growing industries through Shiv Shakti Multi Service.
            </p>
          </div>

          {/* =================================================
              LOCATION
          ================================================== */}

          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-1.5
              rounded-full
              border
              border-zinc-200
              bg-zinc-50
              px-3
              py-1.5
              text-[9px]
              font-medium
              text-zinc-500
              sm:text-[10px]

              dark:border-white/10
              dark:bg-white/[0.03]
              dark:text-zinc-300
            "
          >
            <MapPin
              size={12}
              className="
                shrink-0
                text-zinc-500

                dark:text-zinc-300
              "
            />

            <span
              className="
                text-zinc-600
                dark:text-zinc-300
              "
            >
              Haridwar &amp; Beyond
            </span>
          </div>
        </div>

        {/* =====================================================
            COMPANY GRID
        ====================================================== */}

        <div
          className="
            mt-6
            grid
            grid-cols-3
            gap-2

            sm:mt-8
            sm:grid-cols-2
            sm:gap-3

            lg:grid-cols-3
            lg:gap-4
          "
        >
          {companies.map((company) => (
            <JobCard
              key={`${company.company}-${company.location}`}
              company={company.company}
              location={company.location}
              type={company.type}
            />
          ))}
        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div className="mt-6 flex justify-center sm:mt-8">
          <Link
            href="/login"
            className="
              group
              inline-flex
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-zinc-300
              bg-white
              px-5
              text-[11px]
              font-semibold
              text-zinc-900
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:border-zinc-400
              hover:bg-zinc-50

              sm:min-h-11
              sm:px-6
              sm:text-xs

              dark:border-zinc-700
              dark:bg-white
              dark:text-black
              dark:hover:border-zinc-500
              dark:hover:bg-zinc-100
            "
          >
            <span className="text-black dark:text-black">
              Explore Opportunities
            </span>

            <ArrowRight
              size={14}
              className="
                text-black
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* =====================================================
            SUPPORTING TEXT
        ====================================================== */}

        <p
          className="
            mt-3
            text-center
            text-[9px]
            leading-4
            text-zinc-400
            sm:text-[10px]

            dark:text-zinc-500
          "
        >
          Explore career opportunities available through our
          recruitment network.
        </p>
      </div>
    </section>
  );
}