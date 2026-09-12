"use client";

import { useState } from "react";
import AdminNavbar from "@/components/admin/admin-navbar";
import AdminProtected from "@/components/admin/admin-protected";
import AdminSidebar from "@/components/admin/admin-sidebar";
import MobileSidebar from "@/components/admin/mobile-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminProtected>
      <div className="min-h-screen bg-zinc-50">

        <AdminNavbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="flex">

  {/* Desktop Sidebar */}
  <AdminSidebar />

  {/* Mobile Sidebar */}
  <MobileSidebar
    open={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
  />

  {/* Main Content */}
  <main className="flex-1 overflow-x-hidden p-4 md:ml-64 md:p-6">
    {children}
  </main>

</div>

      </div>
    </AdminProtected>
  );
}