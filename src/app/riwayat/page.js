"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const dummyRiwayat = [
  {
    id: 1,
    productName: "Kaos Polos",
    image: "/kaos.jpg",
    price: "Rp50.000",
    quantity: 2,
    date: "2025-05-01",
  },
  {
    id: 2,
    productName: "Sepatu Sneakers",
    image: "/sepatu.jpg",
    price: "Rp200.000",
    quantity: 1,
    date: "2025-04-28",
  },
  {
    id: 3,
    productName: "Tas Ransel",
    image: "/tas2.jpg",
    price: "Rp150.000",
    quantity: 1,
    date: "2025-04-15",
  },
];

export default function HalamanRiwayat() {
  return (
    <div className="min-h-screen bg-pink-100 py-8 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/halaman-utama-user">
          <button className="flex items-center bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            <FiArrowLeft className="mr-2" /> Kembali
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-black">Riwayat Transaksi</h1>
        <div></div> {/* Spacer */}
      </div>

      {/* Konten Riwayat */}
      {dummyRiwayat.length === 0 ? (
        <p className="text-center text-black">Belum ada riwayat transaksi.</p>
      ) : (
        <div className="space-y-6">
          {dummyRiwayat.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md flex items-center overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.productName}
                className="w-32 h-32 object-cover"
              />
              <div className="p-4 w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{item.productName}</h2>
                  <span className="text-sm text-gray-500">
                    Tanggal: {item.date}
                  </span>
                </div>
                <p className="text-gray-600">
                  Harga: {item.price} &nbsp;|&nbsp; Jumlah: {item.quantity}
                </p>
                <p className="text-black font-semibold mt-2">
                  Total:{" "}
                  {formatRupiah(
                    parseInt(item.price.replace("Rp", "").replace(".", "")) *
                      item.quantity
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Fungsi untuk memformat angka ke Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}
