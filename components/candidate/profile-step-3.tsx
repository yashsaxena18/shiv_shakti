type JobCategories = Record<string, string[]>;

type Props = {
  highestQualification: string;
  college: string;
  passingYear: string;
  skills: string;

  // First dropdown
  selectedJobField: string;

  // Second dropdown
  preferredJobField: string;

  experience: string;

  jobCategories: JobCategories;
  jobCategoryNames: string[];

  errors: Record<string, string>;

  onChange: (
    field:
      | "highestQualification"
      | "college"
      | "passingYear"
      | "skills"
      | "preferredJobField"
      | "experience",
    value: string
  ) => void;

  onJobFieldChange: (value: string) => void;
};

const experienceLevels = ["Fresher", "Experienced"];

export default function ProfileStep3({
  highestQualification,
  college,
  passingYear,
  skills,
  selectedJobField,
  preferredJobField,
  experience,
  jobCategories,
  jobCategoryNames,
  onChange,
  onJobFieldChange,
  errors,
}: Props) {
  const availableJobs =
    selectedJobField && jobCategories[selectedJobField]
      ? jobCategories[selectedJobField]
      : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Professional Details
        </h2>

        <p className="mt-2 text-zinc-500">
          Tell recruiters about your education, skills and career interests.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {/* Highest Qualification */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Highest Qualification
          </label>

          <input
            value={highestQualification}
            onChange={(e) =>
              onChange("highestQualification", e.target.value)
            }
            placeholder="Highest Qualification"
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
              errors.highestQualification
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          />

          {errors.highestQualification && (
            <p className="mt-1 text-sm text-red-500">
              {errors.highestQualification}
            </p>
          )}
        </div>

        {/* Passing Year */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Passing Year
          </label>

          <input
            value={passingYear}
            onChange={(e) =>
              onChange("passingYear", e.target.value)
            }
            placeholder="Passing Year"
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
              errors.passingYear
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          />

          {errors.passingYear && (
            <p className="mt-1 text-sm text-red-500">
              {errors.passingYear}
            </p>
          )}
        </div>

        {/* College */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold">
            College / University
          </label>

          <input
            value={college}
            onChange={(e) =>
              onChange("college", e.target.value)
            }
            placeholder="College / University"
            className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 transition-all duration-200 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        {/* Skills */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold">
            Skills
          </label>

          <input
            value={skills}
            onChange={(e) =>
              onChange("skills", e.target.value)
            }
            placeholder="React, SQL, Java..."
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
              errors.skills
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          />

          {errors.skills && (
            <p className="mt-1 text-sm text-red-500">
              {errors.skills}
            </p>
          )}
        </div>

        {/* Job Field - First Dropdown */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Job Field
          </label>

          <select
            value={selectedJobField}
            onChange={(e) =>
              onJobFieldChange(e.target.value)
            }
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
              errors.selectedJobField
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          >
            <option value="">
              Select Job Field
            </option>

            {jobCategoryNames.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>

          {errors.selectedJobField && (
            <p className="mt-1 text-sm text-red-500">
              {errors.selectedJobField}
            </p>
          )}
        </div>

        {/* Preferred Job - Second Dropdown */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Preferred Job
          </label>

          <select
            value={preferredJobField}
            onChange={(e) =>
              onChange("preferredJobField", e.target.value)
            }
            disabled={!selectedJobField}
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 ${
              errors.preferredJobField
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          >
            <option value="">
              {selectedJobField
                ? "Select Preferred Job"
                : "First select Job Field"}
            </option>

            {availableJobs.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>

          {errors.preferredJobField && (
            <p className="mt-1 text-sm text-red-500">
              {errors.preferredJobField}
            </p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Experience
          </label>

          <select
            value={experience}
            onChange={(e) =>
              onChange("experience", e.target.value)
            }
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
              errors.experience
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          >
            <option value="">
              Select Experience
            </option>

            {experienceLevels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {errors.experience && (
            <p className="mt-1 text-sm text-red-500">
              {errors.experience}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}