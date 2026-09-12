"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      localStorage.removeItem("user");
      localStorage.removeItem("userId");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const menus = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Candidates",
      href: "/admin/candidates",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-white shadow-sm lg:flex lg:flex-col">

      {/* Logo */}

      <div className="border-b px-6 py-5">
        <h1 className="text-xl font-bold text-orange-500">
          Shiv Shakti
        </h1>

        <p className="text-sm text-zinc-500">
          Multi Service
        </p>
      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">

        {menus.map((menu) => {
          const Icon = menu.icon;

          const active = pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all ${
                active
                  ? "bg-black text-white shadow"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              <Icon size={20} />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="border-t p-4">

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}