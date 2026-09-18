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

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export function SiteFooter() {
  return (
    <footer className="border-t border-white/20 bg-black text-white dark:border-black/20 dark:bg-white dark:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:py-10">

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
                href="https://maps.app.goo.gl/vYPjDSKxoQpwb3Eq6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-zinc-300 transition hover:text-white dark:text-zinc-700 dark:hover:text-black"
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

          {/* Socials */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
              Connect With Us
            </h3>

            <div className="mt-3 space-y-4">
              <div>
                <p className="mb-2 text-[10px] font-semibold text-zinc-500">Official</p>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/shivshaktimultiservice?stkn=MTh2aXo3Z2R2aWhlbw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] transition hover:opacity-80">
                    <InstagramIcon size={16} />
                  </a>
                  <a href="https://www.facebook.com/share/1Dbw2Y7CJj/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] transition hover:opacity-80">
                    <FacebookIcon size={16} />
                  </a>
                </div>
              </div>

              <div>
                <p className="mb-2 text-[10px] font-semibold text-zinc-500">Founder (Shubham Machal)</p>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/shubhammachaloffical?stkn=MXRhNzBwYWE2aDYxeA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] transition hover:opacity-80">
                    <InstagramIcon size={16} />
                  </a>
                  <a href="https://www.facebook.com/share/1DoKnhbV1S/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] transition hover:opacity-80">
                    <FacebookIcon size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/shubham-machal/" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] transition hover:opacity-80">
                    <LinkedinIcon size={16} />
                  </a>
                </div>
              </div>
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