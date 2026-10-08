import Link from "next/link";
import KartuProduk from "@/components/KartuProduk";
import TombolWhatsApp from "@/components/TombolWhatsApp";
import { toko } from "@/lib/toko";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog() {
  let daftarProduk = null;
  let pesanError = null;

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      pesanError = error.message;
    } else {
      daftarProduk = data;
    }
  } catch (err) {
    pesanError = err instanceof Error ? err.message : "Terjadi kesalahan saat memuat data.";
  }

  return (
    <div className="flex flex-col gap-16 py-8 sm:gap-24 sm:py-12">
      {/* HERO SECTION */}
      <section className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
        <div className="flex flex-col gap-5 md:col-span-7">
          <div className="inline-flex self-start items-center gap-2 rounded-full border border-garis bg-permukaan/80 px-3.5 py-1 text-xs font-bold text-utama">
            <span>🥖</span>
            <span>Dipanggang Segar Setiap Pagi</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-teks sm:text-5xl lg:text-6xl">
            Roti Hangat, Kebahagiaan Setiap Hari
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-teks-lembut sm:text-lg">
            Nikmati roti dan pastry fresh yang dibuat dengan bahan pilihan untuk menemani setiap momen.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link
              href="#produk"
              className="inline-flex items-center justify-center rounded-xl bg-utama px-6 py-3.5 text-sm font-bold text-white shadow-xs transition hover:bg-utama-gelap hover:shadow-md"
            >
              Lihat Produk
            </Link>
            <a
              href={`https://wa.me/${toko.nomorWhatsApp}?text=${encodeURIComponent(`Halo ${toko.nama}, saya ingin memesan roti fresh.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-garis bg-white px-6 py-3.5 text-sm font-bold text-teks shadow-xs transition hover:border-utama hover:text-utama"
            >
              Pesan Sekarang
            </a>
          </div>

          <div className="mt-4 flex items-center gap-6 border-t border-garis/60 pt-4 text-xs text-teks-lembut">
            <div className="flex items-center gap-2">
              <span className="text-base">✨</span>
              <span>100% Mentega Murni</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">🍞</span>
              <span>Tanpa Pengawet</span>
            </div>
          </div>
        </div>

        <div className="relative md:col-span-5">
          <div className="relative overflow-hidden rounded-3xl border border-garis bg-white p-3 shadow-md">
            <img
              src="/produk/croissant.svg"
              alt="Spix Bakery Artisan Bread"
              className="aspect-square w-full rounded-2xl object-cover bg-permukaan/40"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-garis/80 bg-white/95 p-3.5 shadow-lg backdrop-blur-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-utama">Fresh from Oven</p>
                  <p className="text-sm font-extrabold text-teks">Spix Bakery Signature</p>
                </div>
                <span className="rounded-lg bg-harga-latar px-2 py-1 text-xs font-extrabold text-harga">
                  Mulai Rp 10.000
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PRODUK */}
      <section id="produk" aria-labelledby="judul-produk" className="flex flex-col gap-8 scroll-mt-24">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-utama">Pilihan Menu</span>
          <h2 id="judul-produk" className="text-2xl font-extrabold text-teks sm:text-3xl">
            Fresh From Our Oven
          </h2>
          <p className="text-sm text-teks-lembut sm:text-base">
            Pilihan roti dan pastry favorit yang dibuat fresh untuk kamu.
          </p>
        </div>

        {pesanError ? (
          <div className="rounded-2xl border border-garis bg-permukaan p-5 text-sm text-bahaya">
            <p className="font-semibold">Gagal memuat produk</p>
            <p className="mt-1 text-teks-lembut">{pesanError}</p>
          </div>
        ) : daftarProduk && daftarProduk.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-garis bg-permukaan/40 py-12 text-center">
            <p className="text-base font-semibold text-teks-lembut">Belum ada produk</p>
          </div>
        )}
      </section>

      {/* SECTION KEUNGGULAN */}
      <section id="keunggulan" className="rounded-3xl border border-garis bg-permukaan/50 p-6 sm:p-10 scroll-mt-24">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-utama">Kualitas Terjamin</span>
          <h2 className="mt-1 text-2xl font-extrabold text-teks sm:text-3xl">Kenapa Spix Bakery?</h2>
          <p className="mt-2 text-sm text-teks-lembut sm:text-base">
            Komitmen kami untuk selalu menyajikan kualitas roti terbaik di setiap gigitan.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <div className="rounded-2xl border border-garis bg-white p-5 shadow-2xs">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-utama/10 text-xl">
              🌅
            </div>
            <h3 className="text-base font-bold text-teks">Fresh Every Day</h3>
            <p className="mt-1 text-xs leading-relaxed text-teks-lembut">
              Dipanggang setiap pagi hari tanpa pengawet untuk aroma dan kelezatan maksimal.
            </p>
          </div>

          <div className="rounded-2xl border border-garis bg-white p-5 shadow-2xs">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-utama/10 text-xl">
              🌾
            </div>
            <h3 className="text-base font-bold text-teks">Bahan Berkualitas</h3>
            <p className="mt-1 text-xs leading-relaxed text-teks-lembut">
              Tepung premium, cokelat asli, dan mentega pilihan untuk tekstur yang lembut dan nikmat.
            </p>
          </div>

          <div className="rounded-2xl border border-garis bg-white p-5 shadow-2xs">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-utama/10 text-xl">
              ❤️
            </div>
            <h3 className="text-base font-bold text-teks">Dibuat dengan Hati</h3>
            <p className="mt-1 text-xs leading-relaxed text-teks-lembut">
              Setiap adonan dibuat secara higienis dengan ketelitian resep autentik baker kami.
            </p>
          </div>

          <div className="rounded-2xl border border-garis bg-white p-5 shadow-2xs">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-utama/10 text-xl">
              ☕
            </div>
            <h3 className="text-base font-bold text-teks">Siap Menemani Harimu</h3>
            <p className="mt-1 text-xs leading-relaxed text-teks-lembut">
              Pilihan sempurna untuk sarapan pagi, camilan sore, hingga acara kumpul bersama.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION CTA */}
      <section className="rounded-3xl border border-garis bg-gradient-to-br from-permukaan via-white to-harga-latar/30 p-8 text-center sm:p-12 shadow-xs">
        <div className="mx-auto max-w-xl flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-utama/10 text-2xl">
            🥐
          </div>
          <h2 className="text-2xl font-extrabold text-teks sm:text-3xl">
            Siap Menemukan Roti Favoritmu?
          </h2>
          <p className="text-sm text-teks-lembut sm:text-base leading-relaxed">
            Pesan sekarang dan nikmati roti fresh dari Spix Bakery. Kami siap melayani pesananmu dengan hangat.
          </p>
          <div className="mt-2 w-full sm:w-auto">
            <TombolWhatsApp>Pesan Sekarang via WhatsApp</TombolWhatsApp>
          </div>
        </div>
      </section>
    </div>
  );
}
