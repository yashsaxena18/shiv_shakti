"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  onMenuClick: () => void;
};

export default function AdminNavbar({
  onMenuClick,
}: Props) {
  const router = useRouter();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-white shadow-sm lg:ml-64">

      <div className="flex h-16 items-center justify-between px-4 md:px-6">

        {/* Left */}

        <div className="flex items-center gap-3">

          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 hover:bg-zinc-100 lg:hidden"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-lg font-bold text-orange-500 sm:text-xl md:text-2xl">
            Shiv Shakti
            <span className="hidden sm:inline">
              {" "}Multi Service
            </span>
          </h1>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <div className="hidden text-right md:block">

            <p className="font-semibold">
              {user.fullName}
            </p>

            <p className="text-sm capitalize text-zinc-500">
              {user.role}
            </p>

          </div>

          <button
            onClick={logout}
            className="rounded-xl bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}