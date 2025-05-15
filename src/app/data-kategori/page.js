"use client";

import { useState, useEffect } from "react"; // Removed useMemo
import Link from "next/link";
import { FaPlusSquare, FaUser, FaClipboardList } from "react-icons/fa";
import Navbar from "@/components/sidebar";

const DataKategori = () => {
  const [kategoriData, setKategoriData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Removed pagination state: currentPage, itemsPerPage

  useEffect(() => {
    async function fetchKategori() {
      try {
        setLoading(true);
        const response = await fetch("/api/kategori");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setKategoriData(data);
      } catch (error) {
        console.error("Error fetching kategori in client:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchKategori();
  }, []);

  // Removed pagination calculations: indexOfLastItem, indexOfFirstItem, currentItems, totalPages
  // Removed pagination function: paginate

  return (
    <div className="flex min-h-screen font-sans">
      <Navbar />

      <main className="flex-1 bg-[#fefbff] p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <h1 className="text-2xl font-semibold flex items-center space-x-2">
            <FaClipboardList className="text-black" />
            <span className="text-black">Data kategori</span>
          </h1>
          <div className="flex items-center space-x-2">
            <Link href="/input-kategori">
              <button className="flex items-center bg-pink-300 hover:bg-pink-200 text-white px-3 py-2 rounded-md">
                <FaPlusSquare className="mr-2" />
                Tambah kategori
              </button>
            </Link>
            <FaUser className="text-2xl text-black ml-2" />
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-pink-300">
                <tr>
                  {["No", "ID", "Kategori", "Tgl buat", "Tgl ubah"].map(
                    (header, i) => (
                      <th
                        key={i}
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {kategoriData.length > 0 ? (
                  kategoriData.map((item, index) => (
                    <tr key={item.id || index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {index + 1}{" "}
                        {/* Use index + 1 for sequential numbering */}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.kategori}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.tgl_buat}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.tgl_ubah}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Tidak ada data kategori.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          // Removed Pagination div
        )}
      </main>
    </div>
  );
};

export default DataKategori;
