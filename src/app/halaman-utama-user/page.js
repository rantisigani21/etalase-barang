import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header"; // ✅ Pastikan Header adalah default export
import ItemCard from "@/components/ItemCard"; // ✅ Pastikan ItemCard adalah default export
import {
  FaBoxOpen,
  FaClipboardList,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

export default function UserHomePage() {
  return (
    <>
      <Head>
        <title>Shelfify - Halaman Utama User</title>
      </Head>
      <Header />

      <main className="min-h-screen max-w-7xl mx-auto px-6 py-12 bg-[url('/images/background-HD.jpg')] bg-cover bg-center bg-no-repeat">
        {/* Hero Section */}
        <section className="text-center mb-16 bg-white bg-opacity-80 p-10 rounded-2xl mt-14 shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800">
            Selamat Datang di Shelfify
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Jelajahi barang terbaru, kelola keranjang, dan simpan favoritmu!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/keranjang">
              <button className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-400 flex items-center gap-2 shadow">
                <FaShoppingCart /> Keranjang
              </button>
            </Link>
            <Link href="/favorit">
              <button className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-400 flex items-center gap-2 shadow">
                <FaHeart /> Favorit
              </button>
            </Link>
            <Link href="/riwayat">
              <button className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-400 flex items-center gap-2 shadow">
                <FaClipboardList /> Riwayat
              </button>
            </Link>

            <Link href="/user">
              <button className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-400 flex items-center gap-2 shadow">
                <FaClipboardList /> Etalase
              </button>
            </Link>
          </div>
        </section>

      
        <section className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-lg mt-10">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
            Barang Terbaru
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ItemCard title="Tas Kulit" imageUrl="/images/tas.jpeg" />
            <ItemCard title="Sepatu Sneakers" imageUrl="/images/sepatu.jpeg" />
            <ItemCard title="Jam Tangan" imageUrl="/images/jam.jpg" />
          </div>
        </section>
      </main>
    </>
  );
}
