import Link from "next/link";
import { formatRupiah } from "@/lib/format";

export default function KartuProduk({ produk }) {
  return (
    <Link
      href={`/produk/${produk.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-garis bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-permukaan/40">
        <img
          src={produk.foto_url}
          alt={produk.nama}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {produk.kategori && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-teks-lembut shadow-xs backdrop-blur-xs">
            {produk.kategori}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="text-sm font-bold text-teks leading-snug transition-colors group-hover:text-utama sm:text-base line-clamp-1">
          {produk.nama}
        </h3>
        {produk.deskripsi && (
          <p className="mt-1 text-xs text-teks-lembut line-clamp-2 leading-relaxed">
            {produk.deskripsi}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-garis/60">
          <span className="rounded-lg bg-harga-latar px-2.5 py-1 text-xs font-extrabold text-harga sm:text-sm">
            {formatRupiah(produk.harga)}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-utama group-hover:underline">
            <span>Detail</span>
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
