import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import HowItWorks from "@/components/home/HowItWorks";
import { HeroSection } from "@/components/hero-section";
import RegistrationCTA from "@/components/home/RegistrationCTA";
import WhyCandidatesChooseUs from "@/components/home/WhyCandidatesChooseUs";
import CompaniesSection from "@/components/home/CompaniesSection";
import ContactSection from "@/components/home/ContactSection";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

export default function Home() {
  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        bg-white
        text-zinc-950
        transition-colors
        duration-200
        dark:bg-[#0f0f10]
        dark:text-zinc-50
      "
    >
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <SiteNavbar />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="flex-1">
        {/* ===================================================
            HERO
        ==================================================== */}

        <HeroSection />

        {/* ===================================================
            FEATURED OPPORTUNITIES
        ==================================================== */}

        <FeaturedJobs />

        {/* ===================================================
            HOW IT WORKS
        ==================================================== */}

        <HowItWorks />

        {/* ===================================================
            COMPANIES
        ==================================================== */}

        <CompaniesSection />

        {/* ===================================================
            REGISTRATION CTA
            + ₹499 ONE-TIME REGISTRATION
        ==================================================== */}

        <RegistrationCTA />


        {/* ===================================================
            OUR CANDIDATES
            + BENEFITS
        ==================================================== */}

        <WhyCandidatesChooseUs />

        {/* ===================================================
            CONTACT
        ==================================================== */}

        <ContactSection />
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <SiteFooter />
    </div>
  );
}