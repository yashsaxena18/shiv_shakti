"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { SkillsInput } from "./skills-input";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phoneNumber: z.string().trim().min(7, "Please enter a valid phone number."),
  address: z.string().trim().min(5, "Please enter your residential address."),
  city: z.string().trim().min(2, "Please enter your city."),
  state: z.string().trim().min(2, "Please enter your state."),
  highestQualification: z.string().trim().min(2, "Please share your highest qualification."),
  college: z.string().trim().min(2, "Please enter your college or university."),
  skills: z.array(z.string().min(1)).min(1, "Add at least one skill."),
  preferredJobField: z.string().min(1, "Please select a preferred job field."),
  experience: z.string().trim().min(1, "Please add your experience level."),
  expectedSalary: z.string().trim().min(1, "Please enter your expected salary."),
});

type FormValues = z.infer<typeof schema>;

const jobFields = [
  { value: "software-development", label: "Software Development" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance" },
  { value: "product", label: "Product" },
];

export function CandidateRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: [],
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitted(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.35)] transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
          Candidate Registration
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
          Create your professional profile
        </h2>
        <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          Share your background clearly so employers can discover the right fit for their next opportunity.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          Thank you. Your application has been received and our team will review it shortly.
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <FormInput<FormValues>
          id="fullName"
          label="Full Name"
          register={register}
          required
          placeholder="Alex Morgan"
          error={errors.fullName?.message}
        />
        <FormInput<FormValues>
          id="email"
          label="Email"
          register={register}
          required
          type="email"
          placeholder="alex@example.com"
          autoComplete="email"
          error={errors.email?.message}
        />
        <FormInput<FormValues>
          id="phoneNumber"
          label="Phone Number"
          register={register}
          required
          type="tel"
          placeholder="+1 555 123 4567"
          autoComplete="tel"
          error={errors.phoneNumber?.message}
        />
        <FormInput<FormValues>
          id="experience"
          label="Experience"
          register={register}
          required
          placeholder="4 years"
          error={errors.experience?.message}
        />
      </div>

      <FormInput<FormValues>
        id="address"
        label="Address"
        register={register}
        required
        placeholder="123 Market Street"
        error={errors.address?.message}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <FormInput<FormValues>
          id="city"
          label="City"
          register={register}
          required
          placeholder="Chicago"
          error={errors.city?.message}
        />
        <FormInput<FormValues>
          id="state"
          label="State"
          register={register}
          required
          placeholder="Illinois"
          error={errors.state?.message}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormInput<FormValues>
          id="highestQualification"
          label="Highest Qualification"
          register={register}
          required
          placeholder="Bachelor of Commerce"
          error={errors.highestQualification?.message}
        />
        <FormInput<FormValues>
          id="college"
          label="College / University"
          register={register}
          required
          placeholder="Northwestern University"
          error={errors.college?.message}
        />
      </div>

      <SkillsInput<FormValues>
        control={control}
        name="skills"
        label="Skills"
        required
        placeholder="Type a skill and press Add"
        error={errors.skills?.message}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <FormSelect<FormValues>
          id="preferredJobField"
          label="Preferred Job Field"
          register={register}
          required
          options={jobFields}
          error={errors.preferredJobField?.message}
        />
        <FormInput<FormValues>
          id="expectedSalary"
          label="Expected Salary"
          register={register}
          required
          placeholder="80000"
          error={errors.expectedSalary?.message}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {isSubmitting ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
}
