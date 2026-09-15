import Link from "next/link";
import {
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  MessageSquare,
  Target,
  UserRound,
} from "lucide-react";

const stats = [
  { value: "5,000+", label: "Candidates placed" },
  { value: "250+", label: "Hiring companies" },
  { value: "4.8/5", label: "Candidate rating" },
];

const journey = [
  {
    title: "Build your profile",
    description:
      "Personal details, education, skills, and where you want to go next.",
    icon: UserRound,
  },
  {
    title: "Get matched to roles",
    description:
      "We surface openings that fit your experience and preferences.",
    icon: Target,
  },
  {
    title: "Interview with confidence",
    description: "Track every conversation from first call to final round.",
    icon: MessageSquare,
  },
  {
    title: "Receive your offer",
    description: "Compare offers side by side and accept when you're ready.",
    icon: Award,
  },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#fafaf8] pt-24 dark:bg-zinc-950 sm:pt-28"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 -top-28 h-64 w-64 rounded-full bg-emerald-200/25 blur-3xl sm:h-80 sm:w-80 dark:bg-emerald-500/5" />

        <div className="absolute -right-32 top-32 h-80 w-80 rounded-full bg-zinc-200/40 blur-3xl sm:h-96 sm:w-96 dark:bg-white/[0.025]" />

        <div className="absolute inset-x-0 top-0 h-px bg-zinc-200/70 dark:bg-white/10" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        <div className="grid items-center gap-9 lg:grid-cols-[1fr_0.9fr] lg:gap-12 xl:gap-16">
          {/* =====================================================
              LEFT SIDE
          ====================================================== */}
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 sm:text-sm">
              For job seekers
            </p>

            {/* Main heading */}
            <h1
              className="
                mt-3
                max-w-2xl
                font-serif
                text-[2.6rem]
                font-medium
                leading-[1.05]
                tracking-tight
                text-zinc-950
                sm:text-5xl
                md:text-6xl
                lg:text-[4rem]
                xl:text-[4.35rem]
                dark:text-white
              "
            >
              Find the job.
              <br />
              <span className="text-zinc-500 dark:text-zinc-500">
                Build the career.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-600 sm:mt-6 sm:text-base sm:leading-7 dark:text-zinc-400">
              One profile, built once. Showcase your skills and discover
              roles that actually match where you want to go next.
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row">
              <Link
                href="/register"
                className="
                  group
                  inline-flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-emerald-600
                  px-5
                  text-xs
                  font-semibold
                  text-white
                  shadow-[0_10px_25px_-12px_rgba(16,185,129,0.45)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-emerald-700
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-600
                  focus-visible:ring-offset-2
                  sm:h-12
                  sm:w-auto
                  sm:px-6
                  sm:text-sm
                  dark:bg-emerald-500
                  dark:text-zinc-950
                  dark:hover:bg-emerald-400
                  dark:focus-visible:ring-offset-zinc-950
                "
              >
                Register Now
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/login"
                className="
                  inline-flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-zinc-200
                  bg-white
                  px-5
                  text-xs
                  font-semibold
                  text-zinc-800
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-emerald-300
                  hover:bg-emerald-50/40
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-600
                  focus-visible:ring-offset-2
                  sm:h-12
                  sm:w-auto
                  sm:px-6
                  sm:text-sm
                  dark:border-white/10
                  dark:bg-white/[0.04]
                  dark:text-zinc-200
                  dark:hover:bg-white/[0.08]
                  dark:focus-visible:ring-offset-zinc-950
                "
              >
                Explore Opportunities
                <ChevronRight size={15} />
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-5 flex flex-col gap-2 text-[11px] font-medium text-zinc-500 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2.5 dark:text-zinc-500">
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Check size={10} />
                </span>
                Candidate-focused platform
              </div>

              <div className="hidden h-3 w-px bg-zinc-300 sm:block dark:bg-zinc-700" />

              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Check size={10} />
                </span>
                One profile for your applications
              </div>
            </div>

            {/* Stats */}
            <div className="mt-7 grid max-w-xl grid-cols-3 border-y border-zinc-200 py-3.5 sm:mt-9 sm:py-4 dark:border-white/10">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`px-2 sm:px-3 ${index !== 0
                      ? "border-l border-zinc-200 dark:border-white/10"
                      : "pl-0"
                    } ${index === stats.length - 1 ? "pr-0" : ""}`}
                >
                  <p className="text-base font-semibold tracking-tight text-zinc-950 sm:text-xl dark:text-white">
                    {stat.value}
                  </p>

                  <p className="mt-0.5 max-w-[110px] text-[11px] leading-4 text-zinc-500 sm:text-xs dark:text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE — CAREER JOURNEY PANEL
          ====================================================== */}
          <div className="relative w-full lg:ml-auto lg:max-w-md xl:max-w-lg">
            <div
              className="
                relative
                w-full
                overflow-hidden
                rounded-[1.35rem]
                border
                border-zinc-200
                bg-white
                p-3.5
                shadow-[0_22px_60px_-30px_rgba(15,23,42,0.3)]
                sm:rounded-[1.75rem]
                sm:p-5
                dark:border-white/10
                dark:bg-zinc-900
                dark:shadow-black/30
              "
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-zinc-400 sm:text-[11px]">
                    Your path
                  </p>

                  <h2 className="mt-1 text-base font-semibold tracking-tight text-zinc-950 sm:text-xl dark:text-white">
                    From profile to offer
                  </h2>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Check size={14} />
                </div>
              </div>

              {/* Journey steps */}
              <ol className="mt-5 sm:mt-6">
                {journey.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === 0;
                  const isLast = index === journey.length - 1;

                  return (
                    <li key={step.title} className="relative flex gap-3.5">
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-zinc-200 dark:bg-white/10"
                        />
                      )}

                      <span
                        className={`relative z-10 mb-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${isActive
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-zinc-200 bg-white text-zinc-400 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-500"
                          }`}
                      >
                        {isActive ? <Icon size={14} /> : index + 1}
                      </span>

                      <div className="min-w-0 pb-5">
                        <p className="text-xs font-semibold text-zinc-950 sm:text-sm dark:text-white">
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-4 text-zinc-500 sm:text-xs dark:text-zinc-400">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* CTA */}
              <Link
                href="/register"
                className="
                  group
                  flex
                  min-h-10
                  w-full
                  items-center
                  justify-between
                  gap-2
                  rounded-xl
                  bg-zinc-950
                  px-3
                  text-[11px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-zinc-800
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-600
                  focus-visible:ring-offset-2
                  sm:min-h-11
                  sm:px-3.5
                  sm:text-xs
                  dark:bg-white
                  dark:text-zinc-950
                  dark:hover:bg-zinc-200
                  dark:focus-visible:ring-offset-zinc-900
                "
              >
                <span className="truncate">Start your profile</span>

                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white transition-transform duration-300 group-hover:translate-x-0.5 sm:h-7 sm:w-7">
                  <ArrowRight size={12} />
                </span>
              </Link>
            </div>

            {/* Decorative glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-28 w-28 rounded-full bg-emerald-100/50 blur-3xl sm:h-36 sm:w-36 dark:bg-emerald-500/5"
            />
          </div>
        </div>

        {/* Bottom transition */}
        <div className="mt-9 flex items-center justify-center gap-2 text-center text-[10px] text-zinc-400 sm:mt-12 sm:gap-3 sm:text-xs dark:text-zinc-600">
          <span className="h-px w-5 bg-zinc-200 sm:w-8 dark:bg-zinc-800" />
          <span>Your next opportunity starts here</span>
          <span className="h-px w-5 bg-zinc-200 sm:w-8 dark:bg-zinc-800" />
        </div>
      </div>
    </section>
  );
}