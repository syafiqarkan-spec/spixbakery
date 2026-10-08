import Link from "next/link";
import { notFound } from "next/navigation";
import TombolWhatsApp from "@/components/TombolWhatsApp";
import { formatRupiah } from "@/lib/format";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanDetailProduk({ params }) {
  const { id } = await params;

  const supabase = createServerClient();
  const { data: produk, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !produk) {
    notFound();
  }

  return (
    <article className="grid items-start gap-8 py-8 md:grid-cols-2 md:gap-12 md:py-12">
      <div className="overflow-hidden rounded-3xl border border-garis bg-white p-3 shadow-sm">
        <img
          src={produk.foto_url}
          alt={produk.nama}
          className="aspect-square w-full rounded-2xl object-cover bg-permukaan/30"
        />
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teks-lembut transition-colors hover:text-utama"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke katalog
        </Link>

        {produk.kategori && (
          <span className="self-start rounded-full border border-garis bg-permukaan/60 px-3 py-1 text-xs font-bold text-teks-lembut">
            {produk.kategori}
          </span>
        )}

        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-teks sm:text-4xl">
          {produk.nama}
        </h1>

        <div className="self-start rounded-xl bg-harga-latar px-3.5 py-1.5 text-2xl font-extrabold text-harga">
          {formatRupiah(produk.harga)}
        </div>

        <div className="rounded-2xl border border-garis/80 bg-permukaan/30 p-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teks-lembut">
            Deskripsi Produk
          </h2>
          <p className="mt-1.5 leading-relaxed text-teks-lembut text-sm sm:text-base">
            {produk.deskripsi}
          </p>
        </div>

        <div className="pt-2">
          <TombolWhatsApp produk={produk} />
        </div>
      </div>
    </article>
  );
}
