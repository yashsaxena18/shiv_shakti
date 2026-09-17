import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { LogOut, Building2, Users } from "lucide-react";

async function getEmployerProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/employer/login");
  }

  try {
    const decoded = verifyToken(token) as { id: string; role: string };
    
    if (decoded.role !== "employer") {
      redirect("/employer/login");
    }

    const employer = await prisma.employerProfile.findUnique({
      where: { userId: decoded.id },
      include: { user: true },
    });

    if (!employer) {
      redirect("/employer/login");
    }

    return employer;
  } catch (error) {
    redirect("/employer/login");
  }
}

export default async function EmployerDashboardPage() {
  const employer = await getEmployerProfile();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <nav className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="text-zinc-600 dark:text-zinc-300" />
            <span className="font-bold tracking-tight text-zinc-900 dark:text-white">
              Employer Portal
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <LogOut size={16} />
            Logout (Return Home)
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Welcome, {employer.employerName}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Manage your company profile and recruitment needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <Building2 className="text-zinc-600 dark:text-zinc-300" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Company</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{employer.companyName}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <Users className="text-zinc-600 dark:text-zinc-300" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Candidates Required</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{employer.candidatesRequired}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className={`h-3 w-3 rounded-full ${employer.status === "PENDING" ? "bg-amber-500" : "bg-green-500"}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Account Status</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{employer.status}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">Recruitment Details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Job Category</p>
              <p className="text-zinc-900 dark:text-white">{employer.selectedJobField || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Preferred Job</p>
              <p className="text-zinc-900 dark:text-white">{employer.preferredJobField || "-"}</p>
            </div>
          </div>
        </div>



        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">Company Details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Email Address</p>
              <p className="text-zinc-900 dark:text-white">{employer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Phone Number</p>
              <p className="text-zinc-900 dark:text-white">{employer.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Address</p>
              <p className="text-zinc-900 dark:text-white">{employer.companyAddress}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
