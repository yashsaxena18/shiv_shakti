"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { UserCircle2, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";

export function DashboardNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [name, setName] = useState("Candidate");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.fullName) {
      setName(user.fullName);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    router.replace("/login");
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

        {/* Logo */}

        <Link
  href="/candidate/dashboard"
  className="max-w-[70%] truncate text-base font-bold text-orange-500 sm:max-w-none sm:text-xl lg:text-2xl"
>
  Shiv Shakti
  <span className="hidden sm:inline">
    {" "}Multi Service
  </span>
</Link>

        {/* Desktop Menu */}

        <div className="hidden items-center gap-6 md:flex">

          <Link
            href="/candidate/dashboard"
            className={`text-sm ${
              pathname === "/candidate/dashboard"
                ? "text-orange-500 font-bold"
                : "text-zinc-600 hover:text-orange-500"
            }`}
          >
            Dashboard
          </Link>



          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <button className="flex items-center gap-2 rounded-full border px-3 py-2 hover:bg-zinc-100">

                <UserCircle2 size={28} />

                <div className="text-left">

                  <p className="text-sm font-semibold">
                    {name}
                  </p>

                  <p className="text-xs text-zinc-500">
                    Candidate
                  </p>

                </div>

                <ChevronDown size={18} />

              </button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">



              <DropdownMenuItem
                onClick={logout}
                className="text-red-600"
              >
                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </div>

        {/* Mobile Menu */}

        <div className="md:hidden">

          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <button className="rounded-lg border p-2 hover:bg-zinc-100">

                <Menu size={22} />

              </button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              <DropdownMenuItem asChild>

                <Link href="/candidate/dashboard">
                  Dashboard
                </Link>

              </DropdownMenuItem>



              <DropdownMenuItem
                onClick={logout}
                className="text-red-600"
              >
                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </div>

      </div>
    </header>
  );
}