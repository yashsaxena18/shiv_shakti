"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CandidateDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCandidate();
    }
  }, [id]);

  const loadCandidate = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/admin/candidates/${id}`
      );

      const result = await response.json();

      if (result.success) {
        setCandidate(result.candidate);
      }
    } catch (error) {
      console.error("Unable to load candidate:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
        <div className="text-lg font-medium text-zinc-500">
          Loading candidate details...
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6">
        <h2 className="text-xl font-semibold text-zinc-900">
          Candidate not found
        </h2>

        <button
          onClick={() => router.back()}
          className="mt-5 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const fullName = candidate.user?.fullName || "Candidate";
  const email = candidate.user?.email || "Not Added";

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <button
          onClick={() => router.back()}
          className="mb-6 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 sm:mb-8"
        >
          ← Back
        </button>

        <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          {/* Candidate Header */}
          <div className="mb-8 flex flex-col gap-4 border-b pb-6 sm:mb-10 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-2xl font-bold text-white sm:h-20 sm:w-20 sm:text-3xl">
              {fullName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h1 className="wrap-break-word text-2xl font-bold text-zinc-900 sm:text-3xl">
                {fullName}
              </h1>

              <p className="mt-1 wrap-break-word text-sm text-zinc-500 sm:text-base">
                {email}
              </p>

              <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {candidate.status || "Applied"}
              </span>
            </div>
          </div>

          {/* Personal Information */}
          <section className="mb-8 sm:mb-10">
            <h2 className="mb-5 text-xl font-semibold text-zinc-900">
              Personal Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <Info label="Phone" value={candidate.phone} />

              <Info label="Gender" value={candidate.gender} />

              <Info
                label="Date of Birth"
                value={
                  candidate.dateOfBirth
                    ? String(candidate.dateOfBirth).substring(0, 10)
                    : null
                }
              />

              <Info label="City" value={candidate.city} />

              <Info label="State" value={candidate.state} />
            </div>
          </section>

          {/* Education */}
          <section className="mb-8 sm:mb-10">
            <h2 className="mb-5 text-xl font-semibold text-zinc-900">
              Education
            </h2>

            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <Info
                label="Qualification"
                value={candidate.highestQualification}
              />

              <Info
                label="College"
                value={candidate.college}
              />

              <Info
                label="Passing Year"
                value={candidate.passingYear}
              />
            </div>
          </section>

          {/* Professional Details */}
          <section>
            <h2 className="mb-5 text-xl font-semibold text-zinc-900">
              Professional Details
            </h2>

            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <Info
                label="Experience"
                value={candidate.experience}
              />

              <Info
                label="Job Category"
                value={candidate.selectedJobField}
              />

              <Info
                label="Preferred Job"
                value={candidate.preferredJobField}
              />

              <div className="md:col-span-2">
                <Info
                  label="Skills"
                  value={candidate.skills}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  const displayValue =
    value === null ||
    value === undefined ||
    value === ""
      ? "Not Added"
      : String(value);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition hover:shadow-sm sm:p-5">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 wrap-break-word text-base font-semibold text-zinc-900">
        {displayValue}
      </p>
    </div>
  );
}
