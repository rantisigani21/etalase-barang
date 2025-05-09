"use client";

import { useState } from "react";
import Link from "next/link";

import {
  FaPowerOff,
  FaTshirt,
  FaHamburger,
  FaHome,
  FaBoxOpen,
  FaPlusSquare,
  FaSignOutAlt,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Navbar from "@/components/sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 bg-[#fefbff] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold flex items-center space-x-2">
              <FaHome className="text-black" />
              <span className="text-black">Dashboard</span>
            </h1>
            {/* <div className="bg-gray-200 h-6 mt-1 w-40 rounded-sm"></div> */}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search for..."
              className="px-4 py-1 rounded-md border border-gray-300 focus:outline-none text-black"
            />
            <button className="bg-pink-300 p-2 rounded-md text-white">
              <FiSearch />
            </button>
            <div className="ml-2">
              <FaUser className="text-2xl text-black" />
            </div>
          </div>
        </div>
        {/* Kategori Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard
            icon={<FaPowerOff className="text-4xl" />}
            label="Electronic"
            bgColor="bg-red-300"
          />
          <CategoryCard
            icon={<FaTshirt className="text-4xl" />}
            label="Clothes"
            bgColor="bg-red-400"
          />
          <CategoryCard
            icon={<FaHamburger className="text-4xl" />}
            label="Food"
            bgColor="bg-red-200"
          />
        </div>
      </main>
    </div>
  );
};

// Component untuk kategori card
const CategoryCard = ({ icon, label, bgColor }) => (
  <div
    className={`${bgColor} hover:opacity-90 transition-all duration-200 rounded-md p-6 flex flex-col items-center justify-center space-y-4`}
  >
    {icon}
    <p className="text-lg font-semibold">{label}</p>
  </div>
);

export default Dashboard;
