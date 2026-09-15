// app/admin/candidates/page.tsx
"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Search, X } from "lucide-react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { jobCategories} from "@/lib/job-categories";

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

function CandidatesContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type"); // "paid" | "unpaid" | null
  
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    shortlisted: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
  });

  const [search, setSearch] = useState("");

  const [experienceFilter, setExperienceFilter] = useState("All");
  const [jobCategoryFilter, setJobCategoryFilter] =
    useState("All");
  const [jobFieldFilter, setJobFieldFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const candidatesPerPage = 10;

  useEffect(() => {
    loadCandidates();
  }, [typeParam]);

  const loadCandidates = async () => {
    try {
      setLoading(true);

      const url = typeParam ? `/api/admin/candidates?type=${typeParam}` : "/api/admin/candidates";
      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setCandidates(result.candidates || []);
        setStats(result.stats);
      } else {
        toast.error(
          result.message || "Unable to load candidates."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while loading candidates.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      candidate.user?.fullName
        ?.toLowerCase()
        .includes(searchText) ||
      candidate.user?.email
        ?.toLowerCase()
        .includes(searchText) ||
      (candidate.phone || "")
        .toLowerCase()
        .includes(searchText) ||
      (candidate.city || "")
        .toLowerCase()
        .includes(searchText) ||
      (candidate.state || "")
        .toLowerCase()
        .includes(searchText) ||
      (candidate.highestQualification || "")
        .toLowerCase()
        .includes(searchText) ||
      (candidate.skills || "")
        .toLowerCase()
        .includes(searchText) ||
      (candidate.selectedJobField || "")
        .toLowerCase()
        .includes(searchText) ||
      (candidate.preferredJobField || "")
        .toLowerCase()
        .includes(searchText);

    const matchesExperience =
      experienceFilter === "All" ||
      candidate.experience === experienceFilter;

    const matchesJobCategory =
      jobCategoryFilter === "All" ||
      candidate.selectedJobField === jobCategoryFilter;

    const matchesJobField =
      jobFieldFilter === "All" ||
      candidate.preferredJobField === jobFieldFilter;

    const matchesStatus =
      statusFilter === "All" ||
      candidate.status === statusFilter;

    return (
      matchesSearch &&
      matchesExperience &&
      matchesJobCategory &&
      matchesJobField &&
      matchesStatus
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCandidates.length / candidatesPerPage)
  );

  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * candidatesPerPage,
    currentPage * candidatesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    experienceFilter,
    jobCategoryFilter,
    jobFieldFilter,
    statusFilter,
  ]);

  const deleteCandidate = async (id: string) => {
    try {
      const response = await fetch(
        `/api/admin/candidates/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        await loadCandidates();
        toast.success("Candidate deleted successfully.");
      } else {
        toast.error(
          result.message || "Unable to delete candidate."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      const response = await fetch(
        "/api/admin/candidates/status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setCandidates((previousCandidates) =>
          previousCandidates.map((candidate) =>
            candidate.id === id
              ? {
                  ...candidate,
                  status,
                }
              : candidate
          )
        );

        toast.success("Status updated successfully.");
      } else {
        toast.error(
          result.message || "Unable to update status."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const getCategoryLabel = (category?: string) => {
  return category || "-";
};

  const availableJobFields =
    jobCategoryFilter === "All"
      ? Array.from(
          new Set(
            Object.values(jobCategories).flat()
          )
        )
      : jobCategories[
          jobCategoryFilter as keyof typeof jobCategories
        ] || [];

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {typeParam === "paid" ? "Paid Candidates" : typeParam === "unpaid" ? "Unpaid Candidates" : "All Candidates"}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
          <div className="rounded-2xl border bg-white p-4 shadow sm:p-5">
            <p className="text-sm text-zinc-500">
              Total
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {stats.total}
            </h2>
          </div>

          <div className="rounded-2xl border bg-yellow-50 p-4 shadow sm:p-5">
            <p className="text-sm">Applied</p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {stats.applied}
            </h2>
          </div>

          <div className="rounded-2xl border bg-blue-50 p-4 shadow sm:p-5">
            <p className="text-sm">Shortlisted</p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {stats.shortlisted}
            </h2>
          </div>

          <div className="rounded-2xl border bg-purple-50 p-4 shadow sm:p-5">
            <p className="text-sm">Interview</p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {stats.interview}
            </h2>
          </div>

          <div className="rounded-2xl border bg-green-50 p-4 shadow sm:p-5">
            <p className="text-sm">Selected</p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {stats.selected}
            </h2>
          </div>

          <div className="rounded-2xl border bg-red-50 p-4 shadow sm:p-5">
            <p className="text-sm">Rejected</p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {stats.rejected}
            </h2>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-4 shadow-sm sm:p-6">
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by name, email, city..."
                className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-12 pr-12 outline-none transition-all duration-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Experience */}
            <select
              value={experienceFilter}
              onChange={(e) =>
                setExperienceFilter(e.target.value)
              }
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none lg:w-auto"
            >
              <option value="All">
                All Experience
              </option>
              <option value="Fresher">
                Fresher
              </option>
              <option value="Experienced">
                Experienced
              </option>
            </select>

            {/* JOB CATEGORY FILTER */}
            <select
              value={jobCategoryFilter}
              onChange={(e) => {
                setJobCategoryFilter(e.target.value);
                setJobFieldFilter("All");
              }}
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none lg:w-auto"
            >
              <option value="All">
                All Job Categories
              </option>

              {Object.keys(jobCategories).map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {getCategoryLabel(category)}
                </option>
              ))}
            </select>

            {/* PREFERRED JOB FILTER */}
            <select
              value={jobFieldFilter}
              onChange={(e) =>
                setJobFieldFilter(e.target.value)
              }
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none lg:w-auto"
            >
              <option value="All">
                All Preferred Jobs
              </option>

              {availableJobFields.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none lg:w-auto"
            >
              <option value="All">
                All Status
              </option>
              <option value="Applied">
                Applied
              </option>
              <option value="Shortlisted">
                Shortlisted
              </option>
              <option value="Interview">
                Interview
              </option>
              <option value="Selected">
                Selected
              </option>
              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>

          {loading ? (
            <div className="py-16 text-center text-zinc-500">
              Loading candidates...
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto rounded-2xl border border-zinc-200 lg:block">
                <table className="w-full min-w-[1250px] border-collapse">
                  <thead className="bg-zinc-100">
                    <tr>
                      <th className="p-4 text-left">
                        Name
                      </th>
                      <th className="p-4 text-left">
                        Email
                      </th>
                      <th className="p-4 text-left">
                        City
                      </th>
                      <th className="p-4 text-left">
                        Experience
                      </th>
                      <th className="p-4 text-left">
                        Status
                      </th>
                      <th className="p-4 text-left">
                        Job Category
                      </th>
                      <th className="p-4 text-left">
                        Preferred Job
                      </th>
                      <th className="p-4 text-left">
                        Phone
                      </th>
                      <th className="p-4 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedCandidates.length > 0 ? (
                      paginatedCandidates.map(
                        (candidate) => (
                          <tr
                            key={candidate.id}
                            className="border-b transition hover:bg-zinc-50"
                          >
                            <td className="p-4 font-medium">
                              {candidate.user?.fullName || "-"}
                            </td>

                            <td className="p-4">
                              {candidate.user?.email || "-"}
                            </td>

                            <td className="p-4">
                              {candidate.city || "-"}
                            </td>

                            <td className="p-4">
                              {candidate.experience || "-"}
                            </td>

                            <td className="p-4">
                              <select
                                value={candidate.status}
                                onChange={(e) =>
                                  updateStatus(
                                    candidate.id,
                                    e.target.value
                                  )
                                }
                                className="rounded-lg border px-3 py-2 text-sm"
                              >
                                <option value="Applied">
                                  Applied
                                </option>
                                <option value="Shortlisted">
                                  Shortlisted
                                </option>
                                <option value="Interview">
                                  Interview
                                </option>
                                <option value="Selected">
                                  Selected
                                </option>
                                <option value="Rejected">
                                  Rejected
                                </option>
                              </select>
                            </td>

                            <td className="p-4">
                              {getCategoryLabel(
                                candidate.selectedJobField
                              )}
                            </td>

                            <td className="p-4">
                              {candidate.preferredJobField || "-"}
                            </td>

                            <td className="p-4">
                              {candidate.phone ? (
                                <div className="flex flex-col gap-2">
                                  <a
                                    href={`tel:${candidate.phone}`}
                                    className="text-blue-600 hover:underline"
                                  >
                                    {candidate.phone}
                                  </a>

                                  <a
                                    href={`https://wa.me/91${candidate.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-fit items-center justify-center rounded-md bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700"
                                  >
                                    WhatsApp
                                  </a>
                                </div>
                              ) : (
                                "-"
                              )}
                            </td>

                            <td className="p-4">
                              <div className="flex gap-2">
                                <Link
                                  href={`/admin/candidates/${candidate.id}`}
                                  className="rounded bg-blue-600 px-3 py-2 text-xs text-white transition hover:bg-blue-700"
                                >
                                  View
                                </Link>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <button className="rounded bg-red-600 px-3 py-2 text-xs text-white transition hover:bg-red-700">
                                      Delete
                                    </button>
                                  </AlertDialogTrigger>

                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete candidate?
                                      </AlertDialogTitle>

                                      <AlertDialogDescription>
                                        This action cannot be undone.
                                        The candidate will be permanently
                                        deleted.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>

                                      <AlertDialogAction
                                        onClick={() =>
                                          deleteCandidate(
                                            candidate.id
                                          )
                                        }
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          className="p-10 text-center text-zinc-500"
                        >
                          No candidates found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 lg:hidden">
                {paginatedCandidates.length > 0 ? (
                  paginatedCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="rounded-2xl border bg-white p-4 shadow-sm"
                    >
                      <h3 className="text-lg font-semibold">
                        {candidate.user?.fullName || "-"}
                      </h3>

                      <p className="mt-1 break-all text-sm text-zinc-500">
                        {candidate.user?.email || "-"}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-zinc-700">
                            City
                          </span>
                          <p className="mt-1 text-zinc-600">
                            {candidate.city || "-"}
                          </p>
                        </div>

                        <div>
                          <span className="font-medium text-zinc-700">
                            Experience
                          </span>
                          <p className="mt-1 text-zinc-600">
                            {candidate.experience || "-"}
                          </p>
                        </div>

                        <div>
                          <span className="font-medium text-zinc-700">
                            Job Category
                          </span>
                          <p className="mt-1 wrap-break-words text-zinc-600">
                            {getCategoryLabel(
                              candidate.selectedJobField
                            )}
                          </p>
                        </div>

                        <div>
                          <span className="font-medium text-zinc-700">
                            Preferred Job
                          </span>
                          <p className="mt-1 wrap-break-words text-zinc-600">
                            {candidate.preferredJobField || "-"}
                          </p>
                        </div>

                        <div className="col-span-2">
                          <span className="font-medium text-zinc-700">
                            Status
                          </span>

                          <select
                            value={candidate.status}
                            onChange={(e) =>
                              updateStatus(
                                candidate.id,
                                e.target.value
                              )
                            }
                            className="mt-2 w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
                          >
                            <option value="Applied">
                              Applied
                            </option>
                            <option value="Shortlisted">
                              Shortlisted
                            </option>
                            <option value="Interview">
                              Interview
                            </option>
                            <option value="Selected">
                              Selected
                            </option>
                            <option value="Rejected">
                              Rejected
                            </option>
                          </select>
                        </div>
                      </div>

                      {candidate.phone && (
                        <div className="mt-4 border-t pt-4">
                          <span className="text-sm font-medium text-zinc-700">
                            Phone
                          </span>

                          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                            <a
                              href={`tel:${candidate.phone}`}
                              className="text-blue-600 hover:underline"
                            >
                              {candidate.phone}
                            </a>

                            <a
                              href={`https://wa.me/91${candidate.phone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-fit items-center justify-center rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <Link
                          href={`/admin/candidates/${candidate.id}`}
                          className="rounded-xl bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          View
                        </Link>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="rounded-xl bg-red-600 py-2.5 text-sm font-medium text-white transition hover:bg-red-700">
                              Delete
                            </button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete candidate?
                              </AlertDialogTitle>

                              <AlertDialogDescription>
                                This action cannot be undone.
                                The candidate will be permanently
                                deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Cancel
                              </AlertDialogCancel>

                              <AlertDialogAction
                                onClick={() =>
                                  deleteCandidate(candidate.id)
                                }
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
                    No candidates found.
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredCandidates.length > 0 &&
                totalPages > 1 && (
                  <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-5 sm:flex-row">
                    <p className="text-sm text-zinc-500">
                      Showing{" "}
                      {(currentPage - 1) *
                        candidatesPerPage +
                        1}
                      {" – "}
                      {Math.min(
                        currentPage * candidatesPerPage,
                        filteredCandidates.length
                      )}{" "}
                      of {filteredCandidates.length} candidates
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((page) =>
                            Math.max(page - 1, 1)
                          )
                        }
                        disabled={currentPage === 1}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-white text-lg text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Previous page"
                      >
                        ‹
                      </button>

                      <div className="flex h-9 min-w-[80px] items-center justify-center rounded-lg border bg-white px-3 text-sm font-medium text-zinc-700">
                        {currentPage} / {totalPages}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((page) =>
                            Math.min(
                              page + 1,
                              totalPages
                            )
                          )
                        }
                        disabled={
                          currentPage === totalPages
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-white text-lg text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Next page"
                      >
                        ›
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

export default function CandidatesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500">Loading candidates...</div>}>
      <CandidatesContent />
    </Suspense>
  );
}
