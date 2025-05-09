"use client";
import { FaShoppingCart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

export default function ProductCard({ name, price, image }) {
  const handleAddToCart = () => {
    alert(`Produk "${name}" telah ditambahkan ke keranjang.`);
  };

  const handleAddToFavorites = () => {
    alert(`Produk "${name}" telah ditambahkan ke favorit.`);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden p-4 flex flex-col items-center shadow-md">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-4 text-center">{name}</h2>
      <p className="text-pink-600 font-bold mt-2">{price}</p>

      {/* Tombol dalam satu baris */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleAddToCart}
          className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition text-xl"
          title="Tambah ke Keranjang"
        >
          <FaShoppingCart />
        </button>
        <button
          onClick={handleAddToFavorites}
          className="bg-white p-3 rounded-full shadow-md hover:bg-pink-100 transition text-xl text-pink-500"
          title="Tambah ke Favorit"
        >
          <FiHeart />
        </button>
      </div>
    </div>
  );
}
