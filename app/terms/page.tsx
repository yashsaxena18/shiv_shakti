"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Mail, MessageCircle, ShieldCheck, Languages } from "lucide-react";

const termsData = {
  en: {
    title: "Terms & Conditions",
    subtitle: "Candidate Terms",
    description: "Please read these terms carefully before registering with Shiv Shakti Multi Service. They explain the candidate registration process, interview opportunities, communication and candidate responsibilities.",
    tags: ["Starts at ₹499 (Non-Refundable)", "Candidate Process", "Updated September 2026"],
    questions: "Questions about these terms?",
    contactDesc: "If you need clarification about the candidate registration or interview process, contact Shiv Shakti Multi Service before proceeding.",
    terms: [
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
        title: "Registration Fee (Non-Refundable)",
        text: "Registration fees start at ₹499 (non-refundable). The exact fee depends upon the role or job you apply for or get. This fee relates to the candidate registration, assessment, and profile process and does not constitute payment for guaranteed employment.",
      },
      {
        number: "11",
        title: "First Salary Deduction (Placement Fee)",
        text: "If the candidate is successfully placed and receives a monthly salary of ₹15,000 or above, 50% of the first month's salary must be paid to Shiv Shakti Multi Service as a placement fee.",
      },
      {
        number: "12",
        title: "Changes to Opportunities",
        text: "Interview dates, times, locations, roles and vacancy availability may change because of employer requirements or other circumstances. Candidates should check their dashboard and communication channels for the latest information.",
      },
      {
        number: "13",
        title: "Acceptance of Terms",
        text: "By registering with Shiv Shakti Multi Service, the candidate confirms that they have read and understood these Terms & Conditions and agree to follow the candidate responsibilities described above.",
      },
    ]
  },
  hi: {
    title: "नियम और शर्तें",
    subtitle: "उम्मीदवार शर्तें",
    description: "शिव शक्ति मल्टी सर्विस के साथ पंजीकरण करने से पहले कृपया इन शर्तों को ध्यान से पढ़ें। इनमें पंजीकरण प्रक्रिया, साक्षात्कार के अवसर, संचार और उम्मीदवार की जिम्मेदारियां समझाई गई हैं।",
    tags: ["₹499 से शुरू (नॉन-रिफंडेबल)", "पंजीकरण प्रक्रिया", "सितंबर 2026 में अपडेट किया गया"],
    questions: "इन शर्तों के बारे में कोई सवाल है?",
    contactDesc: "यदि आपको उम्मीदवार पंजीकरण या साक्षात्कार प्रक्रिया के बारे में स्पष्टीकरण चाहिए, तो आगे बढ़ने से पहले शिव शक्ति मल्टी सर्विस से संपर्क करें।",
    terms: [
      {
        number: "01",
        title: "उम्मीदवार पंजीकरण",
        text: "केवल वे उम्मीदवार जिन्होंने शिव शक्ति मल्टी सर्विस के साथ पंजीकरण प्रक्रिया सफलतापूर्वक पूरी कर ली है, वे साक्षात्कार के अवसरों और नौकरी से संबंधित सहायता के लिए पात्र हैं।",
      },
      {
        number: "02",
        title: "साक्षात्कार के अवसर",
        text: "योग्य पंजीकृत उम्मीदवारों को उनकी नौकरी की रुचियों, कौशल, अनुभव, स्थान प्राथमिकताओं और पात्रता के आधार पर कम से कम दो साक्षात्कार के अवसर मिल सकते हैं (रिक्तियों की उपलब्धता के अधीन)।",
      },
      {
        number: "03",
        title: "साक्षात्कार अनुसूची",
        text: "जब साक्षात्कार का अवसर उपलब्ध होगा, तो उम्मीदवार को साक्षात्कार की तिथि, समय, स्थान, कंपनी या भूमिका का विवरण और अन्य निर्देश प्राप्त होंगे। यह जानकारी उम्मीदवार डैशबोर्ड पर भी उपलब्ध हो सकती है।",
      },
      {
        number: "04",
        title: "उम्मीदवार की जिम्मेदारी",
        text: "उम्मीदवारों की जिम्मेदारी है कि वे अपना डैशबोर्ड, ईमेल और व्हाट्सएप संदेश नियमित रूप से देखें, सही समय पर निर्दिष्ट स्थान पर पहुँचें, आवश्यक दस्तावेज साथ रखें, और अपनी संपर्क जानकारी सही रखें।",
      },
      {
        number: "05",
        title: "साक्षात्कार छूटना और पुनर्निर्धारण",
        text: "जहाँ संभव हो, साक्षात्कार के पुनर्निर्धारण (Reschedule) के अवसर प्रदान किए जाएंगे। यदि कोई उम्मीदवार लगभग 2-3 प्रयासों के बाद भी बार-बार साक्षात्कार में शामिल होने में विफल रहता है, तो शिव शक्ति मल्टी सर्विस आगे की सहायता बंद कर सकती है।",
      },
      {
        number: "06",
        title: "रोजगार की कोई गारंटी नहीं",
        text: "पंजीकरण किसी नौकरी, साक्षात्कार चयन, वेतन, या किसी विशेष कंपनी में रोजगार की गारंटी नहीं देता है। अंतिम चयन पूरी तरह से नियोक्ता (कंपनी) की आवश्यकताओं पर निर्भर करता है।",
      },
      {
        number: "07",
        title: "रिक्ति की उपलब्धता",
        text: "नियोक्ता की आवश्यकताओं के अनुसार नौकरी की रिक्तियां कभी भी बढ़, घट या बदल सकती हैं। उपयुक्त रिक्ति उपलब्ध होने पर योग्य उम्मीदवारों को तुरंत सूचित किया जाएगा।",
      },
      {
        number: "08",
        title: "संचार (Communication)",
        text: "भर्ती से संबंधित सभी जानकारी उम्मीदवार डैशबोर्ड, ईमेल या व्हाट्सएप के माध्यम से दी जाएगी। उम्मीदवारों को इन्हें नियमित रूप से जांचते रहना चाहिए।",
      },
      {
        number: "09",
        title: "उम्मीदवार की जानकारी",
        text: "पंजीकरण के दौरान उम्मीदवारों को सटीक और वास्तविक जानकारी प्रदान करनी चाहिए। झूठी या अधूरी जानकारी देने पर साक्षात्कार के अवसर रद्द किए जा सकते हैं।",
      },
      {
        number: "10",
        title: "पंजीकरण शुल्क (नॉन-रिफंडेबल)",
        text: "पंजीकरण शुल्क ₹499 (नॉन-रिफंडेबल) से शुरू होता है। वास्तविक शुल्क उस भूमिका या नौकरी पर निर्भर करता है जिसके लिए आप आवेदन कर रहे हैं या जो आपको मिलती है। यह शुल्क केवल प्रोफाइल प्रक्रिया के लिए है और नौकरी की गारंटी का भुगतान नहीं है।",
      },
      {
        number: "11",
        title: "पहले वेतन से कटौती (नया नियम)",
        text: "यदि उम्मीदवार को नौकरी मिल जाती है और उसका मासिक वेतन ₹15,000 या उससे अधिक है, तो उसे पहले महीने के वेतन का 50% हिस्सा शिव शक्ति मल्टी सर्विस को प्लेसमेंट शुल्क के रूप में देना होगा।",
      },
      {
        number: "12",
        title: "अवसरों में बदलाव",
        text: "नियोक्ता की आवश्यकताओं या अन्य परिस्थितियों के कारण साक्षात्कार की तिथियां, समय, स्थान और रिक्तियां बदल सकती हैं। नवीनतम जानकारी के लिए अपना डैशबोर्ड देखते रहें।",
      },
      {
        number: "13",
        title: "शर्तों की स्वीकृति",
        text: "शिव शक्ति मल्टी सर्विस के साथ पंजीकरण करके, उम्मीदवार यह पुष्टि करता है कि उसने इन नियमों और शर्तों को पढ़ और समझ लिया है और इनका पालन करने के लिए सहमत है।",
      },
    ]
  }
};

export default function TermsPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const t = termsData[lang];

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:text-black dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-white">
            <ArrowLeft size={14} />
            {lang === "en" ? "Back to Home" : "होम पर वापस जाएं"}
          </Link>

          <button 
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-zinc-800 dark:border-white/20 dark:bg-zinc-100 dark:text-black dark:hover:bg-white"
          >
            <Languages size={14} />
            {lang === "en" ? "हिंदी में पढ़ें" : "Read in English"}
          </button>
        </div>

        <section className="mt-10 border-b border-zinc-200 pb-10 dark:border-white/10 sm:mt-14 sm:pb-12">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-black">
            <ShieldCheck size={21} />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {t.subtitle}
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base sm:leading-7">
            {t.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {t.tags.map((tag, i) => (
              <span key={i} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="space-y-4 sm:space-y-5">
            {t.terms.map((term) => (
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
                <p className="text-sm font-bold">{t.questions}</p>
              </div>
              <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-400 dark:text-zinc-600">
                {t.contactDesc}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              <a href="mailto:jobshiring.hrteam@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black transition hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-800">
                <Mail size={14} />
                {lang === "en" ? "Email Us" : "ईमेल करें"}
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
              {lang === "en" ? "Home" : "होम"}
            </Link>
            <Link href="/privacy" className="transition hover:text-zinc-950 dark:hover:text-white">
              {lang === "en" ? "Privacy Policy" : "गोपनीयता नीति"}
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}