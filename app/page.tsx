import { FeatureCard } from "@/components/feature-card";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import { HeroSection } from "@/components/hero-section";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import { StepCard } from "@/components/step-card";

const features = [
  {
    index: "01",
    title: "A profile that performs",
    description:
      "Present your background, certifications, and strengths in a structured format that recruiters can review quickly.",
  },
  {
    index: "02",
    title: "Built for serious opportunities",
    description:
      "Connect with employers across operations, technology, finance, and creative fields with a professional first impression.",
  },
  {
    index: "03",
    title: "Faster visibility",
    description:
      "Keep your experience current and receive relevant recommendations aligned with your preferred role type.",
  },
  {
    index: "04",
    title: "A private, polished process",
    description:
      "Manage your registration with confidence, knowing your information remains secure and clearly organized.",
  },
];

const steps = [
  {
    step: "1",
    title: "Create your account",
    description: "Start with your contact details, professional background, and preferred job field.",
  },
  {
    step: "2",
    title: "Complete your profile",
    description: "Add your education, skills, certifications, and experience to build a complete candidate record.",
  },
  {
    step: "3",
    title: "Discover aligned roles",
    description: "Receive recommendations and updates tailored to your career goals and industry focus.",
  },
  {
    step: "4",
    title: "Apply with confidence",
    description: "Move from registration to opportunity with a profile that is ready for the right next step.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-950 transition-colors duration-200 dark:bg-[#0f0f10] dark:text-zinc-50">
      <SiteNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedJobs />

        <section
  id="about"
  className="border-t border-zinc-200 bg-zinc-50 px-4 py-24 dark:border-zinc-800 dark:bg-zinc-900/80 sm:px-6 lg:px-8"
>
  <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

    {/* Left */}

    <div>

      <span className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        About <span className="text-orange-300">Shiv Shakti Multi Service</span>
      </span>

      <h2 className="mt-8 text-4xl font-bold leading-tight sm:text-5xl">
        Connecting Talent With
        <br />
        The Right Companies.
      </h2>

      <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        <span className="text-orange-300">Shiv Shakti Multi Service</span> is a modern recruitment consultancy helping
        candidates discover better career opportunities across
        manufacturing, technology, finance, administration and many
        more industries.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">

        <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

          <h3 className="text-3xl font-bold">
            5000+
          </h3>

          <p className="mt-2 text-zinc-500">
            Candidates Registered
          </p>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

          <h3 className="text-3xl font-bold">
            250+
          </h3>

          <p className="mt-2 text-zinc-500">
            Hiring Companies
          </p>

        </div>

      </div>

    </div>

    {/* Right */}

    <div className="grid gap-6 sm:grid-cols-2">

      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          {...feature}
        />
      ))}

    </div>

  </div>
</section>


<section className="border-y border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6 lg:px-8">
  <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    <div>
      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
        Candidate Registration Fee
      </p>

      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        One-time registration fee applicable to all candidates.
      </p>
    </div>

    <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-6">

      <span className="rounded-full bg-zinc-100 px-4 py-2 font-semibold text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        ₹399
      </span>

    </div>

  </div>
</section>

        <section
  id="contact"
  className="border-t border-zinc-200 bg-white px-4 py-24 dark:border-zinc-800 dark:bg-[#0f0f10] sm:px-6 lg:px-8"
>
  <div className="mx-auto max-w-7xl">

    <SectionHeading
      eyebrow="Contact Us"
      title="Let's Help You Find Your Next Opportunity"
      description="Whether you're a job seeker or a hiring company, we're here to help."
    />

    <div className="mt-16 grid gap-10 lg:grid-cols-2">

      {/* Left */}

      <div className="space-y-6">

        <div className="rounded-3xl border bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-xl font-semibold">
            Office Address
          </h3>

          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            SIDCUL Industrial Area,
            <br />
            Haridwar,
            Uttarakhand
          </p>
        </div>

        <div className="rounded-3xl border bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-xl font-semibold">
            Email
          </h3>

          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            jobshiring.hrteam@gmail.com
          </p>
        </div>

        <div className="rounded-3xl border bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-xl font-semibold">
            Phone
          </h3>

          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            +91 7088642658
          </p>
        </div>

        <div className="rounded-3xl border bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-xl font-semibold">
            Working Hours
          </h3>

          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Monday - Saturday
            <br />
            9:30 AM - 6:30 PM
          </p>
        </div>

      </div>

      {/* Right */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

        <h3 className="text-2xl font-semibold">
          Send us a Message
        </h3>

        <div className="mt-8 space-y-5">

          <input
            placeholder="Your Name"
            className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950"
          />

          <input
            placeholder="Email Address"
            className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950"
          />

          <input
            placeholder="Phone Number"
            className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950"
          />

          <textarea
            rows={5}
            placeholder="Your Message"
            className="w-full rounded-xl border border-zinc-300 bg-white p-4 outline-none transition focus:border-black dark:border-zinc-700 dark:bg-zinc-950"
          />

          <button className="w-full rounded-xl bg-black py-4 font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
            Send Message
          </button>

        </div>

      </div>

    </div>

  </div>
</section>
      </main>

      <SiteFooter />
    </div>
  );
}
