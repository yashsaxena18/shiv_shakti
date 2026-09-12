"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";


const navLinks = [
  { label: "Home", href: "/#home", sectionId: "home" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);
useEffect(() => {
  setMounted(true);

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  loadUser();

  window.addEventListener("storage", loadUser);
  window.addEventListener("focus", loadUser);

  return () => {
    window.removeEventListener("storage", loadUser);
    window.removeEventListener("focus", loadUser);
  };
}, [pathname]);


  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      setActiveSection(hash);
    }

    const sections = navLinks
      .map((link) => document.getElementById(link.sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection?.target.id) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

if (!mounted) {
  return null;
}

  const handleSectionNavigation = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    setIsMobileMenuOpen(false);

    if (pathname === "/") {
      event.preventDefault();
      const target = document.getElementById(sectionId);
      setActiveSection(sectionId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full overflow-x-hidden border-b border-zinc-200/80 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
  href="/"
  className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden"
>
          <div className="relative h-10 w-20 sm:h-12 sm:w-32 lg:h-14 lg:w-36 flex-shrink-0">
  <Image
    src="/logo.png"
    alt="Shiv Shakti Multi Service"
    fill
    className="object-contain rounded-lg"
    priority
  />
</div>
          <>
  <span className="block sm:hidden truncate text-[12px] font-semibold tracking-tight text-orange-300 dark:text-white">
    Shiv Shakti
  </span>

  <span className="hidden sm:block truncate text-sm lg:text-lg font-semibold tracking-tight text-orange-300 dark:text-white">
    Shiv Shakti Multi Service
  </span>
</>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-300 md:flex md:gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;

            return (
              <Link
                key={link.label}
                href={link.href}
                scroll={false}
                onClick={(event) => handleSectionNavigation(event, link.sectionId)}
                className={`whitespace-nowrap transition hover:text-zinc-950 dark:hover:text-white ${isActive ? "text-zinc-950 dark:text-white" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsDark((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-sm text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-white dark:hover:text-white"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {isDark ? "☀︎" : "☾"}
          </button>
          
          
          <div className="hidden items-center gap-2 sm:gap-3 md:flex">
  {user ? (
    <>
      <Link
        href={user.role === "admin" ? "/admin" : "/candidate/dashboard"}
        className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium"
      >
        Dashboard
      </Link>

      <button
        onClick={() => {
  localStorage.removeItem("user");
localStorage.removeItem("userId");
  window.dispatchEvent(new Event("storage"));
  router.push("/");
  router.refresh();
}}
        className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="rounded-full bg-zinc-700 px-4 py-2 text-sm font-medium text-white"
      >
        Register
      </Link>
    </>
  )}
</div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="md:hidden rounded-full bg-zinc-700 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-zinc-600 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white"
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-zinc-200 bg-white/95 px-4 py-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/95 sm:px-6 lg:px-8 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  scroll={false}
                  onClick={(event) => handleSectionNavigation(event, link.sectionId)}
                  className={`rounded-full px-3 py-2 text-left text-sm font-medium transition ${isActive ? "bg-zinc-700 text-white dark:bg-white dark:text-zinc-950" : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-2 pt-2">
  {user ? (
    <>
      <Link
        href={user.role === "admin" ? "/admin" : "/candidate/dashboard"}
        className="rounded-full border border-zinc-300 px-4 py-2 text-center text-sm font-medium"
      >
        Dashboard
      </Link>

      <button
        onClick={() => {
  localStorage.removeItem("user");
localStorage.removeItem("userId");
  window.dispatchEvent(new Event("storage"));
  router.push("/");
  router.refresh();
}}
        className="rounded-full bg-red-600 px-4 py-2 text-center text-sm font-medium text-white"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="rounded-full border border-zinc-300 px-4 py-2 text-center text-sm font-medium"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="rounded-full bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white"
      >
        Register
      </Link>
    </>
  )}
</div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
