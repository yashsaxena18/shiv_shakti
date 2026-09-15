const companies = [
  "Mahindra & Mahindra",
  "Hero MotoCorp",
  "Denso India",
  "Rockman Industries",
  "Sharda Motor Industries",
  "Satyam Auto Components",
  "FCC",
  "Haridwar Precision Auto",
  "Victora Technologies",
  "Makino Automotive",
  "Nipman Fastener Industries",
  "Lumax Industries",
];

const moreCompanies = [
  "Shivam Autotech",
  "Spark Minda",
  "Bajajsons",
  "Speedcrafts",
  "Neel Metal Products",
  "Steelwell Engineering",
  "Uno Minda",
  "Bosch India",
  "Munjal Showa",
  "Kay Automotive",
  "Takshi Auto Components",
  "Alf Engineering",
  "Minda",
  "Jai Shri Polymers",
  "Kalpa Industries",
  "Kirat International",
];

const locations = [
  "Haridwar",
  "SIDCUL",
  "Noida",
  "Bahadrabad",
  "Pantnagar",
  "Gurugram",
  "Manesar",
  "Greater Noida",
  "Pune",
  "Chennai",
  "Bengaluru",
  "Nashik",
  "Pithampur",
  "Sanand",
  "Hosur",
  "Gujarat",
];

export default function CompaniesSection() {
  /*
   * Duplicate the data so the second copy follows the first
   * and the animation can continuously move across the screen.
   */
  const companyTicker = [...moreCompanies, ...moreCompanies];
  const locationTicker = [...locations, ...locations];

  return (
    <section
      id="companies"
      className="
        relative
        overflow-hidden
        border-b
        border-zinc-200
        bg-white
        py-16
        dark:border-zinc-800
        dark:bg-zinc-950
        sm:py-20
        lg:py-24
      "
    >
      {/* =====================================================
          MARQUEE ANIMATION
         ===================================================== */}

      <style>
        {`
          @keyframes companiesMarquee {
            0% {
              transform: translate3d(0, 0, 0);
            }

            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }

          @keyframes locationsMarquee {
            0% {
              transform: translate3d(-50%, 0, 0);
            }

            100% {
              transform: translate3d(0, 0, 0);
            }
          }

          .companies-marquee {
            animation: companiesMarquee 35s linear infinite;
            will-change: transform;
          }

          .locations-marquee {
            animation: locationsMarquee 40s linear infinite;
            will-change: transform;
          }

          .companies-marquee:hover,
          .locations-marquee:hover {
            animation-play-state: paused;
          }

          @media (max-width: 639px) {
            .companies-marquee {
              animation-duration: 24s;
            }

            .locations-marquee {
              animation-duration: 28s;
            }
          }

          @media (max-width: 380px) {
            .companies-marquee {
              animation-duration: 21s;
            }

            .locations-marquee {
              animation-duration: 25s;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .companies-marquee,
            .locations-marquee {
              animation: none;
            }
          }
        `}
      </style>

      {/* =====================================================
          BACKGROUND GRID
         ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            MAIN HEADING
           ===================================================== */}

        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-black
              bg-white
              px-3
              py-1.5
              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            "
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black" />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-black
                sm:text-xs
              "
            >
              Pan India Recruitment Network
            </span>
          </div>

          {/* Main heading */}

          <h2
            className="
              text-2xl
              font-bold
              leading-tight
              tracking-tight
              text-zinc-750
              sm:text-3xl
              lg:text-4xl
              xl:text-5xl
              dark:text-white
            "
          >
            A Network of

            <span className="block">
              <span className="mr-2">100+</span>
              Companies Across India
            </span>
          </h2>
        </div>

        {/* =====================================================
            FEATURED COMPANIES
           ===================================================== */}

        <div className="mt-10 sm:mt-12">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-zinc-500
                "
              >
                Featured Companies
              </p>

              <p className="mt-1 text-[10px] text-zinc-400 sm:text-xs">
                A glimpse of our wider recruitment network
              </p>
            </div>

            <div
              className="
                hidden
                rounded-full
                border
                border-black
                px-3
                py-1
                text-[10px]
                font-bold
                text-black
                sm:block
              "
            >
              100+ Network
            </div>
          </div>

          {/* Company cards */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              sm:gap-4
              lg:grid-cols-4
            "
          >
            {companies.map((company, index) => (
              <div
                key={company}
                className="
                  group
                  relative
                  min-h-[100px]
                  overflow-hidden
                  rounded-xl
                  border-2
                  border-black
                  bg-white
                  p-4
                  shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                  sm:min-h-[115px]
                  sm:p-5
                "
              >
                {/* Number */}

                <span
                  className="
                    absolute
                    right-3
                    top-3
                    text-[9px]
                    font-bold
                    tracking-wider
                    text-zinc-300
                    sm:right-4
                    sm:top-4
                    sm:text-[10px]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Company initial */}

                <div
                  className="
                    mb-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-black
                    text-sm
                    font-bold
                    text-white
                    transition-transform
                    duration-300
                    group-hover:scale-110
                    sm:h-10
                    sm:w-10
                  "
                >
                  {company.charAt(0)}
                </div>

                {/* Company name */}

                <h3
                  className="
                    pr-5
                    text-sm
                    font-bold
                    leading-5
                    text-black
                    sm:text-[15px]
                  "
                >
                  {company}
                </h3>

                {/* Hover line */}

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
                  "
                />
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            MORE COMPANIES MARQUEE
           ===================================================== */}

        <div className="mt-10 sm:mt-12">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200" />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-zinc-400
                sm:text-[10px]
              "
            >
              Part of a Larger Network
            </span>

            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          {/* Marquee viewport */}

          <div
            className="
              relative
              overflow-hidden
              rounded-xl
              border-y-2
              border-black
              bg-black
              py-4
              touch-pan-x
            "
          >
            {/* Left fade */}

            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                z-10
                h-full
                w-10
                bg-gradient-to-r
                from-black
                to-transparent
                sm:w-24
              "
            />

            {/* Right fade */}

            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                z-10
                h-full
                w-10
                bg-gradient-to-l
                from-black
                to-transparent
                sm:w-24
              "
            />

            {/* Moving companies */}

            <div
              className="
                companies-marquee
                flex
                w-max
                select-none
              "
            >
              {companyTicker.map((company, index) => (
                <div
                  key={`${company}-${index}`}
                  className="flex items-center"
                >
                  <span
                    className="
                      whitespace-nowrap
                      px-4
                      text-xs
                      font-semibold
                      text-white
                      sm:px-6
                      sm:text-sm
                    "
                  >
                    {company}
                  </span>

                  <span className="h-1 w-1 shrink-0 rounded-full bg-white/50" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            LOCATION MARQUEE
           ===================================================== */}

        <div className="mt-8 sm:mt-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200" />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-zinc-400
                sm:text-[10px]
              "
            >
              Locations Across India
            </span>

            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          {/* Location marquee viewport */}

          <div
            className="
              relative
              overflow-hidden
              rounded-xl
              border
              border-zinc-300
              bg-zinc-50
              py-4
              touch-pan-x
              dark:border-zinc-800
              dark:bg-zinc-900
            "
          >
            {/* Left fade */}

            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                z-10
                h-full
                w-10
                bg-gradient-to-r
                from-zinc-50
                to-transparent
                sm:w-24
                dark:from-zinc-900
              "
            />

            {/* Right fade */}

            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                z-10
                h-full
                w-10
                bg-gradient-to-l
                from-zinc-50
                to-transparent
                sm:w-24
                dark:from-zinc-900
              "
            />

            {/* Moving locations */}

            <div
              className="
                locations-marquee
                flex
                w-max
                select-none
              "
            >
              {locationTicker.map((location, index) => (
                <div
                  key={`${location}-${index}`}
                  className="flex items-center"
                >
                  <span
                    className="
                      mx-2
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-black
                      sm:mx-3
                      dark:bg-white
                    "
                  />

                  <span
                    className="
                      whitespace-nowrap
                      text-xs
                      font-semibold
                      text-zinc-800
                      sm:text-sm
                      dark:text-zinc-200
                    "
                  >
                    {location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            DISCLAIMER
           ===================================================== */}

        <div className="mx-auto mt-7 max-w-3xl text-center">
          <p
            className="
              text-[10px]
              leading-5
              text-zinc-500
              sm:text-xs
            "
          >
            Listing a company does not imply that it is currently
            hiring through Shiv Shakti Multi Service.
          </p>
        </div>
      </div>
    </section>
  );
}