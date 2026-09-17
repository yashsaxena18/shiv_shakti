"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthInput } from "@/components/auth/auth-input";

type FormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!fullName.trim()) nextErrors.fullName = "Full name is required.";

    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) nextErrors.password = "Password is required.";
    else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors((current) => ({ ...current, email: result.message }));
        return;
      }

      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("user", JSON.stringify(result.user));
      window.dispatchEvent(new Event("storage"));

      router.push("/candidate/profile");
    } catch (error) {
      console.error(error);
      setErrors((current) => ({
        ...current,
        email: "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="grid min-h-screen lg:grid-cols-2">

        {/* Left */}
        <section className="relative hidden min-h-screen overflow-hidden bg-zinc-950 lg:flex lg:items-center">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 mx-auto w-full max-w-xl px-12 xl:px-16">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Candidate Registration
            </div>

            <h1 className="max-w-lg text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
              Build your
              <br />
              <span className="text-zinc-400">career profile.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-zinc-300 xl:text-lg xl:leading-8">
              Create your Shiv Shakti Multi Service account and build a
              professional profile around your skills, experience and career
              preferences.
            </p>

            <div className="mt-12 space-y-4">
              {[
                "Create your candidate account",
                "Add your career preferences",
                "Present your skills and experience professionally",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20">
                    <Check size={13} />
                  </span>
                  {item}
                </div>
              ))}
            </div>

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
              title="Create Your Account"
              description={
                <>
                  Start your candidate journey with Shiv Shakti Multi Service.
                  Create your profile and get ready to explore opportunities.
                </>
              }
              footer={
                <p>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-zinc-950 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
                  >
                    Sign in
                  </Link>
                </p>
              }
            >
              <form className="space-y-4" onSubmit={handleSubmit}>
                <AuthInput
                  id="fullName"
                  label="Full name"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(value) => {
                    setFullName(value);
                    if (errors.fullName) {
                      setErrors((current) => ({ ...current, fullName: undefined }));
                    }
                  }}
                  error={errors.fullName}
                  autoComplete="name"
                />

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
                  autoComplete="email"
                />

                <AuthInput
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Create a password"
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

                <AuthInput
                  id="confirmPassword"
                  label="Confirm password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(value) => {
                    setConfirmPassword(value);
                    if (errors.confirmPassword) {
                      setErrors((current) => ({
                        ...current,
                        confirmPassword: undefined,
                      }));
                    }
                  }}
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                />

                <AuthButton loading={loading} type="submit">
                  Create Account →
                </AuthButton>
              </form>
            </AuthCard>

            <p className="mt-5 text-center text-[10px] leading-5 text-zinc-400">
              Registration is subject to the applicable Shiv Shakti Multi
              Service process and does not guarantee employment.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}