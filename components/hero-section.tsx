import Link from "next/link";

const stats = [
  { value: "12k+", label: "active candidates" },
  { value: "91%", label: "profile completion in 7 days" },
  { value: "4.8/5", label: "candidate satisfaction" },
];

const profileFields = [
  "Personal Details",
  "Education",
  "Skills",
  "Preferred Job Field",
  "Contact Details",
];

export function HeroSection() {
  return (
    <section
  id="home"
  className="flex min-h-[90vh] items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
>
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="mx-auto max-w-2xl space-y-7 lg:mx-0">
          <div className="inline-flex items-center rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300">
            Candidate Registration Portal
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
              Take the next step in your career with a profile built to stand out.
            </h1>
            <p className="max-w-xl text-base leading-8 text-zinc-600 sm:text-lg lg:text-xl dark:text-zinc-300">
              Register in minutes, showcase your experience, and connect with employers who value your background and ambition.
            </p>
          </div>
         
          <div className="w-full rounded-2xl border-2 border-zinc-900 bg-white px-5 py-5 shadow-md dark:border-zinc-200 dark:bg-zinc-900 sm:px-6">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-lg text-white dark:bg-white dark:text-zinc-900">
      ₹
    </div>

    <div>
      <p className="text-base font-bold text-zinc-950 dark:text-white sm:text-lg">
        Candidate Registration Fee
      </p>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
        One-time registration charges for all candidates. 
      </p>
    </div>
  </div>

  <div className="mt-4 grid grid-cols-1 gap-3 ">
    

    <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950">
      

      <p className="mt-1 text-2xl font-bold text-zinc-950 dark:text-white">
        ₹399
      </p>
    </div>
  </div>

  
</div>
          <div className="flex flex-wrap gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300">
                <span className="mr-2 font-semibold text-zinc-950 dark:text-white">{stat.value}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-xl sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/70">
          <div className="mb-6 flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <div>
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Candidate profile</p>
              <p className="text-xl font-semibold text-zinc-950 dark:text-white">Registration preview</p>
            </div>
            <div className="rounded-xl border border-zinc-300 px-3 py-1 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
              Secure
            </div>
          </div>
          <div className="space-y-3">
            {profileFields.map((item) => (
              <div key={item} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/80">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-950 dark:bg-white" />
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{item}</p>
                </div>
                <span className="text-[11px] uppercase tracking-[0.24em] text-zinc-400">Ready</span>
              </div>
            ))}
          </div>
          <Link
            href="/register"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-zinc-900 shadow-lg hover:bg-zinc-800 hover:scale-[1.02] px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
}
