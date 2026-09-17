"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  UserRound,
  Calendar,
  CheckCircle2,
  Clock
} from "lucide-react";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { InfoCard } from "@/components/dashboard/info-card";
import { SectionCard } from "@/components/dashboard/section-card";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CandidateDashboardPage() {
  const router = useRouter();

  const [payment, setPayment] = useState<any>(null);
  const [paymentLoading, setPaymentLoading] = useState(true);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          router.push("/login");
          return;
        }

        setAuthorized(true);

        // 1. LOAD CANDIDATE PROFILE
        const profileResponse = await fetch(`/api/profile?userId=${userId}`);
        const profileResult = await profileResponse.json();

        if (profileResponse.ok && profileResult.success) {
          setProfile(profileResult.profile);
        } else {
          setProfile(null);
        }

        // 2. CHECK PAYMENT STATUS
        const paymentResponse = await fetch(`/api/payment/check?userId=${userId}`, {
          method: "GET",
          cache: "no-store",
        });
        const paymentResult = await paymentResponse.json();

        if (paymentResponse.ok && paymentResult.success && paymentResult.paid) {
          setPayment(paymentResult.payment);
        } else {
          setPayment(null);
        }
      } catch (error) {
        console.error("DASHBOARD LOAD ERROR:", error);
        setPayment(null);
      } finally {
        setLoading(false);
        setPaymentLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  // ============================================
  // Payment Integration
  // ============================================
  const handlePayment = async () => {
    setPaymentProcessing(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        router.push("/login");
        return;
      }

      // Create Razorpay Order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
      });
      const orderResult = await orderResponse.json();

      if (!orderResult.success) {
        alert(orderResult.message || "Unable to create payment.");
        setPaymentProcessing(false);
        return;
      }

      const order = orderResult.order;

      // Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Shiv Shakti Multi Service",
        description: "Candidate Registration Fee",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify Payment
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: localStorage.getItem("userId"),
              }),
            });

            const verifyResult = await verifyResponse.json();

            if (!verifyResult.success) {
              alert(verifyResult.message || "Payment verification failed.");
              setPaymentProcessing(false);
              return;
            }

            // Payment Successfully Verified
            alert("Payment successful! Unlocking your dashboard...");
            window.location.reload(); // Reload to fetch updated payment status
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment was completed, but verification failed. Please contact support.");
            setPaymentProcessing(false);
          }
        },
        prefill: {
          name: profile?.user?.fullName || "Candidate",
        },
        theme: {
          color: "#18181b",
        },
        modal: {
          ondismiss: function () {
            setPaymentProcessing(false);
          },
        },
      };

      const Razorpay = window.Razorpay;
      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to start payment. Please try again.");
      setPaymentProcessing(false);
    }
  };


  if (loading || !authorized || paymentLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );
  }

  const fullName = profile?.user?.fullName || "Candidate";
  const jobField = profile?.preferredJobField || "Not Added";
  const profileStatus = profile?.user?.profileCompleted ? "Completed" : "Incomplete";
  const isPaid = payment?.status === "SUCCESS";

  const interviews = profile?.interviews || [];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingInterviews = interviews.filter((int: any) => new Date(int.date) >= today);
  const pastInterviews = interviews.filter((int: any) => new Date(int.date) < today);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <DashboardNav />

      <main className="mx-auto max-w-7xl px-6 py-8">
        
        {/* ========================================
            UNPAID VIEW (PAYMENT WALL)
        ======================================== */}
        {!isPaid && (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white dark:bg-zinc-900 px-6 py-24 text-center shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 mb-6">
              <BriefcaseBusiness className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl text-zinc-900 dark:text-white">Unlock Job Opportunities</h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
              Your profile is complete! To start receiving interview calls and direct HR referrals for <strong className="text-zinc-800 dark:text-zinc-200">{jobField}</strong>, please complete your registration payment.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={handlePayment} 
                disabled={paymentProcessing}
                className="w-full sm:w-auto rounded-xl bg-green-600 px-8 py-4 font-bold text-white text-lg hover:bg-green-700 transition active:scale-95 disabled:opacity-70"
              >
                {paymentProcessing ? "Processing..." : "Pay ₹499 Now"}
              </button>
              
              <Link 
                href="/#contact"
                className="w-full sm:w-auto text-center rounded-xl bg-zinc-900 px-8 py-4 font-bold text-white text-lg hover:bg-zinc-800 transition active:scale-95"
              >
                Have a doubt? Contact Us
              </Link>
            </div>
          </div>
        )}

        {/* ========================================
            PAID VIEW (FULL DASHBOARD)
        ======================================== */}
        {isPaid && (
          <>
            <SectionCard className="bg-zinc-950 text-white">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest">
                    <Sparkles size={14} />
                    Premium Candidate
                  </div>
                  <h1 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Welcome back, {fullName} 👋
                  </h1>
                  <p className="mt-3 text-zinc-300">
                    Track your recruitment progress and upcoming interviews.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm">Current Status</p>
                  <p className="mt-2 text-xl font-bold sm:text-2xl text-green-400">
                    {profile?.status || "Applied"}
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Dashboard Stats */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard label="Preferred Job Field" value={jobField} />
              <InfoCard label="Total Interviews" value={interviews.length.toString()} />
              <InfoCard label="Scheduled Interviews" value={upcomingInterviews.length.toString()} />
              <InfoCard label="City" value={profile?.city || "Not Added"} />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              
              {/* INTERVIEW SCHEDULE */}
              <SectionCard
                title="Interview Schedule"
                description={<>Your upcoming and past job interviews.</>}
              >
                {interviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center text-zinc-500">
                     <Calendar className="h-12 w-12 text-zinc-300 mb-3" />
                     <p>No interviews scheduled yet.</p>
                     <p className="text-sm">We will notify you when an employer shortlists your profile.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {/* UPCOMING */}
                    {upcomingInterviews.length > 0 && (
                      <div>
                        <h3 className="mb-3 font-semibold text-green-600">Upcoming Interviews</h3>
                        <div className="flex flex-col gap-3">
                          {upcomingInterviews.map((interview: any) => (
                            <div key={interview.id} className="rounded-xl border border-green-200 bg-green-50 p-4">
                              <p className="font-bold text-zinc-900">{interview.companyName}</p>
                              {interview.designation && <p className="text-sm font-semibold text-green-700">{interview.designation}</p>}
                              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-zinc-600">
                                <div className="flex items-center gap-1"><Calendar size={14} /> {new Date(interview.date).toLocaleDateString('en-IN')}</div>
                                <div className="flex items-center gap-1"><Clock size={14} /> {interview.time}</div>
                              </div>
                              <p className="mt-2 text-sm text-zinc-700"><strong>Location/Link:</strong> {interview.location}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PAST */}
                    {pastInterviews.length > 0 && (
                      <div>
                        <h3 className="mb-3 font-semibold text-zinc-500">Previous Interviews</h3>
                        <div className="flex flex-col gap-3">
                          {pastInterviews.map((interview: any) => (
                            <div key={interview.id} className="rounded-xl border bg-zinc-50 p-4 opacity-75">
                              <p className="font-bold text-zinc-900">{interview.companyName}</p>
                              {interview.designation && <p className="text-sm font-semibold text-zinc-600">{interview.designation}</p>}
                              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-zinc-600">
                                <div className="flex items-center gap-1"><Calendar size={14} /> {new Date(interview.date).toLocaleDateString('en-IN')}</div>
                                <div className="flex items-center gap-1"><Clock size={14} /> {interview.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </SectionCard>

              {/* PROFILE OVERVIEW */}
              <SectionCard
                title="Profile Overview"
                description={<>Your information saved in Shiv Shakti Multi Service.</>}
              >
                <div className="space-y-4 text-zinc-900 dark:text-white">
                  <div className="flex items-center gap-3 rounded-xl border dark:border-zinc-800 p-4">
                    <UserRound className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Full Name</p>
                      <p className="font-semibold">{fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border dark:border-zinc-800 p-4">
                    <BriefcaseBusiness className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Experience</p>
                      <p className="font-semibold">{profile?.experience || "Not Added"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border dark:border-zinc-800 p-4">
                    <CheckCircle2 className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Skills</p>
                      <p className="font-semibold">{profile?.skills || "Not Added"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => router.push("/candidate/profile")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                  >
                    Edit Profile Details
                  </button>
                </div>
              </SectionCard>

            </div>
          </>
        )}
      </main>
    </div>
  );
}