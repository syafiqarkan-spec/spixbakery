import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk, className = "", children }) {
  const nomorBersih = (toko.nomorWhatsApp || "").replace(/[^0-9]/g, "");
  const nomor = nomorBersih.startsWith("0") ? `62${nomorBersih.slice(1)}` : nomorBersih;

  const pesan = produk
    ? `Halo, saya ingin memesan ${produk.nama} seharga ${formatRupiah(produk.harga)}.`
    : `Halo ${toko.nama}, saya ingin memesan roti fresh.`;

  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  const kelasBawaan =
    "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-utama px-5 py-3.5 font-bold text-white shadow-xs transition-all hover:bg-utama-gelap hover:shadow-md sm:w-auto";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? `${kelasBawaan} ${className}` : kelasBawaan}
    >
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z" />
      </svg>
      <span>{children || "Pesan via WhatsApp"}</span>
    </a>
  );
}
