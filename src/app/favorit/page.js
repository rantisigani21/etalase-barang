"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

const dummyFavorites = [
  {
    id: 1,
    name: "Kaos Distro",
    price: "Rp100.000",
    image: "/kaos2.jpg",
  },
  {
    id: 2,
    name: "Sepatu Lari",
    price: "Rp250.000",
    image: "/sepatu2.jpg",
  },
];

export default function HalamanFavorit() {
  const [favorites, setFavorites] = useState(dummyFavorites);

  const handleRemove = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
  };

  return (
    <div className="min-h-screen bg-pink-100 py-8 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/halaman-utama-user">
          <button className="flex items-center bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            <FiArrowLeft className="mr-2" /> Kembali
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Barang Favorit</h1>
        <div></div> 
      </div>

   
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">Tidak ada barang favorit.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.price}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="mt-4 flex items-center text-sm text-red-600 hover:text-red-800"
                >
                  <FiTrash2 className="mr-1" /> Hapus dari Favorit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
