"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthInput } from "@/components/auth/auth-input";

export default function LoginPage() {
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
      const response = await fetch("/api/login", {
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

      if (result.user.role === "admin") {
        window.location.href = "/admin";
        return;
      }

      window.location.href = result.user.profileCompleted
        ? "/candidate/dashboard"
        : "/candidate/profile";
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

        {/* Left */}
        <section className="relative hidden overflow-hidden bg-zinc-950 lg:flex lg:min-h-screen lg:items-center">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 mx-auto w-full max-w-xl px-12 xl:px-16">
            <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
              <span className="h-px w-8 bg-zinc-600" />
              Candidate Portal
            </div>

            <h1 className="max-w-lg text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
              Welcome back.
              <br />
              <span className="text-zinc-400">Your next step starts here.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-zinc-300 xl:text-lg xl:leading-8">
              Sign in to manage your candidate profile, update your career
              preferences and continue exploring opportunities.
            </p>

            <div className="mt-12 grid max-w-md grid-cols-3 border-y border-white/10 py-6">
              <div>
                <p className="text-2xl font-bold text-white">5000+</p>
                <p className="mt-1 text-xs text-zinc-500">Candidates</p>
              </div>

              <div className="border-l border-white/10 pl-5">
                <p className="text-2xl font-bold text-white">250+</p>
                <p className="mt-1 text-xs text-zinc-500">Companies</p>
              </div>

              <div className="border-l border-white/10 pl-5">
                <p className="text-2xl font-bold text-white">6+</p>
                <p className="mt-1 text-xs text-zinc-500">Industries</p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-zinc-500">
              <ShieldCheck size={15} />
              <span>Your account details are handled through our secure login process.</span>
            </div>
          </div>
        </section>

        {/* Right */}
        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-[500px]">

            {/* Back */}
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>

            <AuthCard
              className="w-full"
              title="Welcome Back"
              description={
                <>
                  Sign in to continue managing your candidate profile and
                  career journey.
                </>
              }
              footer={
                <div className="space-y-3">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-zinc-950 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
                    >
                      Create one
                    </Link>
                  </p>

                  <Link
                    href="/forgot-password"
                    className="text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  >
                    Forgot your password?
                  </Link>
                </div>
              }
            >
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <AuthInput
                  id="email"
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
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

            <p className="mt-5 text-center text-[10px] leading-5 text-zinc-400">
              By continuing, you agree to use Shiv Shakti Multi Service for
              legitimate career and recruitment purposes.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}