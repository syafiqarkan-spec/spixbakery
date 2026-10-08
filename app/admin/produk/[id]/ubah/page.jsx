import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { ubahProduk } from "@/app/admin/actions";
import { createAdminSessionClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanUbahProduk({ params }) {
  const { id } = await params;

  const supabase = await createAdminSessionClient();
  const { data: produk, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold text-teks">Ubah Produk</h1>
        <p className="mt-1 text-sm text-teks-lembut">
          Perbarui informasi produk &quot;{produk.nama}&quot; di katalog Spix Bakery.
        </p>
      </div>
      <FormProduk
        action={ubahProduk}
        produk={produk}
        labelTombol="Simpan perubahan"
      />
    </div>
  );
}
