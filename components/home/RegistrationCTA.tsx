import Link from "next/link";

export default function RegistrationCTA() {
  return (
    <section
      id="register"
      className="relative overflow-hidden border-y border-black bg-black py-16 sm:py-20 lg:py-24"
    >
      {/* =====================================================
          BACKGROUND
         ===================================================== */}

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative circles */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full border border-white/10"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full border border-white/10"
        aria-hidden="true"
      />

      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            MAIN CARD
           ===================================================== */}

        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] sm:p-10 lg:p-14">
          {/* Top label */}
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
              →
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Start Your Career Journey
            </span>
          </div>

          {/* =====================================================
              CONTENT
             ===================================================== */}

          <div className="mt-7">
            <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
              Your next opportunity could start with one profile.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
              Create your candidate profile with Shiv Shakti Multi Service and
              take the next step toward opportunities that match your career
              preferences.
            </p>
          </div>

          {/* =====================================================
              FEE + VALUE
             ===================================================== */}

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-[auto_1fr] sm:items-stretch">
            {/* Fee card */}
            <div
              className="
                flex
                items-center
                gap-4
                rounded-xl
                border-2
                border-black
                bg-black
                px-5
                py-4
                text-white
                shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                sm:min-w-[220px]
                sm:flex-col
                sm:items-start
                sm:justify-center
              "
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                  Registration Fee
                </p>

                <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                  Starts at ₹499
                </p>
              </div>

              <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-300">
                One Time
              </span>
            </div>

            {/* Value proposition */}
            <div className="rounded-xl border-2 border-black bg-zinc-50 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                What You Get
              </p>

              <div className="mt-4 flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                  ✓
                </span>

                <div>
                  <h3 className="text-sm font-bold text-black sm:text-base">
                    One-time registration
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">
                    Register once and get access to job opportunities based on
                    your career preferences, skills and preferred locations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              KEY BENEFITS
             ===================================================== */}

          <div className="mt-8 border-t border-zinc-200 pt-6">
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              {/* Benefit 1 */}
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  ✓
                </span>

                <div>
                  <p className="text-xs font-bold text-black">
                    Career Preferences
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-zinc-500">
                    Share the roles and locations you prefer.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  ✓
                </span>

                <div>
                  <p className="text-xs font-bold text-black">
                    Professional Profile
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-zinc-500">
                    Present your education, skills and experience clearly.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  ✓
                </span>

                <div>
                  <p className="text-xs font-bold text-black">
                    Job Opportunities 
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-zinc-500">
                    Stay connected throughout your recruitment journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              CTA BUTTONS
             ===================================================== */}

          <div className="mt-8 flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row">
            <Link
              href="/register"
              className="
                inline-flex
                min-h-12
                flex-1
                items-center
                justify-center
                rounded-xl
                border-2
                border-black
                bg-black
                px-6
                text-sm
                font-bold
                text-white
                transition-all
                duration-200
                hover:bg-zinc-800
                active:scale-[0.99]
                sm:flex-none
                sm:min-w-[180px]
              "
            >
              Register Now
              <span className="ml-2">→</span>
            </Link>

            <Link
              href="/login"
              className="
                inline-flex
                min-h-12
                flex-1
                items-center
                justify-center
                rounded-xl
                border-2
                border-black
                bg-white
                px-6
                text-sm
                font-bold
                text-black
                transition-all
                duration-200
                hover:bg-zinc-100
                active:bg-zinc-200
                sm:flex-none
                sm:min-w-[180px]
              "
            >
              Already Registered?
            </Link>
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center text-[10px] font-bold leading-5 text-amber-400 sm:text-xs">
          Starts at ₹499 (non-refundable) is the candidate registration fee. Registration does not
          guarantee employment or selection for a particular opportunity.
        </p>
      </div>
    </section>
  );
}