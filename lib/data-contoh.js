// DATA CONTOH: hanya untuk tampilan awal sebelum terhubung ke database.
// Nama kolom sama persis dengan tabel "produk" di docs/schema.sql.
// Setelah US-01 selesai, halaman tidak lagi memakai file ini.

export const produkContoh = [
  {
    id: 1,
    nama: "Croissant Original",
    harga: 15000,
    deskripsi:
      "Croissant renyah berlapis dengan tekstur lembut dan buttery, dipanggang hingga keemasan. Cocok untuk sarapan atau teman menikmati kopi.",
    foto_url: "/produk/croissant.svg",
    kategori: "Pastry",
  },
  {
    id: 2,
    nama: "Roti Cokelat",
    harga: 10000,
    deskripsi:
      "Roti lembut dengan isian cokelat manis yang lumer. Perpaduan sederhana yang cocok dinikmati kapan saja.",
    foto_url: "/produk/roti-cokelat.svg",
    kategori: "Roti Manis",
  },
  {
    id: 3,
    nama: "Roti Keju",
    harga: 12000,
    deskripsi:
      "Roti empuk dengan isian keju gurih dan creamy. Perpaduan rasa manis dan gurih yang pas untuk segala suasana.",
    foto_url: "/produk/roti-keju.svg",
    kategori: "Roti Manis",
  },
  {
    id: 4,
    nama: "Roti Pisang Cokelat",
    harga: 12000,
    deskripsi:
      "Roti lembut dengan isian pisang manis dan cokelat yang lezat. Cocok untuk sarapan maupun camilan sore.",
    foto_url: "/produk/roti-pisang-cokelat.svg",
    kategori: "Roti Manis",
  },
  {
    id: 5,
    nama: "Donat Cokelat",
    harga: 10000,
    deskripsi:
      "Donat lembut dan empuk dengan topping cokelat manis yang menggugah selera. Nikmat disantap bersama kopi atau susu.",
    foto_url: "/produk/donat-cokelat.svg",
    kategori: "Donat",
  },
  {
    id: 6,
    nama: "Roti Sosis",
    harga: 13000,
    deskripsi:
      "Roti gurih dan lembut dengan isian sosis yang lezat. Pilihan praktis untuk sarapan atau camilan yang mengenyangkan.",
    foto_url: "/produk/roti-sosis.svg",
    kategori: "Roti Gurih",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}
