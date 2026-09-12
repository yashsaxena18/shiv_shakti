"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      router.push(`/reset-password?token=${result.token}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          Verify OTP
        </h1>

        <p className="mt-2 text-zinc-500">
          Enter the OTP sent to your email.
        </p>

        <form
          onSubmit={handleVerify}
          className="mt-6 space-y-5"
        >
          <input
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:border-black"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-black py-3 text-white hover:bg-zinc-800"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}