
type ProfileStep2Props = {
  address: string;
  city: string;
  state: string;
  pincode: string;

  onChange: (
    field: "address" | "city" | "state" | "pincode",
    value: string
  ) => void;

  errors: Record<string, string>;
};


export default function ProfileStep2({
  address,
  city,
  state,
  pincode,
  onChange,
  errors,
}: ProfileStep2Props) {
  return (
  <div className="space-y-6">

    <div>
      <h2 className="text-3xl font-bold tracking-tight">
        Location Details
      </h2>

      <p className="mt-2 text-zinc-500">
        Tell recruiters where you're currently located.
      </p>
    </div>

    <div className="grid gap-5 md:grid-cols-2">

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-semibold">
          Address
        </label>

        <input
          value={address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Enter your address"
          className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 transition-all duration-200 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
          
        />
        {errors.address && (
  <p className="mt-1 text-sm text-red-600">
    {errors.address}
  </p>
)}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          City
        </label>

        <input
          value={city}
          onChange={(e) => onChange("city", e.target.value)}
          placeholder="Enter your city"
          className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 transition-all duration-200 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
          
        />
        {errors.city && (
  <p className="mt-1 text-sm text-red-600">
    {errors.city}
  </p>
)}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          State
        </label>

        <input
          value={state}
          onChange={(e) => onChange("state", e.target.value)}
          placeholder="Enter your state"
          className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 transition-all duration-200 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
          
        />
        {errors.state && (
  <p className="mt-1 text-sm text-red-600">
    {errors.state}
  </p>
)}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Pincode
        </label>

        <input
          value={pincode}
          onChange={(e) => onChange("pincode", e.target.value)}
          placeholder="Enter your pincode"
          className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 transition-all duration-200 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900"
          
        />
        {errors.pincode && (
  <p className="mt-1 text-sm text-red-600">
    {errors.pincode}
  </p>
)}
      </div>

    </div>

  </div>
);
}