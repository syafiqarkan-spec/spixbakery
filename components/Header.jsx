import Link from "next/link";
import { toko } from "@/lib/toko";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-garis/80 bg-latar/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-utama/15 text-utama transition-colors group-hover:bg-utama group-hover:text-white">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a5 5 0 0 0-5 5v1H6a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8h-1V7a5 5 0 0 0-5-5z" />
              <path d="M9 16v3" />
              <path d="M15 16v3" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-teks group-hover:text-utama transition-colors">
            {toko.nama}
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 text-sm font-semibold">
          <Link
            href="/#produk"
            className="rounded-lg px-2.5 py-1.5 text-teks-lembut transition-colors hover:bg-permukaan hover:text-utama sm:px-3"
          >
            Menu
          </Link>
          <Link
            href="/#keunggulan"
            className="hidden sm:inline-block rounded-lg px-3 py-1.5 text-teks-lembut transition-colors hover:bg-permukaan hover:text-utama"
          >
            Keunggulan
          </Link>
          <a
            href={`https://wa.me/${toko.nomorWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-utama px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-utama-gelap sm:text-sm"
          >
            <span>Pesan WA</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
