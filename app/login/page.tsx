"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";

import { useState } from "react";
import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthInput } from "@/components/auth/auth-input";
import { SiteNavbar } from "@/components/site-navbar";

export default function LoginPage() {   
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // useEffect(() => {
  //   router.replace("/candidate/profile");
  // }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const nextErrors: { email?: string; password?: string } = {};

  if (!email.trim()) {
    nextErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    nextErrors.email = "Please enter a valid email address.";
  }

  if (!password.trim()) {
    nextErrors.password = "Password is required.";
  }

  setErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) {
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
    setErrors({
    password: result.message,
    });
    return;
    }

    localStorage.setItem("userId", result.user.id);

localStorage.setItem(
  "user",
  JSON.stringify(result.user)
);
window.dispatchEvent(new Event("storage"));
if (result.user.role === "admin") {
  window.location.href = "/admin";
  return;
}

if (result.user.profileCompleted) {
  window.location.href = "/candidate/dashboard";
} else {
  window.location.href = "/candidate/profile";
}

  } catch (error) {
    console.error(error);
    setErrors({
    password: "Something went wrong. Please try again.",
   });
  } finally {
    setLoading(false);
  }
};

 return (
  <div className="min-h-screen bg-zinc-50">
    <SiteNavbar />

    <main className="grid min-h-screen pt-20 lg:min-h-[calc(100vh-80px)] lg:grid-cols-2">
      {/* Left Side */}
      
      <div className="relative hidden overflow-hidden bg-zinc-950 lg:flex lg:items-center lg:justify-center">

  <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>

  <div className="relative z-10 max-w-lg px-12 text-white">

    <Logo />

    <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white xl:text-6xl">
      Hire Better.
      <br />
      Build Strong Teams.
    </h1>

    <p className="mt-8 text-lg leading-8 text-zinc-300">
      A modern recruitment platform to manage candidates,
      companies, interviews and placements from one
      beautiful dashboard.
    </p>

    <div className="mt-12 flex gap-10">

      <div>
        <h2 className="text-3xl font-bold">5000+</h2>
        <p className="text-zinc-400">Candidates</p>
      </div>

      <div>
        <h2 className="text-3xl font-bold">250+</h2>
        <p className="text-zinc-400">Companies</p>
      </div>

      <div>
        <h2 className="text-3xl font-bold">95%</h2>
        <p className="text-zinc-400">Placements</p>
      </div>

    </div>

  </div>

</div>

      {/* Right Side */}
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">

        <AuthCard
          className="w-full max-w-[500px]"
          title="Welcome Back"
          description={<>Sign in to continue building your next opportunity with Shiv Shakti Multi Service.</>}
          footer={
            <div className="space-y-2">
              <Link
                href="/register"
                className="font-medium text-zinc-950 transition hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
              >
                Don’t have an account? Create one
              </Link>

              <div>
                <Link
                  href="/forgot-password"
                  className="text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          }
        >
          <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">

            <AuthInput
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(value) => {
                setEmail(value);
                if (errors.email) {
                  setErrors((current) => ({
                    ...current,
                    email: undefined,
                  }));
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
                  setErrors((current) => ({
                    ...current,
                    password: undefined,
                  }));
                }
              }}
              error={errors.password}
              autoComplete="new-password"
            />

            <AuthButton
              loading={loading}
              type="submit"
            >
              Sign In →
            </AuthButton>

          </form>

        </AuthCard>

      </div>

    </main>

  </div>
);
}
