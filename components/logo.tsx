import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      {/* <div className="relative h-10 w-28 sm:h-12 sm:w-36">
        <Image
          src="/logo.png"
          alt="Shiv Shakti Multi Service"
          fill
          priority
          className="object-contain"
        />
      </div> */}

      <div className="hidden sm:block">
        <p className="text-xl tracking-widest  uppercase text-zinc-900">
          Recruitment CRM
        </p>
      </div>
    </Link>
  );
}