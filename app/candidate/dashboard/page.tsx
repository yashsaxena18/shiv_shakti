"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { InfoCard } from "@/components/dashboard/info-card";
import { SectionCard } from "@/components/dashboard/section-card";

export default function CandidateDashboardPage() {
  const router = useRouter();

  const [payment, setPayment] = useState<any>(null);
  const [paymentLoading, setPaymentLoading] = useState(true);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      console.log("DASHBOARD: loading started");

      try {
        const userId = localStorage.getItem("userId");

        console.log("DASHBOARD USER ID:", userId);

        if (!userId) {
          console.log("DASHBOARD: userId not found");
          router.push("/login");
          return;
        }

        setAuthorized(true);

        // ========================================
        // 1. LOAD CANDIDATE PROFILE
        // ========================================

        const profileResponse = await fetch(
          `/api/profile?userId=${userId}`
        );

        console.log(
          "DASHBOARD PROFILE STATUS:",
          profileResponse.status
        );

        const profileResult =
          await profileResponse.json();

        console.log(
          "DASHBOARD PROFILE RESPONSE:",
          profileResult
        );

        if (
          profileResponse.ok &&
          profileResult.success
        ) {
          setProfile(profileResult.profile);
        } else {
          console.error(
            "PROFILE LOAD FAILED:",
            profileResult.message
          );

          setProfile(null);
        }

        // ========================================
        // 2. CHECK PAYMENT STATUS
        // ========================================

        const paymentResponse = await fetch(
          `/api/payment/check?userId=${userId}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        console.log(
          "DASHBOARD PAYMENT STATUS:",
          paymentResponse.status
        );

        const paymentResult =
          await paymentResponse.json();

        console.log(
          "DASHBOARD PAYMENT RESPONSE:",
          paymentResult
        );

        if (
          paymentResponse.ok &&
          paymentResult.success &&
          paymentResult.paid
        ) {
          // Payment successful
          setPayment(paymentResult.payment);
        } else {
          // Payment not completed
          setPayment(null);
        }
      } catch (error) {
        console.error(
          "DASHBOARD LOAD ERROR:",
          error
        );

        setPayment(null);
      } finally {
        setLoading(false);
        setPaymentLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  // ========================================
  // LOADING
  // ========================================

  if (
    loading ||
    !authorized ||
    paymentLoading
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );
  }

  const fullName =
    profile?.user?.fullName || "Candidate";

  const jobField =
    profile?.preferredJobField || "Not Added";

  const profileStatus =
    profile?.user?.profileCompleted
      ? "Completed"
      : "Incomplete";

  return (
    <div className="min-h-screen bg-zinc-50">
      <DashboardNav />

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* ========================================
            PAYMENT SUCCESS MESSAGE
        ======================================== */}

        {payment?.status === "SUCCESS" && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">

            <div className="flex items-start gap-3">

              {/* Check Icon */}
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                ✓
              </div>

              <div className="min-w-0">

                <p className="font-semibold text-emerald-800">
                  Payment Successful
                </p>

                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  Your registration payment has been
                  successfully verified. Please check
                  your registered email for the payment
                  receipt.
                </p>

                {/* Receipt Number */}
                {payment.receiptNumber && (
                  <div className="mt-3 inline-flex items-center rounded-lg border border-emerald-200 bg-white px-3 py-2">
                    <span className="text-xs font-medium text-zinc-500">
                      Receipt No.
                    </span>

                    <span className="ml-2 text-sm font-semibold text-zinc-900">
                      {payment.receiptNumber}
                    </span>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* ========================================
            WELCOME SECTION
        ======================================== */}

        <SectionCard className="bg-zinc-950 text-white">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest">

                <Sparkles size={14} />

                Candidate Portal

              </div>

              <h1 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                Welcome back, {fullName} 👋
              </h1>

              <p className="mt-3 text-zinc-300">
                Manage your profile and track your
                recruitment progress.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-5">

              <p className="text-sm">
                Profile Status
              </p>

              <p className="mt-2 text-xl font-bold sm:text-2xl">
                {profileStatus}
              </p>

            </div>

          </div>

        </SectionCard>

        {/* ========================================
            INFO CARDS
        ======================================== */}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <InfoCard
            label="Preferred Job Field"
            value={jobField}
          />

          <InfoCard
            label="City"
            value={profile?.city || "Not Added"}
          />

          <InfoCard
            label="State"
            value={profile?.state || "Not Added"}
          />

        </div>

        {/* ========================================
            MAIN DASHBOARD
        ======================================== */}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* ========================================
              PROFILE OVERVIEW
          ======================================== */}

          <SectionCard
            title="Profile Overview"
            description={
              <>
                Your information saved in Shiv Shakti
                Multi Service.
              </>
            }
          >

            <div className="space-y-4">

              {/* Full Name */}

              <div className="flex items-center gap-3 rounded-xl border p-4">

                <UserRound className="h-5 w-5 text-zinc-600" />

                <div>

                  <p className="text-sm text-zinc-500">
                    Full Name
                  </p>

                  <p className="font-semibold">
                    {fullName}
                  </p>

                </div>

              </div>

              {/* Skills */}

              <div className="flex items-center gap-3 rounded-xl border p-4">

                <BriefcaseBusiness className="h-5 w-5 text-zinc-600" />

                <div>

                  <p className="text-sm text-zinc-500">
                    Skills
                  </p>

                  <p className="font-semibold">
                    {profile?.skills || "Not Added"}
                  </p>

                </div>

              </div>

              {/* Qualification */}

              <div className="flex items-center gap-3 rounded-xl border p-4">

                <ShieldCheck className="h-5 w-5 text-zinc-600" />

                <div>

                  <p className="text-sm text-zinc-500">
                    Qualification
                  </p>

                  <p className="font-semibold">
                    {profile?.highestQualification ||
                      "Not Added"}
                  </p>

                </div>

              </div>

              {/* Experience */}

              <div className="flex items-center gap-3 rounded-xl border p-4">

                <BriefcaseBusiness className="h-5 w-5 text-zinc-600" />

                <div>

                  <p className="text-sm text-zinc-500">
                    Experience
                  </p>

                  <p className="font-semibold">
                    {profile?.experience ||
                      "Not Added"}
                  </p>

                </div>

              </div>

              {/* Preferred Job Field */}

              <div className="flex items-center gap-3 rounded-xl border p-4">

                <BriefcaseBusiness className="h-5 w-5 text-zinc-600" />

                <div>

                  <p className="text-sm text-zinc-500">
                    Preferred Job Field
                  </p>

                  <p className="font-semibold">
                    {profile?.preferredJobField ||
                      "Not Added"}
                  </p>

                </div>

              </div>

              {/* Location */}

              <div className="flex items-center gap-3 rounded-xl border p-4">

                <UserRound className="h-5 w-5 text-zinc-600" />

                <div>

                  <p className="text-sm text-zinc-500">
                    Location
                  </p>

                  <p className="font-semibold">
                    {profile?.city || "Not Added"},{" "}
                    {profile?.state || "Not Added"}
                  </p>

                </div>

              </div>

            </div>

          </SectionCard>

          {/* ========================================
              QUICK ACTIONS
          ======================================== */}

          <SectionCard
            title="Quick Actions"
            description={
              <>
                Manage your Shiv Shakti Multi Service
                account.
              </>
            }
          >

            <div className="space-y-4">

              <button
                onClick={() =>
                  router.push(
                    "/candidate/profile"
                  )
                }
                className="flex w-full items-center justify-between rounded-xl border p-4 transition hover:bg-zinc-100"
              >

                <div className="text-left">

                  <p className="font-semibold">
                    Edit Profile
                  </p>

                  <p className="text-sm text-zinc-500">
                    Update your profile information
                  </p>

                </div>

                <ArrowRight />

              </button>

            </div>

          </SectionCard>

        </div>

      </main>
    </div>
  );
}