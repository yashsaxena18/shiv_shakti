"use client";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { CheckCircle2, Crown, MessageCircle } from "lucide-react";

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <DashboardNav />

      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-3xl bg-zinc-950 p-10 text-white">

          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold">
              Shiv Shakti Multi Service Premium
            </h1>
          </div>

          <p className="mt-4 max-w-2xl text-zinc-300">
            Get premium recruitment support and receive verified job
            opportunities directly from our consultants.
          </p>

        </div>

        <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Premium Benefits
          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              Daily verified job openings
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              Direct HR referrals
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              Interview preparation guidance
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              Resume review support
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" />
              Priority placement assistance
            </div>

          </div>

          <div className="mt-10 rounded-2xl bg-zinc-100 p-6">

            <p className="text-sm text-zinc-500">
              Membership Fee
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              ₹499
            </h3>

            <p className="mt-2 text-zinc-600">
              Lifetime Access
            </p>

          </div>

          <a
            href="https://chat.whatsapp.com/YOUR_LINK"
            target="_blank"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
          >
            <MessageCircle size={20} />
            Join WhatsApp Community
          </a>

        </div>

      </main>
    </div>
  );
}
