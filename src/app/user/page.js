"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import ProductCard from "@/components/productcard";
import AddFavoriteButton from "@/components/AddFavoriteButton";

const categories = ["Semua", "Kaos", "Sepatu", "Tas"];

export default function HalamanUser() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;
  const id_user = 1; 

  // Ambil data dari API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/barang");
        // Pastikan responsnya adalah array sebelum mengatur state
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Respons API bukan array:", data);
          setProducts([]); // Atur ke array kosong jika respons bukan array
        }
      } catch (error) {
        console.error("Gagal memuat data barang:", error);
        setProducts([]); // Atur ke array kosong saat terjadi error
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filter data berdasarkan pencarian dan kategori
  const filteredProducts = Array.isArray(products)
    ? products.filter((barang) => {
        const matchesSearchQuery = barang.nama
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === "Semua" ||
          barang.nama_kategori === selectedCategory;

        return matchesSearchQuery && matchesCategory;
      })
    : []; // Jika products bukan array, default ke array kosong

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Placeholder untuk fungsionalitas keranjang (Anda perlu mengimplementasikan logika keranjang yang sebenarnya)
  const addToCart = () => {
    setCartCount(cartCount + 1); // Ini hanya penambahan sederhana, bukan keranjang yang sebenarnya
    console.log("Barang ditambahkan ke keranjang (placeholder)");
    // Anda biasanya akan menambahkan item ke state keranjang atau mengirimnya ke API di sini
  };

  return (
    <div className="min-h-screen bg-pink-200 text-black flex flex-col">
      {/* Navbar */}
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

      {/* Konten Produk */}
      <div className="flex-grow px-6 py-6">
        {loading ? (
          <div className="text-center text-gray-700">Memuat produk...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedProducts.map((barang) => (
              <ProductCard
                key={barang.id}
                id={barang.id}
                name={barang.nama}
                price={`Rp ${Number(barang.harga).toLocaleString()}`}
                image={`/${barang.image}`}
                category={barang.nama_kategori}
                onAddToCart={addToCart}
              >
                <AddFavoriteButton id_user={id_user} id_barang={barang.id} />
              </ProductCard>
            ))}
            {paginatedProducts.length === 0 && (
              <div className="text-center col-span-3 text-gray-500">
                Tidak ada produk ditemukan.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 py-4 text-black">
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="font-semibold">{`Halaman ${currentPage} dari ${totalPages}`}</span>
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || totalPages === 0}
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
