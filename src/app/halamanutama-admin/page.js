import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header";
import ItemCard from "@/components/ItemCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Shelfify</title>
      </Head>
      <Header />

      <main className="min-h-screen max-w-7xl mx-auto px-6 py-12 bg-[url('/images/background-HD.jpg')] bg-cover bg-center bg-no-repeat">
   
        <section className="text-center mb-16  p-10 rounded-2xl  mt-14">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800">
            Selamat Datang di Etalase Barang
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Temukan dan kelola koleksi barang Anda dengan mudah dan cepat.
          </p>
          <Link href="/" passHref>
            <button className="bg-pink-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-pink-400 transition-all shadow-md">
              Dashboard
            </button>
          </Link>
        </section>

        {/* Barang Terbaru */}
        {/* <section className=" p-8 rounded-2xl shadow-lg ">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
            Barang Terbaru
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ItemCard title="Tas Kulit" imageUrl="/images/tas.jpeg" />
            <ItemCard title="Sepatu Sneakers" imageUrl="/images/sepatu.jpeg" />
            <ItemCard title="Jam Tangan" imageUrl="/images/jam.jpg" />
          </div>
        </section> */}
      </main>
    </>
  );
}
