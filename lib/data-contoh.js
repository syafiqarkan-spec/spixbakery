// DATA CONTOH: hanya untuk tampilan awal sebelum terhubung ke database.
// Nama kolom sama persis dengan tabel "produk" di docs/schema.sql.
// Setelah US-01 selesai, halaman tidak lagi memakai file ini.

export const produkContoh = [
  {
    id: 1,
    nama: "Croissant",
    harga: 15000,
    deskripsi:
      "Croissant renyah dengan lapisan pastry yang lembut dan buttery. Dipanggang hingga berwarna keemasan dengan aroma harum yang menggugah selera. Cocok dinikmati sebagai sarapan atau teman minum kopi dan teh",
    foto_url: "/produk/croissant.jpg",
    kategori: "Pastry",
  },
  {
    id: 2,
    nama: "Roti Cokelat",
    harga: 10000,
    deskripsi: "Roti lembut dengan isian cokelat manis dan lumer. Cocok dinikmati sebagai camilan kapan saja.",
    foto_url: "/produk/keripik.svg",
    kategori: "Camilan",
  },
  {
    id: 3,
    nama: "Roti Keju",
    harga: 13000,
    deskripsi: "Roti empuk dengan isian keju gurih dan creamy. Perpaduan rasa manis dan gurih yang pas untuk segala suasana.",
    foto_url: "/produk/sambal.svg",
    kategori: "Bumbu",
  },
  {
    id: 4,
    nama: "Roti Pisang Cokelat",
    harga: 12000,
    deskripsi: "Roti lembut berisi pisang manis dan cokelat yang nikmat. Perpaduan rasa klasik yang cocok untuk sarapan maupun camilan.",
    foto_url: "/produk/nastar.svg",
    kategori: "Kue kering",
  },
  {
    id: 5,
    nama: "Donat Cokelat",
    harga: 10000,
    deskripsi: "Donat lembut dan empuk dengan topping cokelat manis yang lezat. Cocok dinikmati bersama kopi, teh, atau susu.",
    foto_url: "/produk/tas.svg",
    kategori: "Kerajinan",
  },
  {
    id: 6,
    nama: "Donat Keju",
    harga: 125000,
    deskripsi: "Batik cap motif parang di atas kain katun primisima, panjang 2 meter.",
    foto_url: "/produk/batik.svg",
    kategori: "Kain",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}
