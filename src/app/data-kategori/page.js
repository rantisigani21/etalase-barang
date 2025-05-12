"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FaHome,
  FaBoxOpen,
  FaPlusSquare,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaClipboardList,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Navbar from "@/components/sidebar"; 

const DataKategori = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

 
  const dummyData = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        no: i + 1,
        id: `CAT${i + 1}`,
        kategori: `Kategori ${i + 1}`,
        tglBuat: "2023-01-01",
        tglUbah: "2023-01-01",
      })),
    []
  );

  
  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return dummyData;
    }
    return dummyData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [dummyData, searchQuery]);

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex min-h-screen font-sans">
     
      <Navbar /> 
     
      <main className="flex-1 bg-[#fefbff] p-6">
      
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold flex items-center space-x-2">
              <FaClipboardList className="text-black" />
              <span className="text-black">Data kategori</span>
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
         
            <Link href="/input-kategori">
              <button className="flex items-center bg-pink-300 hover:bg-pink-200 text-white px-3 py-2 rounded-md">
                <FaPlusSquare className="mr-2" />
                Tambah kategori
              </button>
            </Link>
            <div className="ml-2">
              <FaUser className="text-2xl text-black" />
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-pink-300">
              <tr>
                {["No", "ID", "Kategori", "Tgl buat", "Tgl ubah"].map(
                  (header, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.kategori}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.tglBuat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.tglUbah}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-end">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === number
                    ? "z-10 bg-pink-50 border-pink-500 text-pink-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
};


const MenuItem = ({ icon, label, collapsed }) => (
  <div className="flex items-center space-x-4 text-white hover:text-pink-200 cursor-pointer">
    <span className="text-lg">{icon}</span>
    {!collapsed && <span>{label}</span>}
  </div>
);

export default DataKategori; 
