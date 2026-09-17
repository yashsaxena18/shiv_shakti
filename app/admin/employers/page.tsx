"use client";

import { toast } from "sonner";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EmployersPage() {
  const [employers, setEmployers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const employersPerPage = 10;

  useEffect(() => {
    loadEmployers();
  }, []);

  const loadEmployers = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/employers");
      
      let result;
      try {
        const text = await response.text();
        result = text ? JSON.parse(text) : {};
      } catch (err) {
        toast.error("Invalid server response. Please try again.");
        return;
      }

      if (response.ok && result.success) {
        setEmployers(result.employers || []);
        setStats(result.stats || {
          total: 0, pending: 0, approved: 0, rejected: 0
        });
      } else {
        toast.error(result.message || "Unable to load employers.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while loading employers.");
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployers = employers.filter((employer) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (employer.employerName || "").toLowerCase().includes(searchText) ||
      (employer.companyName || "").toLowerCase().includes(searchText) ||
      (employer.email || "").toLowerCase().includes(searchText) ||
      (employer.phone || "").toLowerCase().includes(searchText) ||
      (employer.companyAddress || "").toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || employer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployers.length / employersPerPage)
  );

  const paginatedEmployers = filteredEmployers.slice(
    (currentPage - 1) * employersPerPage,
    currentPage * employersPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const deleteEmployer = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/employers/${id}`, {
        method: "DELETE",
      });

      let result;
      try {
        const text = await response.text();
        result = text ? JSON.parse(text) : {};
      } catch (err) {
        toast.error("Invalid server response.");
        return;
      }

      if (response.ok && result.success) {
        await loadEmployers();
        toast.success("Employer deleted successfully.");
      } else {
        toast.error(result.message || "Unable to delete employer.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/admin/employers/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      let result;
      try {
        const text = await response.text();
        result = text ? JSON.parse(text) : {};
      } catch (err) {
        toast.error("Invalid server response.");
        return;
      }

      if (response.ok && result.success) {
        setEmployers((prev) =>
          prev.map((employer) =>
            employer.id === id ? { ...employer, status } : employer
          )
        );
        toast.success("Status updated successfully.");
      } else {
        toast.error(result.message || "Unable to update status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold sm:text-3xl">Employer Management</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-2xl border bg-white p-4 shadow sm:p-5">
            <p className="text-sm text-zinc-500">Total</p>
            <h2 className="text-2xl font-bold sm:text-3xl">{stats.total}</h2>
          </div>

          <div className="rounded-2xl border bg-yellow-50 p-4 shadow sm:p-5">
            <p className="text-sm">Pending</p>
            <h2 className="text-2xl font-bold sm:text-3xl">{stats.pending}</h2>
          </div>

          <div className="rounded-2xl border bg-green-50 p-4 shadow sm:p-5">
            <p className="text-sm">Approved</p>
            <h2 className="text-2xl font-bold sm:text-3xl">{stats.approved}</h2>
          </div>

          <div className="rounded-2xl border bg-red-50 p-4 shadow sm:p-5">
            <p className="text-sm">Rejected</p>
            <h2 className="text-2xl font-bold sm:text-3xl">{stats.rejected}</h2>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-4 shadow-sm sm:p-6">
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:flex-wrap">
            {/* Search */}
            <div className="relative w-full lg:w-auto lg:flex-1 lg:min-w-[250px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by company, name, email..."
                className="w-full rounded-xl border border-zinc-300 bg-white text-zinc-900 py-2.5 pl-10 pr-10 text-sm outline-none transition-all duration-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200 min-w-[200px]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none lg:w-auto lg:max-w-[140px] shrink-0 truncate"
            >
              <option value="All">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {loading ? (
            <div className="py-16 text-center text-zinc-500">
              Loading employers...
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto rounded-2xl border border-zinc-200 lg:block">
                <table className="w-full min-w-[1000px] border-collapse">
                  <thead className="bg-zinc-100">
                    <tr>
                      <th className="p-4 text-left">Company</th>
                      <th className="p-4 text-left">Employer Name</th>
                      <th className="p-4 text-left">Email</th>
                      <th className="p-4 text-left">Phone</th>
                      <th className="p-4 text-left">Job Category</th>
                      <th className="p-4 text-left">Preferred Job</th>
                      <th className="p-4 text-left">Req. Candidates</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedEmployers.length > 0 ? (
                      paginatedEmployers.map((employer) => (
                        <tr
                          key={employer.id}
                          className="border-b transition hover:bg-zinc-50"
                        >
                          <td className="p-4 font-medium">
                            {employer.companyName || "-"}
                          </td>
                          <td className="p-4">{employer.employerName || "-"}</td>
                          <td className="p-4">{employer.email || "-"}</td>
                          <td className="p-4">
                            {employer.phone ? (
                              <a
                                href={`tel:${employer.phone}`}
                                className="text-blue-600 hover:underline"
                              >
                                {employer.phone}
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="p-4">{employer.selectedJobField || "-"}</td>
                          <td className="p-4">{employer.preferredJobField || "-"}</td>
                          <td className="p-4">{employer.candidatesRequired || "0"}</td>
                          <td className="p-4">
                            <select
                              value={employer.status}
                              onChange={(e) =>
                                updateStatus(employer.id, e.target.value)
                              }
                              className="rounded-lg border px-3 py-2 text-sm"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="APPROVED">Approved</option>
                              <option value="REJECTED">Rejected</option>
                            </select>
                          </td>
                          <td className="p-4 text-center">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button className="rounded bg-red-600 px-3 py-2 text-xs text-white transition hover:bg-red-700">
                                  Delete
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete employer?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. The employer and their
                                    account will be permanently deleted.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteEmployer(employer.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="p-10 text-center text-zinc-500">
                          No employers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 lg:hidden">
                {paginatedEmployers.length > 0 ? (
                  paginatedEmployers.map((employer) => (
                    <div
                      key={employer.id}
                      className="rounded-2xl border bg-white p-4 shadow-sm"
                    >
                      <h3 className="text-lg font-semibold">
                        {employer.companyName || "-"}
                      </h3>
                      <p className="mt-1 break-all text-sm text-zinc-500">
                        {employer.email || "-"}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500">
                        {employer.employerName || "-"}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-zinc-700">Req. Candidates</span>
                          <p className="mt-1 text-zinc-600">
                            {employer.candidatesRequired || "0"}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-zinc-700">Phone</span>
                          {employer.phone ? (
                            <p className="mt-1 text-zinc-600">
                              <a
                                href={`tel:${employer.phone}`}
                                className="text-blue-600 hover:underline"
                              >
                                {employer.phone}
                              </a>
                            </p>
                          ) : (
                            <p className="mt-1 text-zinc-600">-</p>
                          )}
                        </div>

                        <div className="col-span-2 grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium text-zinc-700">Job Category</span>
                            <p className="mt-1 text-zinc-600">
                              {employer.selectedJobField || "-"}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-zinc-700">Preferred Job</span>
                            <p className="mt-1 text-zinc-600">
                              {employer.preferredJobField || "-"}
                            </p>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <span className="font-medium text-zinc-700">Status</span>
                          <select
                            value={employer.status}
                            onChange={(e) =>
                              updateStatus(employer.id, e.target.value)
                            }
                            className="mt-2 w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-5">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="w-full rounded-xl bg-red-600 py-2.5 text-sm font-medium text-white transition hover:bg-red-700">
                              Delete
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete employer?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. The employer and their
                                account will be permanently deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteEmployer(employer.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border p-8 text-center text-zinc-500">
                    No employers found.
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredEmployers.length > 0 && totalPages > 1 && (
                <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-5 sm:flex-row">
                  <p className="text-sm text-zinc-500">
                    Showing {(currentPage - 1) * employersPerPage + 1} –{" "}
                    {Math.min(currentPage * employersPerPage, filteredEmployers.length)}{" "}
                    of {filteredEmployers.length} employers
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((page) => Math.max(page - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-zinc-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((page) => Math.min(page + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-zinc-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
