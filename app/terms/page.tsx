import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, MessageCircle, ShieldCheck } from "lucide-react";

const terms = [
  {
    number: "01",
    title: "Candidate Registration",
    text: "Only candidates who have successfully completed the registration process with Shiv Shakti Multi Service are eligible to be considered for interview opportunities and job-related assistance.",
  },
  {
    number: "02",
    title: "Interview Opportunities",
    text: "Eligible registered candidates may receive at least two interview opportunities aligned with their stated job interests, skills, experience, location preferences and eligibility, subject to suitable vacancy availability.",
  },
  {
    number: "03",
    title: "Interview Schedule",
    text: "When an interview opportunity is available, the candidate may receive the interview date, time, location, company or role details where applicable, and other relevant instructions. This information may also be available through the candidate dashboard.",
  },
  {
    number: "04",
    title: "Candidate Responsibility",
    text: "Candidates are responsible for checking their dashboard, email and WhatsApp messages regularly, arriving at the specified location on time, carrying required documents, following interview instructions and keeping their contact information accurate.",
  },
  {
    number: "05",
    title: "Missed Interviews & Rescheduling",
    text: "Where possible, reasonable rescheduling opportunities may be provided. If a candidate repeatedly misses or fails to attend scheduled interviews after approximately 2–3 rescheduling attempts, Shiv Shakti Multi Service may discontinue further interview assistance. We will not be responsible for opportunities lost because of repeated absence, late arrival, non-response or failure to follow instructions.",
  },
  {
    number: "06",
    title: "No Guarantee of Employment",
    text: "Registration does not guarantee a job, interview selection, salary, joining or employment with any particular company. Final selection depends on the concerned employer's requirements and recruitment process. Shiv Shakti Multi Service is not responsible if a candidate does not clear an employer's selection process.",
  },
  {
    number: "07",
    title: "Vacancy Availability",
    text: "Job vacancies may increase, decrease, change or become unavailable at any time depending on employer requirements. When a suitable vacancy becomes available, relevant details may be forwarded to eligible candidates at the earliest possible opportunity and may also be shown on the candidate dashboard.",
  },
  {
    number: "08",
    title: "Communication",
    text: "Recruitment-related communication may be provided through the candidate dashboard, email, WhatsApp or other contact details provided during registration. Candidates are responsible for checking these communication channels regularly.",
  },
  {
    number: "09",
    title: "Candidate Information",
    text: "Candidates must provide accurate and genuine information during registration and profile completion. False, misleading or incomplete information may affect eligibility for interview opportunities.",
  },
  {
    number: "10",
    title: "Registration Fee",
    text: "The candidate registration fee is ₹399 as a one-time registration fee, as communicated during the registration process. The fee relates to the candidate registration and profile process and does not constitute payment for guaranteed employment.",
  },
  {
    number: "11",
    title: "Changes to Opportunities",
    text: "Interview dates, times, locations, roles and vacancy availability may change because of employer requirements or other circumstances. Candidates should check their dashboard and communication channels for the latest information.",
  },
  {
    number: "12",
    title: "Acceptance of Terms",
    text: "By registering with Shiv Shakti Multi Service, the candidate confirms that they have read and understood these Terms & Conditions and agree to follow the candidate responsibilities described above.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:text-black dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-white">
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 sm:block">
            Shiv Shakti Multi Service
          </span>
        </div>

        <section className="mt-10 border-b border-zinc-200 pb-10 dark:border-white/10 sm:mt-14 sm:pb-12">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-black">
            <ShieldCheck size={21} />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Candidate Terms
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Terms & Conditions
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base sm:leading-7">
            Please read these terms carefully before registering with Shiv Shakti Multi Service. They explain the candidate registration process, interview opportunities, communication and candidate responsibilities.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400">
              ₹399 One-Time Registration
            </span>
            <span className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400">
              Candidate Process
            </span>
            <span className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400">
              Updated September 2026
            </span>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="space-y-4 sm:space-y-5">
            {terms.map((term) => (
              <article key={term.number} className="group rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20 sm:p-6">
                <div className="flex gap-4 sm:gap-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-bold text-white dark:bg-white dark:text-black">
                    {term.number}
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-base font-bold tracking-tight text-zinc-950 dark:text-white sm:text-lg">
                      {term.title}
                    </h2>
                    <p className="mt-2.5 text-xs leading-6 text-zinc-600 dark:text-zinc-400 sm:text-sm sm:leading-7">
                      {term.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-zinc-950 p-6 text-white sm:p-8 dark:bg-white dark:text-black">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                <p className="text-sm font-bold">Questions about these terms?</p>
              </div>
              <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-400 dark:text-zinc-600">
                If you need clarification about the candidate registration or interview process, contact Shiv Shakti Multi Service before proceeding.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              <a href="mailto:jobshiring.hrteam@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black transition hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-800">
                <Mail size={14} />
                Email Us
              </a>

              <a href="tel:+917088642658" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition hover:bg-white/10 dark:border-black/15 dark:text-zinc-700 dark:hover:bg-black/10">
                <MessageCircle size={14} />
                +91 7088642658
              </a>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-zinc-200 py-6 text-[10px] text-zinc-400 dark:border-white/10 dark:text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Shiv Shakti Multi Service.</p>
          <div className="flex gap-4">
            <Link href="/" className="transition hover:text-zinc-950 dark:hover:text-white">
              Home
            </Link>
            <Link href="/privacy" className="transition hover:text-zinc-950 dark:hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}