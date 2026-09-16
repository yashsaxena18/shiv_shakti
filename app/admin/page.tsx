"use client";

import { useEffect, useState } from "react";
import {
  Users,
  BriefcaseBusiness,
  Building2,
  IndianRupee,
  UserCheck,
} from "lucide-react";

import Link from "next/link";

type Candidate = {
  id: string;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
  };
};



export default function AdminDashboardPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [employers, setEmployers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [candidatesRes, employersRes] = await Promise.all([
          fetch("/api/admin/candidates"),
          fetch("/api/admin/employers"),
        ]);
        
        const candidatesData = await candidatesRes.json();
        const employersData = await employersRes.json();

        if (candidatesData.success) {
          setCandidates(candidatesData.candidates);
        }
        if (employersData.success) {
          setEmployers(employersData.employers);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const paidUsers = candidates.filter(
    (c) => c.user?.payments?.some((p: any) => p.status === "SUCCESS")
  ).length;

  const unpaidUsers = candidates.length - paidUsers;
  const totalUsers = candidates.length + employers.length;

  return (
    <div >



      <main className="mx-auto max-w-7xl px-6 py-8">



        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">


          <Card
            title="Total Users"
            value={loading ? "..." : totalUsers.toString()}
            icon={<Users className="h-7 w-7" />}
          />

          <Card
            title="Paid Users"
            value={loading ? "..." : paidUsers.toString()}
            icon={<UserCheck className="h-7 w-7" />}
          />

          <Card
            title="Unpaid Users"
            value={loading ? "..." : unpaidUsers.toString()}
            icon={<Users className="h-7 w-7" />}
          />

          <Card
            title="Employers"
            value={loading ? "..." : employers.length.toString()}
            icon={<Building2 className="h-7 w-7" />}
          />

          <Card
            title="Total Revenue"
            value={`₹${(
              candidates.reduce((total, c) => {
                const payments = c.user?.payments || [];
                const successfulPayments = payments.filter((p: any) => p.status === "SUCCESS");
                const amount = successfulPayments.reduce((sum: number, p: any) => sum + p.amount, 0);
                return total + amount;
              }, 0) / 100 // Divide by 100 because Razorpay amount is in paise
            ).toLocaleString("en-IN")}`}
            icon={<IndianRupee className="h-7 w-7" />}
          />

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <section className="flex h-[500px] flex-col rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Recent Registrations
            </h2>

            <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-2">

              {candidates.length === 0 ? (
                <p className="text-zinc-500">
                  No registrations yet.
                </p>
              ) : (

                candidates.slice(0, 5).map((candidate) => (
                  <div
                    key={candidate.id}
                    className="rounded-xl border p-4 transition hover:bg-zinc-50"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold">
                            {candidate.user.fullName}
                          </p>
                          {candidate.user?.payments?.some((p: any) => p.status === "SUCCESS") ? (
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              Unpaid
                            </span>
                          )}
                        </div>

                        <p className="truncate text-sm text-zinc-500">
                          {candidate.user.email}
                        </p>
                      </div>

                      <p className="text-xs text-zinc-500 sm:text-sm">
                        {new Date(candidate.createdAt).toLocaleDateString()}
                      </p>

                    </div>
                  </div>))
              )}


            </div>

            <div className="mt-4">
              <Link
                href="/admin/candidates"
                className="block w-full rounded-xl bg-zinc-900 py-3 text-center text-sm font-medium text-white hover:bg-zinc-800"
              >
                View All Candidates →
              </Link>
            </div>

          </section>

          <section className="flex h-[500px] flex-col rounded-3xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="mt-6 flex flex-1 flex-col gap-4">

              <Link href="/admin/candidates?type=paid">
                <ActionButton text="Manage Paid Users" />
              </Link>

              <Link href="/admin/candidates?type=unpaid">
                <ActionButton text="Manage Unpaid Users" />
              </Link>

              <Link href="/admin/employers">
                <ActionButton text="Manage Employers" />
              </Link>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div className="rounded-xl bg-zinc-100 p-3">
          {icon}
        </div>

      </div>

    </div>
  );
}


function ActionButton({
  text,
}: {
  text: string;
}) {
  return (
    <button className="w-full rounded-xl border border-zinc-200 bg-white p-4 text-left font-medium hover:bg-zinc-100 transition">
      {text}
    </button>
  );
}