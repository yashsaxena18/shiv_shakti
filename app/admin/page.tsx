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
const [loading, setLoading] = useState(true);
  useEffect(() => {
  async function loadCandidates() {
    try {
      const response = await fetch("/api/admin/candidates");
      const data = await response.json();

      if (data.success) {
        setCandidates(data.candidates);
      }
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  }

  loadCandidates();
}, []);

  return (
    <div >

      

      <main className="mx-auto max-w-7xl px-6 py-8">



        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">


          <Card
  title="Candidates"
  value={loading ? "..." : candidates.length.toString()}
  icon={<Users className="h-7 w-7" />}
/>

          <Card
title="Companies"
value="0"
icon={<Building2 className="h-7 w-7" />}
/>

<Card
title="Jobs"
value="0"
icon={<BriefcaseBusiness className="h-7 w-7" />}
/>

<Card
title="Premium Members"
value={
  candidates.filter(
    (c) => c.user.profileCompleted
  ).length.toString()
}
icon={<UserCheck className="h-7 w-7" />}
/>

<Card
title="Revenue"
value="₹0"
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
      <p className="truncate font-semibold">
        {candidate.user.fullName}
      </p>

      <p className="truncate text-sm text-zinc-500">
        {candidate.user.email}
      </p>
    </div>

    <p className="text-xs text-zinc-500 sm:text-sm">
      {new Date(candidate.createdAt).toLocaleDateString()}
    </p>

  </div>
</div>  ))
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

    <Link href="/admin/candidates">
      <ActionButton text="Manage Candidates" />
    </Link>

    <ActionButton text="Manage Jobs" />

    <ActionButton text="Manage Companies" />

    <ActionButton text="Premium Members" />

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