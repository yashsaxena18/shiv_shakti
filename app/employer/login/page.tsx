"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";
import { useState } from "react";
import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthInput } from "@/components/auth/auth-input";

export default function EmployerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!password.trim()) nextErrors.password = "Password is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);

    try {
      const response = await fetch("/api/employer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors({ password: result.message });
        return;
      }

      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("user", JSON.stringify(result.user));
      window.dispatchEvent(new Event("storage"));

      window.location.href = "/employer/dashboard";
    } catch (error) {
      console.error(error);
      setErrors({ password: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="grid min-h-screen lg:grid-cols-2">

        <section className="relative hidden overflow-hidden bg-zinc-950 lg:flex lg:min-h-screen lg:items-center">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 mx-auto w-full max-w-xl px-12 xl:px-16">
            <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
              <span className="h-px w-8 bg-zinc-600" />
              Employer Portal
            </div>

            <h1 className="max-w-lg text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
              Welcome back.
              <br />
              <span className="text-zinc-400">Manage your candidates.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-zinc-300 xl:text-lg xl:leading-8">
              Sign in to your employer dashboard to view applications, track candidate status, and manage your hiring pipeline.
            </p>

            <div className="mt-8 flex items-center gap-2 text-xs text-zinc-500">
              <Building2 size={15} />
              <span>Secure employer access portal.</span>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-[500px]">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>

            <AuthCard
              className="w-full"
              title="Employer Login"
              description="Access your employer dashboard to manage hiring."
              footer={
                <div className="space-y-3">
                  <p>
                    Don't have an employer account?{" "}
                    <Link
                      href="/employer/register"
                      className="font-semibold text-zinc-950 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              }
            >
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <AuthInput
                  id="email"
                  label="Company Email"
                  type="email"
                  placeholder="hr@company.com"
                  value={email}
                  onChange={(value) => {
                    setEmail(value);
                    if (errors.email) {
                      setErrors((current) => ({ ...current, email: undefined }));
                    }
                  }}
                  error={errors.email}
                  autoComplete="off"
                />

                <AuthInput
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(value) => {
                    setPassword(value);
                    if (errors.password) {
                      setErrors((current) => ({ ...current, password: undefined }));
                    }
                  }}
                  error={errors.password}
                  autoComplete="new-password"
                />

                <AuthButton loading={loading} type="submit">
                  Sign In →
                </AuthButton>
              </form>
            </AuthCard>
          </div>
        </section>
      </main>
    </div>
  );
}
