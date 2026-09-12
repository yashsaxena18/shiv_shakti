"use client";

import Link from "next/link";
import { SiteNavbar } from "@/components/site-navbar";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-950 transition-colors duration-200 dark:bg-[#0f0f10] dark:text-zinc-50">
      <SiteNavbar />
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-300">
              Admin login
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Admin access is ready.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              This temporary frontend route is now wired up so the admin login button lands on the requested destination.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/admin/dashboard"
                className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Open admin dashboard
              </Link>
              <Link
                href="/"
                className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-white dark:hover:text-white"
              >
                Back home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
