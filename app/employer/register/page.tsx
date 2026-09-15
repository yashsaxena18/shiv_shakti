"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";
import { useState } from "react";
import { AuthButton } from "@/components/auth/auth-button";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthInput } from "@/components/auth/auth-input";

export default function EmployerRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    employerName: "",
    companyName: "",
    phone: "",
    email: "",
    password: "",
    companyAddress: "",
    candidatesRequired: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (!formData.employerName.trim()) nextErrors.employerName = "Employer name is required.";
    if (!formData.companyName.trim()) nextErrors.companyName = "Company name is required.";
    if (!formData.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.companyAddress.trim()) nextErrors.companyAddress = "Company address is required.";
    if (!formData.candidatesRequired.trim()) {
      nextErrors.candidatesRequired = "Candidates required is required.";
    } else if (isNaN(Number(formData.candidatesRequired)) || Number(formData.candidatesRequired) < 1) {
      nextErrors.candidatesRequired = "Must be a valid number of 1 or more.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);

    try {
      const response = await fetch("/api/employer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          candidatesRequired: Number(formData.candidatesRequired),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors({ email: result.message });
        return;
      }

      router.push("/employer/login?registered=true");
    } catch (error) {
      console.error(error);
      setErrors({ email: "Something went wrong. Please try again." });
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
              Hire Top Talent.
              <br />
              <span className="text-zinc-400">Start recruiting today.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-zinc-300 xl:text-lg xl:leading-8">
              Create an employer account to post vacancies and connect with thousands of qualified candidates.
            </p>
            <div className="mt-8 flex items-center gap-2 text-xs text-zinc-500">
              <Building2 size={15} />
              <span>Partner with Shiv Shakti Multi Service to scale your team.</span>
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
              title="Employer Registration"
              description="Create your company profile to start hiring."
              footer={
                <div className="space-y-3">
                  <p>
                    Already have an account?{" "}
                    <Link
                      href="/employer/login"
                      className="font-semibold text-zinc-950 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              }
            >
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <div className="grid grid-cols-2 gap-4">
                  <AuthInput
                    id="employerName"
                    label="Your Name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.employerName}
                    onChange={(val) => handleChange("employerName", val)}
                    error={errors.employerName}
                  />
                  <AuthInput
                    id="companyName"
                    label="Company Name"
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.companyName}
                    onChange={(val) => handleChange("companyName", val)}
                    error={errors.companyName}
                  />
                </div>
                
                <AuthInput
                  id="email"
                  label="Company Email"
                  type="email"
                  placeholder="hr@company.com"
                  value={formData.email}
                  onChange={(val) => handleChange("email", val)}
                  error={errors.email}
                />
                
                <AuthInput
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(val) => handleChange("phone", val)}
                  error={errors.phone}
                />
                
                <AuthInput
                  id="companyAddress"
                  label="Company Address"
                  type="text"
                  placeholder="123 Business Park, City"
                  value={formData.companyAddress}
                  onChange={(val) => handleChange("companyAddress", val)}
                  error={errors.companyAddress}
                />
                
                <AuthInput
                  id="candidatesRequired"
                  label="Number of Candidates Required"
                  type="number"
                  placeholder="e.g. 10"
                  min="1"
                  value={formData.candidatesRequired}
                  onChange={(val) => handleChange("candidatesRequired", val)}
                  error={errors.candidatesRequired}
                />

                <AuthInput
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(val) => handleChange("password", val)}
                  error={errors.password}
                />

                <AuthButton loading={loading} type="submit">
                  Register Company →
                </AuthButton>
              </form>
            </AuthCard>
          </div>
        </section>
      </main>
    </div>
  );
}
