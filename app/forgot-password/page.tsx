"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch("/api/forgot-password", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
        }),

      });

      const result = await response.json();

      if (!response.ok) {
  alert(result.message);
  return;
}

router.push(
  `/verify-otp?email=${encodeURIComponent(email)}`
);

    } catch (error) {

      console.error(error);

      alert("Something went wrong.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mt-2 text-zinc-500">
          Enter your registered email.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border p-3 outline-none focus:border-black"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-black py-3 text-white hover:bg-zinc-800"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

        </form>

      </div>

    </div>

  );
}