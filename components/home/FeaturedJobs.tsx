"use client";

import { SectionHeading } from "@/components/section-heading";
import JobCard from "./JobCard";

const jobs = [
  {
    company: "Relaxo Footwear Ltd.",
    
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "Trueware India",
    
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "C&S Electric Ltd.",
    
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "Prince Pipes",
    
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
    
    location: "SIDCUL, Haridwar",
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

export default function FeaturedJobs() {
  return (
    <section
      id="jobs"
      className="border-t border-zinc-200 bg-white px-4 py-20 dark:border-zinc-800 dark:bg-[#0f0f10] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <SectionHeading
          eyebrow="Featured Opportunities"
          title="Latest Jobs From PAN India"
          description="These vacancies are displayed for demonstration purposes. Actual company listings can be managed later from the admin panel."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.map((job) => (
            <JobCard
              key={job.company}
              company={job.company}
              
              location={job.location}
              type={job.type}
            />
          ))}
        </div>

      </div>
    </section>
  );
}