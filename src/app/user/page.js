"use client";

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import ProductCard from "@/components/productcard";

const dummyProducts = [
  {
    id: 1,
    name: "Kaos Polos",
    price: "Rp50.000",
    image: "/kaos.jpg",
    category: "Kaos",
  },
  {
    id: 2,
    name: "Sepatu Sneakers",
    price: "Rp200.000",
    image: "/sepatu.jpg",
    category: "Sepatu",
  },
  {
    id: 3,
    name: "Tas Kulit",
    price: "Rp350.000",
    image: "/tas.jpg",
    category: "Tas",
  },
  {
    id: 4,
    name: "Kaos Distro",
    price: "Rp100.000",
    image: "/kaos2.jpg",
    category: "Kaos",
  },
  {
    id: 5,
    name: "Sepatu Lari",
    price: "Rp250.000",
    image: "/sepatu2.jpg",
    category: "Sepatu",
  },
  {
    id: 6,
    name: "Tas Ransel",
    price: "Rp150.000",
    image: "/tas2.jpg",
    category: "Tas",
  },
];

const categories = ["Semua", "Kaos", "Sepatu", "Tas"];

export default function HalamanUser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  const itemsPerPage = 6;

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesSearchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" || product.category === selectedCategory;

    return matchesSearchQuery && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-pink-200 text-black flex flex-col">
      {/* Navbar Section */}
      <div className="bg-gray-100 py-4 px-6 flex justify-between items-center">
        <div>
          <img className="h-12" src="/images/logo.png" alt="Shelfify Logo" />
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Cari produk..."
            className="p-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="ml-4 p-2 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Keranjang Icon */}
          <Link href="/keranjang">
            <div className="relative flex items-center text-black hover:text-pink-200 cursor-pointer">
              <FiShoppingCart size={32} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Produk Grid Section */}
      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-6 text-black">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center space-x-4 py-4 text-black">
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-400"
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
        >
          Previous
        </button>
        <span className="font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-400"
          onClick={() =>
            setCurrentPage(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
        >
          Next
        </button>
      </div>

      {/* Tombol Kembali */}
      <div className="text-center py-6">
        <button
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-300 transition"
          onClick={() => window.history.back()}
        >
           Kembali
        </button>
      </div>
    </div>
  );
}
