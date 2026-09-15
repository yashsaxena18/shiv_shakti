"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowRight, LogIn, LogOut, Menu, Moon, Sun, UserRound, X, Building2 } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/#home", section: "home" },
  { label: "About", href: "/#how-it-works", section: "how-it-works" },
  { label: "Companies", href: "/#companies", section: "companies" },
  { label: "Fees", href: "/#register", section: "register" },
  { label: "Stories", href: "/#stories", section: "stories" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  /* Theme */
  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem("theme");
    const dark =
      storedTheme === "dark" ||
      (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const dark = !isDark;

    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
    setIsDark(dark);
  };

  /* User / Auth */
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem("user");
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("focus", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("focus", loadUser);
    };
  }, [pathname]);

  /* Active sections */
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "how-it-works", "companies", "register", "stories", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* Lock body while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  /* Navigation */
  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const [path, hash] = href.split("#");

    if (path === "/" && hash && pathname === "/") {
      event.preventDefault();

      const target = document.getElementById(hash);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setIsMobileMenuOpen(false);
      return;
    }

    setIsMobileMenuOpen(false);
  };

  /* Logout */
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUser(null);
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const dashboardHref =
    user?.role === "admin" ? "/admin" : user?.role === "employer" ? "/employer/dashboard" : "/candidate/dashboard";

  const themeButton = mounted ? (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {isDark ? (
        <Sun size={16} strokeWidth={1.8} />
      ) : (
        <Moon size={16} strokeWidth={1.8} />
      )}
    </button>
  ) : null;

  return (
    <>
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div className="px-3 pt-3 sm:px-5 sm:pt-4 lg:px-7">
          <nav className="mx-auto flex min-h-[68px] max-w-7xl items-center justify-between gap-3 rounded-2xl border border-zinc-800/35 bg-white/95 px-3 py-2.5 shadow-[0_10px_35px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:min-h-[76px] sm:px-5 sm:py-3 dark:border-white/15 dark:bg-zinc-950/95 dark:shadow-black/30">

            {/* Brand */}
            <Link
              href="/"
              aria-label="Shiv Shakti Multi Service - Home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="group flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-white transition-transform duration-200 group-hover:scale-[1.02] sm:h-12 sm:w-12 dark:border-white/10 dark:bg-zinc-900">
                <Image
                  src="/logo_img.png"
                  alt="Shiv Shakti Multi Service"
                  fill
                  priority
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate font-serif text-[20px] font-semibold leading-none tracking-[-0.03em] text-zinc-950 sm:text-[24px] dark:text-white">
                  Shiv Shakti
                </p>
                <p className="mt-1 truncate text-[8px] font-medium uppercase leading-none tracking-[0.3em] text-zinc-500 sm:text-[9px] dark:text-zinc-400">
                  Multi Service
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const active =
                  pathname === "/" && activeSection === link.section;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className={`relative rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 xl:px-3.5 xl:text-sm ${
                      active
                        ? "text-zinc-950 dark:text-white"
                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    {link.label}

                    {active && (
                      <span className="absolute bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-zinc-950 dark:bg-white" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-1.5 lg:flex">
              {themeButton}

              {user ? (
                <>
                  <Link
                    href={dashboardHref}
                    className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 text-xs font-semibold text-zinc-800 transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    <UserRound size={14} />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-zinc-950 px-3.5 text-xs font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/employer/login"
                    className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold text-zinc-700 transition-all hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    <Building2 size={14} />
                    Employer
                  </Link>

                  <Link
                    href="/login"
                    className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold text-zinc-700 transition-all hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    <LogIn size={14} />
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="group inline-flex h-9 items-center gap-1.5 rounded-xl bg-zinc-950 px-4 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    Register
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
              {themeButton}

              <button
                type="button"
                onClick={() =>
                  setIsMobileMenuOpen((current) => !current)
                }
                aria-label={
                  isMobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isMobileMenuOpen}
                className="flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 transition-all duration-200 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                {isMobileMenuOpen ? (
                  <X size={19} strokeWidth={1.8} />
                ) : (
                  <Menu size={19} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-[90] bg-zinc-950/20 backdrop-blur-[2px] lg:hidden dark:bg-black/40"
          />

          <div className="fixed left-3 right-3 top-[86px] z-[110] origin-top animate-in fade-in zoom-in-95 duration-200 lg:hidden">
            <div className="overflow-hidden rounded-2xl border border-zinc-800/25 bg-white p-2 shadow-[0_25px_70px_-25px_rgba(15,23,42,0.4)] dark:border-white/10 dark:bg-zinc-950 dark:shadow-black/50">

              {/* Links */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const active =
                    pathname === "/" &&
                    activeSection === link.section;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(event) =>
                        handleNavClick(event, link.href)
                      }
                      className={`flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-zinc-100 text-zinc-950 dark:bg-white/10 dark:text-white"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="my-2 h-px bg-zinc-200 dark:bg-white/10" />

              {/* Mobile User Actions */}
              {user ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={dashboardHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:text-white"
                  >
                    <UserRound size={15} />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-3 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    href="/employer/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:text-white"
                  >
                    <Building2 size={15} />
                    Employer Portal
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:text-white"
                    >
                      <LogIn size={15} />
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-3 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950"
                    >
                      Register
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}