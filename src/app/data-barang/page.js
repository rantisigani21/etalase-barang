'use client'; // Tandai sebagai Client Component

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FaHome,
  FaBoxOpen,
  FaPlusSquare,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaClipboardList,
} from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import Navbar from '@/components/sidebar'; 

const DataBarang = () => {
  
  const [barangData, setBarangData] = useState([]);
 
  const [searchQuery, setSearchQuery] = useState('');
  
  const [loading, setLoading] = useState(true);
 
  const [error, setError] = useState(null);

  
  useEffect(() => {
    async function fetchBarang() {
      try {
        setLoading(true); 
        const response = await fetch('/api/barang'); // Fetch dari API Route
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBarangData(data); 
      } catch (error) {
        console.error('Error fetching barang in client:', error);
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    }

    fetchBarang();
  }, []); 

  
  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return barangData; 
    }
    
    return barangData.filter((item) =>
      Object.values(item).some((value) =>
        
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [barangData, searchQuery]);

  

  
  return (
    <div className="flex min-h-screen font-sans">
      <Navbar /> {/* Pastikan komponen Navbar ada dan diimport */}

      <main className="flex-1 bg-[#fefbff] p-6">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold flex items-center space-x-2">
              <FaClipboardList className="text-black" />
              <span className="text-black">Data barang</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="flex items-center w-full md:w-auto border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-pink-300">
              <input
                type="text"
                placeholder="Search for..."
                className="px-4 py-1 rounded-l-md focus:outline-none text-black w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-pink-300 p-2 rounded-r-md text-white">
                <FiSearch />
              </button>
            </div>

            <Link href="/input-barang"> {/* Pastikan path ini benar */}
              <button className="flex items-center bg-pink-300 hover:bg-pink-200 text-white px-3 py-2 rounded-md">
                <FaPlusSquare className="mr-2" />
                Tambah Barang
              </button>
            </Link>
            <div className="ml-2">
              {/* Pastikan FaUser diimport jika digunakan */}
              <FaUser className="text-2xl text-black" />
            </div>
          </div>
        </div>

        {/* Loading dan Error State */}
        {loading && (
          <div className="text-center text-gray-600">Memuat data...</div>
        )}
        {error && (
          <div className="text-center text-red-600">Error: {error}</div>
        )}

      
        {!loading && !error && (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-pink-300">
                <tr>
                  {[
                    "No",
                    "Kode",
                    "Gambar",
                    "Nama barang",
                    "Harga barang",
                    "Stok",
                    "Kategori",
                    "Tgl buat",
                    "Tgl ubah",
                  ].map((header, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
               
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      {/* Nomor urut berdasarkan index dari data yang difilter */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      {/* Sesuaikan dengan nama kolom dari database */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.kode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.image ? (
                           <img
                            src={`/${item.image}`} // Asumsikan gambar ada di folder public
                            alt={item.nama}
                            className="h-8 w-8 object-cover rounded-full" // Sesuaikan styling
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rp {item.harga.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.stok}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.nama_kategori}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         {item.tgl_buat ? new Date(item.tgl_buat).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         {item.tgl_ubah ? new Date(item.tgl_ubah).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                 
                    <td
                      colSpan={9}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Tidak ada data barang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Area pagination dihapus */}
      </main>
    </div>
  );
};

export default DataBarang;
