"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  X,
  Building2,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSidebar({
  open,
  onClose,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

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
      name: "Employers",
      href: "/admin/employers",
      icon: Building2,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    router.replace("/login");
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold">
            Shiv Shakti Multi Service
          </h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>

        </div>

        <nav className="space-y-2 p-4">

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  pathname === menu.href
                    ? "bg-black text-white"
                    : "hover:bg-zinc-100"
                }`}
              >
                <Icon size={20} />
                {menu.name}
              </Link>
            );
          })}

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50"
          >
            <LogOut size={20} />
            Logout
          </button>

        </nav>
      </aside>
    </>
  );
}
