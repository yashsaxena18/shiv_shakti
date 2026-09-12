"use client";

import Link from "next/link";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

interface JobCardProps {
  company: string;

  location: string;
  type: string;
}

export default function JobCard({
  company,
  location,
  type,
}: JobCardProps) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">

      {/* Company Initial */}
      <div className="flex items-center justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100 text-xl font-bold text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white">
          {company.charAt(0)}
        </div>

        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {type}
        </span>

      </div>

      {/* Position
      <h3 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-white">
        {position}
      </h3> */}

      {/* Company */}
      <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {company}
      </p>

      {/* Location */}
      <div className="mt-5 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <MapPin size={16} />
        <span>{location}</span>
      </div>

      {/* Type */}
      <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Briefcase size={16} />
        <span>{type}</span>
      </div>

      {/* Button */}
      <div className="mt-auto pt-8">

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-300 hover:bg-zinc-200 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
        >
          Apply Now
          <ArrowRight size={16} />
        </Link>

      </div>

    </div>
  );
}