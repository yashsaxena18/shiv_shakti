import { StepCard } from "@/components/step-card";

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    description:
      "Register with your basic details and create your candidate account in just a few simple steps.",
  },
  {
    step: "02",
    title: "Build Your Profile",
    description:
      "Add your education, skills, experience and career preferences to create a strong candidate profile.",
  },
  {
    step: "03",
    title: "Explore Opportunities",
    description:
      "Discover career opportunities and explore roles that match your profile, skills and preferred location.",
  },
  {
    step: "04",
    title: "Take The Next Step",
    description:
      "Stay prepared, follow the recruitment process and move forward toward your next career opportunity.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="
        border-y
        border-black
        bg-zinc-50
        py-16
        sm:py-20
        lg:py-24
        dark:border-white
        dark:bg-zinc-900/40
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION HEADING
        ====================================================== */}

        <div className="mx-auto max-w-2xl text-center">
          <p
            className="
              mb-3
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-zinc-500
              dark:text-zinc-400
            "
          >
            Simple Process
          </p>

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-zinc-950
              sm:text-4xl
              lg:text-5xl
              dark:text-white
            "
          >
            Your journey starts here.
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-6
              text-zinc-600
              sm:text-base
              sm:leading-7
              dark:text-zinc-400
            "
          >
            From registration to exploring career opportunities, we keep the
            process simple, clear and focused on your career.
          </p>
        </div>

        {/* =====================================================
            STEPS
            2 × 2 ON MOBILE
            4 ACROSS ON DESKTOP
        ====================================================== */}

        <div
          className="
            mt-10
            grid
            grid-cols-2
            gap-4
            sm:mt-12
            lg:grid-cols-4
            lg:gap-5
          "
        >
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl"
            >
              <StepCard
                step={item.step}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>

        {/* =====================================================
            BOTTOM NOTE
        ====================================================== */}

        <div className="mx-auto mt-8 max-w-2xl text-center sm:mt-10">
          <p
            className="
              text-xs
              leading-5
              text-zinc-500
              sm:text-sm
              dark:text-zinc-400
            "
          >
            A straightforward candidate-first process designed to help you
            present yourself professionally and discover your next opportunity.
          </p>
        </div>
      </div>
    </section>
  );
}