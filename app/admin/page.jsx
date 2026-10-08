import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { createAdminSessionClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanAdmin() {
  let daftarProduk = [];
  let errorMsg = null;

  try {
    const supabase = await createAdminSessionClient();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      errorMsg = error.message;
    } else {
      daftarProduk = data || [];
    }
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : "Gagal memuat daftar produk";
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-teks">Daftar Produk</h1>
          <p className="text-xs text-teks-lembut sm:text-sm">
            Kelola menu produk toko yang tampil di katalog Spix Bakery
          </p>
        </div>
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>

      {errorMsg ? (
        <div className="rounded-2xl border border-garis bg-permukaan p-4 text-sm text-bahaya">
          {errorMsg}
        </div>
      ) : (
        <TabelProduk daftarProduk={daftarProduk} />
      )}
    </div>
  );
}
