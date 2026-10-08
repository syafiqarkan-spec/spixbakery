"use client";

import { useTransition } from "react";
import { formatRupiah } from "@/lib/format";
import Tombol from "@/components/Tombol";
import { hapusProduk } from "@/app/admin/actions";

export default function TabelProduk({ daftarProduk = [] }) {
  const [isPending, startTransition] = useTransition();

  const handleHapus = (id, nama) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${nama}"?`)) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("id", id);
        const res = await hapusProduk(formData);
        if (res?.error) {
          alert(res.error);
        }
      });
    }
  };

  if (!daftarProduk || daftarProduk.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-garis bg-permukaan/40 py-12 text-center">
        <p className="text-sm font-semibold text-teks-lembut">Belum ada produk di database.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-garis bg-white shadow-xs">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="border-b border-garis bg-permukaan/80 text-teks-lembut">
          <tr>
            <th className="px-4 py-3.5 font-bold text-teks">Produk</th>
            <th className="px-4 py-3.5 font-bold text-teks">Kategori</th>
            <th className="px-4 py-3.5 font-bold text-teks">Harga</th>
            <th className="px-4 py-3.5 text-right font-bold text-teks">
              <span className="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-garis">
          {daftarProduk.map((produk) => (
            <tr key={produk.id} className="transition-colors hover:bg-permukaan/30">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={produk.foto_url || "/produk/croissant.svg"}
                    alt={produk.nama}
                    className="h-11 w-11 rounded-xl border border-garis/60 bg-permukaan object-cover"
                  />
                  <div>
                    <span className="block font-bold text-teks">{produk.nama}</span>
                    {produk.deskripsi && (
                      <span className="line-clamp-1 max-w-xs text-xs text-teks-lembut">
                        {produk.deskripsi}
                      </span>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block rounded-full border border-garis/60 bg-permukaan px-2.5 py-0.5 text-xs font-semibold text-teks-lembut">
                  {produk.kategori || "Roti"}
                </span>
              </td>
              <td className="px-4 py-3 font-bold text-harga">
                {formatRupiah(produk.harga)}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Tombol href={`/admin/produk/${produk.id}/ubah`} varian="garis" className="px-3 py-1.5 text-xs">
                    Ubah
                  </Tombol>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleHapus(produk.id, produk.nama)}
                    className="inline-flex items-center justify-center rounded-lg border border-garis bg-latar px-3 py-1.5 text-xs font-semibold text-bahaya transition-colors hover:border-bahaya hover:bg-bahaya/5 disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
