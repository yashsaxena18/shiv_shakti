import Link from "next/link";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 px-4 py-12 text-zinc-300 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-lg font-semibold text-white">Shiv Shakti Multi Service</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-zinc-400">
            A premium registration experience for candidates who want to present their experience clearly and connect with the right opportunities.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">Explore</p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-400">
              <p>jobshiring.hrteam@gmail.com</p>
              <p>+91 7088642658</p>
              <p>Plot No. 1407 Salempur Mehdood Near Mantra Appartment, Nehru Colony, Haridwar, Uttarakhand</p>
              <p>Pincode 249403</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl text-center border-t border-zinc-800 pt-6 text-sm text-zinc-500">
        © 2026 Shiv Shakti Multi Service. All rights reserved.
      </div>
    </footer>
  );
}
