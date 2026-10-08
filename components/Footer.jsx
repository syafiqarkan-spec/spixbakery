import Link from "next/link";
import { toko } from "@/lib/toko";

export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-garis bg-permukaan/70">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-extrabold tracking-tight text-teks">{toko.nama}</h3>
            <p className="text-sm font-medium text-utama">{toko.tagline}</p>
            <p className="mt-2 text-xs text-teks-lembut leading-relaxed">
              Dipanggang segar setiap pagi dengan bahan pilihan untuk menemani setiap momen bahagiamu.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 text-sm text-teks-lembut">
            <h4 className="font-bold text-teks">Informasi Toko</h4>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-teks min-w-16">Alamat:</span>
              <span>{toko.alamat}</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-teks min-w-16">Jam Buka:</span>
              <span>{toko.jamBuka}</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-teks min-w-16">WhatsApp:</span>
              <span>+{toko.nomorWhatsApp}</span>
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-teks-lembut">
            <h4 className="font-bold text-teks">Navigasi</h4>
            <Link href="/#produk" className="hover:text-utama transition-colors">
              Fresh From Our Oven
            </Link>
            <Link href="/#keunggulan" className="hover:text-utama transition-colors">
              Kenapa Spix Bakery
            </Link>
            <Link
              href="/admin"
              className="mt-3 inline-flex items-center text-xs text-teks-lembut underline underline-offset-4 hover:text-utama transition-colors"
            >
              Masuk sebagai admin
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-garis/80 pt-6 text-center text-xs text-teks-lembut">
          <p>© {tahun} {toko.nama}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
