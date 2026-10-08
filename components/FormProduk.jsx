"use client";

import { useActionState, useState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { generateDeskripsiAI } from "@/app/admin/actions";

export default function FormProduk({ action, produk = {}, labelTombol }) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [deskripsi, setDeskripsi] = useState(produk.deskripsi || "");
  const [nama, setNama] = useState(produk.nama || "");
  const [kategori, setKategori] = useState(produk.kategori || "");
  const [loadingAI, setLoadingAI] = useState(false);
  const [catatanAI, setCatatanAI] = useState(null);

  const handleGenerateAI = async () => {
    if (!nama.trim()) {
      alert("Harap isi nama produk terlebih dahulu.");
      return;
    }

    setLoadingAI(true);
    setCatatanAI(null);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("kategori", kategori);
    formData.append("info", deskripsi);

    try {
      const res = await generateDeskripsiAI(formData);
      if (res?.error) {
        alert(res.error);
      } else if (res?.deskripsi) {
        setDeskripsi(res.deskripsi);
        if (res.catatan) {
          setCatatanAI(res.catatan);
        }
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menghubungi layanan AI.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      {produk.id && <input type="hidden" name="id" value={produk.id} />}

      {state?.error && (
        <div className="rounded-xl border border-garis bg-permukaan p-3.5 text-sm text-bahaya">
          {state.error}
        </div>
      )}

      <Input
        label="Nama produk"
        name="nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Contoh: Croissant Cokelat"
        required
      />

      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="1"
        defaultValue={produk.harga}
        placeholder="Contoh: 15000"
        required
      />

      <Input
        label="Kategori"
        name="kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        placeholder="Contoh: Pastry, Roti Manis, Donat"
      />

      <Input
        label="Link foto"
        name="foto_url"
        placeholder="/produk/croissant.svg atau URL gambar eksternal"
        defaultValue={produk.foto_url}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-teks">Deskripsi</label>
          <button
            type="button"
            disabled={loadingAI}
            onClick={handleGenerateAI}
            className="inline-flex items-center gap-1 rounded-lg border border-garis bg-permukaan px-2.5 py-1 text-xs font-bold text-utama hover:border-utama hover:bg-white transition-all disabled:opacity-50"
          >
            <span>{loadingAI ? "⏳ Sedang memproses..." : "✨ Buat Deskripsi dengan AI"}</span>
          </button>
        </div>

        {catatanAI && (
          <p className="rounded-lg bg-permukaan/80 p-2 text-xs text-teks-lembut border border-garis/60">
            {catatanAI}
          </p>
        )}

        <textarea
          name="deskripsi"
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Tuliskan deskripsi atau gunakan tombol AI di atas..."
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Tombol type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : labelTombol}
        </Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
