"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthInput } from "@/components/auth/auth-input";
import { SiteNavbar } from "@/components/site-navbar";

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
    else if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!password.trim()) nextErrors.password = "Password is required.";
    else if (password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    if (!confirmPassword.trim()) nextErrors.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password) nextErrors.confirmPassword = "Passwords do not match.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!validate()) {
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    const result = await response.json();

   if (!response.ok) {
  setErrors((current) => ({
    ...current,
    email: result.message,
  }));
  return;
}

    router.push("/login");
  } catch (error) {
    setErrors((current) => ({
  ...current,
  email: "Something went wrong. Please try again.",
}));
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-zinc-50">
      <SiteNavbar />
      <main className="grid min-h-screen pt-20 lg:min-h-[calc(100vh-80px)] lg:grid-cols-2">
        <div className="relative hidden min-h-screen overflow-hidden  bg-zinc-950 lg:flex lg:items-center lg:justify-center">

  <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>

  <div className="relative z-10 max-w-lg px-12 text-white">

    <span className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-orange-300">
      Shiv Shakti Multi Service
    </span>

    <h1 className="mt-8 text-4xl font-bold leading-tight xl:text-6xl">
      Start Your
      <br />
      Career Journey.
    </h1>

    <p className="mt-8 text-lg leading-8 text-zinc-300">
      Create your <span className="text-orange-300">Shiv Shakti Multi Service</span> account and connect with
      top recruiters, verified companies and exciting
      career opportunities.
    </p>

    <div className="mt-12 flex flex-wrap gap-8">
    
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
        <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
        <AuthCard
          className="w-full max-w-md sm:max-w-lg my-6"
          title="Create Your Account 🚀"
          description={<>Join <span className="text-orange-300">Shiv Shakti Multi Service</span> and unlock verified jobs, premium opportunities and career growth.</>}
          footer={
            <Link href="/login" className="font-medium text-zinc-950 transition hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300">
              Already have an account? Log in
            </Link>
          }
        >
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <AuthInput
              id="fullName"
              label="Full name"
              placeholder="Alex Morgan"
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
              label="Email"
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
                  setErrors((current) => ({ ...current, confirmPassword: undefined }));
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
        </div>
      </main>
    </div>
  );
}
