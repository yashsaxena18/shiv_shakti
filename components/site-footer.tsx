import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const links = [
  ["Home", "/#home"],
  ["About", "/#how-it-works"],
  ["Companies", "/#companies"],
  ["Fees", "/#registration"],
  ["Candidates", "/#stories"],
  ["Contact", "/#contact"],
  ["Register", "/register"],
  ["Login", "/login"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/20 bg-black text-white dark:border-black/20 dark:bg-white dark:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3 lg:py-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white dark:bg-black">
                <Image
                  src="/logo_img.png"
                  alt="Shiv Shakti Multi Service"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                  priority
                />
              </div>

              <div>
                <p className="text-base font-extrabold uppercase tracking-[0.1em]">
                  Shiv Shakti
                </p>

                <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">
                  Multi Service
                </p>
              </div>
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-5 text-zinc-300 dark:text-zinc-700">
              A candidate-focused recruitment platform helping job seekers
              create professional profiles and explore career opportunities.
            </p>

            <Link
              href="/register"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-black transition hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-800"
            >
              Create Profile
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
              Quick Links
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
              {links.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-1 text-xs text-zinc-200 transition hover:text-white dark:text-zinc-800 dark:hover:text-black"
                >
                  {label}

                  <ArrowUpRight
                    size={10}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
              Contact
            </h3>

            <div className="mt-3 space-y-2.5">
              <a
                href="#contact"
                className="flex items-center gap-2 text-xs text-zinc-300 dark:text-zinc-700"
              >
                <MapPin size={14} />
                Haridwar, Uttarakhand
              </a>

              <a
                href="mailto:jobshiring.hrteam@gmail.com"
                className="flex items-center gap-2 text-xs text-zinc-300 dark:text-zinc-700"
              >
                <Mail size={14} />

                <span className="truncate">
                  jobshiring.hrteam@gmail.com
                </span>
              </a>

              <a
                href="tel:+917088642658"
                className="flex items-center gap-2 text-xs text-zinc-300 dark:text-zinc-700"
              >
                <Phone size={14} />
                +91 7088642658
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-2 border-t border-white/20 py-4 text-[10px] text-zinc-400 dark:border-black/20 dark:text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Shiv Shakti Multi Service.</p>

          <div className="flex flex-wrap items-center gap-3">

            <Link href="/terms" className="rounded-md border border-white/40 px-2.5 py-1 font-semibold text-white transition hover:bg-white hover:text-black dark:border-black/30 dark:text-black dark:hover:bg-black dark:hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}