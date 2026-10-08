"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminSessionClient } from "@/lib/supabase/server";

export async function login(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const email = data?.get("email");
  const password = data?.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createAdminSessionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(email).trim(),
    password: String(password),
  });

  if (error) {
    return { error: "Email atau password salah." };
  }

  redirect("/admin");
}

export async function keluar() {
  const supabase = await createAdminSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function gantiPassword(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const passwordBaru = data?.get("password_baru");
  const konfirmasiPassword = data?.get("konfirmasi_password");

  if (!passwordBaru || typeof passwordBaru !== "string" || passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Password baru dan konfirmasi password tidak sama." };
  }

  const supabase = await createAdminSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: passwordBaru,
  });

  if (updateError) {
    return { error: updateError.message || "Gagal mengganti password." };
  }

  return { success: "Password berhasil diganti." };
}

export async function tambahProduk(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const nama = String(data?.get("nama") || "").trim();
  const hargaRaw = data?.get("harga");
  const harga = parseInt(hargaRaw, 10);
  const kategori = String(data?.get("kategori") || "").trim();
  const foto_url = String(data?.get("foto_url") || "").trim() || "/produk/croissant.svg";
  const deskripsi = String(data?.get("deskripsi") || "").trim();

  // Validasi login di server
  const supabase = await createAdminSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  // Validasi input
  if (!nama) {
    return { error: "Nama produk wajib diisi." };
  }

  if (isNaN(harga) || harga <= 0) {
    return { error: "Harga harus berupa angka positif lebih dari 0." };
  }

  const { error: insertError } = await supabase.from("produk").insert([
    {
      nama,
      harga,
      kategori: kategori || "Roti",
      foto_url,
      deskripsi,
    },
  ]);

  if (insertError) {
    return { error: insertError.message || "Gagal menambahkan produk." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function ubahProduk(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const idRaw = data?.get("id");
  const id = parseInt(idRaw, 10);
  const nama = String(data?.get("nama") || "").trim();
  const hargaRaw = data?.get("harga");
  const harga = parseInt(hargaRaw, 10);
  const kategori = String(data?.get("kategori") || "").trim();
  const foto_url = String(data?.get("foto_url") || "").trim();
  const deskripsi = String(data?.get("deskripsi") || "").trim();

  // Validasi login di server
  const supabase = await createAdminSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  if (isNaN(id) || id <= 0) {
    return { error: "ID produk tidak valid." };
  }

  if (!nama) {
    return { error: "Nama produk wajib diisi." };
  }

  if (isNaN(harga) || harga <= 0) {
    return { error: "Harga harus berupa angka positif lebih dari 0." };
  }

  const updateData = {
    nama,
    harga,
    kategori: kategori || "Roti",
    deskripsi,
  };

  if (foto_url) {
    updateData.foto_url = foto_url;
  }

  const { error: updateError } = await supabase
    .from("produk")
    .update(updateData)
    .eq("id", id);

  if (updateError) {
    return { error: updateError.message || "Gagal mengubah produk." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/produk/${id}`);
  redirect("/admin");
}

export async function hapusProduk(formData) {
  const idRaw = formData.get("id");
  const id = parseInt(idRaw, 10);

  // Validasi login di server
  const supabase = await createAdminSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  if (isNaN(id) || id <= 0) {
    return { error: "ID produk tidak valid." };
  }

  const { error: deleteError } = await supabase
    .from("produk")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return { error: deleteError.message || "Gagal menghapus produk." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function generateDeskripsiAI(formData) {
  // Validasi login di server
  const supabase = await createAdminSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  const nama = String(formData.get("nama") || "").trim();
  const kategori = String(formData.get("kategori") || "").trim();
  const info = String(formData.get("info") || "").trim();

  if (!nama) {
    return { error: "Nama produk wajib diisi sebelum membuat deskripsi." };
  }

  const apiKey =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GEMINI_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim();

  if (!apiKey) {
    const template = `${nama} adalah varian ${kategori || "roti"} istimewa dari Spix Bakery yang dipanggang segar setiap pagi dengan bahan berkualitas premium.${info ? ` ${info}.` : ""} Memiliki tekstur lembut dengan rasa yang kaya dan aroma harum, nikmat disantap untuk sarapan atau teman santai.`;
    return {
      deskripsi: template,
      catatan: "Dibuat otomatis dari template cerdas Spix Bakery (GEMINI_API_KEY belum disetel). Anda dapat mengedit teks ini.",
    };
  }

  try {
    const promptText = `Anda adalah copywriter profesional untuk bakery modern bernama "Spix Bakery". Buat deskripsi produk yang singkat (1-3 kalimat), menggugah selera, hangat, dan bernuansa fresh bakery dalam bahasa Indonesia. Jangan membuat klaim kesehatan yang tidak berdasar.
Detail Produk:
- Nama: ${nama}
- Kategori: ${kategori || "Roti & Pastry"}
- Info tambahan: ${info || "Dibuat dengan bahan pilihan dan dipanggang segar"}

Berikan teks deskripsi saja tanpa tanda kutip atau awalan.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const resData = await response.json();
    const aiText = resData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!aiText) {
      throw new Error("Respon kosong");
    }

    return { deskripsi: aiText };
  } catch (err) {
    const fallback = `${nama} adalah pilihan ${kategori || "roti"} lezat dari Spix Bakery dengan bahan pilihan dan aroma harum yang dipanggang segar.`;
    return {
      deskripsi: fallback,
      catatan: `Layanan AI mengalami kendala (${err.message}). Menampilkan draf alternatif yang dapat Anda sesuaikan.`,
    };
  }
}
