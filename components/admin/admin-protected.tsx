"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.replace("/login");
      return;
    }

    const parsedUser = JSON.parse(user);

    if (parsedUser.role !== "admin") {
      router.replace("/candidate/dashboard");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">

  <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-300 border-t-black" />

  <p className="text-zinc-500">
    Verifying session...
  </p>

</div>
      </div>
    );
  }

  return <>{children}</>;
}