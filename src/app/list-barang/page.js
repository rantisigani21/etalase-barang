"use client";

import { useState } from "react";
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
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const ProductList = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Dummy data untuk produk elektronik
  const products = [
    {
      id: 1,
      name: "LENOVO IDEAPAD SLIM 3 14 15 i24501 8GB 512GB",
      price: 2631000,
      image: "/laptop.jpg",
      category: "Elektronik",
    },
    {
      id: 2,
      name: "1.5L Blender Bush Kaca 6 Pisau Juicer 300 ml Blender Jus 2 in 1",
      price: 194119,
      image: "/blender.jpg",
      category: "Elektronik",
    },
    {
      id: 3,
      name: "Infinix Hot 50 8/128GB - Up to 16GB",
      price: 1445918,
      image: "/phone.jpg",
      category: "Elektronik",
    },
    {
      id: 4,
      name: "Advance MX-133 Electric Whisk Blender Mixer",
      price: 64000,
      image: "/mixer.jpg",
      category: "Elektronik",
    },
    {
      id: 5,
      name: "Teko listrik pemanas air SDSB Electrik kettle 2L",
      price: 53200,
      image: "/kettle.jpg",
      category: "Elektronik",
    },
    {
      id: 6,
      name: "Spiker advan v8",
      price: 146000,
      image: "/speaker.jpg",
      category: "Elektronik",
    },
  ];

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-[#1a1313] text-white flex flex-col transition-all duration-300`}
      >
        {/* Logo & Toggle Button */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 text-pink-300">
          <div
            className={`text-2xl italic font-semibold ${
              collapsed ? "hidden" : "block"
            }`}
          >
            Shelfify
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white text-xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 space-y-6 px-4">
          <MenuItem icon={<FaHome />} label="Dashboard" collapsed={collapsed} />
          <MenuItem
            icon={<FaBoxOpen />}
            label="Data barang"
            collapsed={collapsed}
            active={true}
          />
          <MenuItem
            icon={<FaPlusSquare />}
            label="Input barang"
            collapsed={collapsed}
          />
        </nav>

        {/* Logout */}
        <div className="mt-auto px-4 py-4 border-t border-gray-700 cursor-pointer">
          <MenuItem
            icon={<FaSignOutAlt />}
            label="Logout"
            collapsed={collapsed}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#fefbff] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold flex items-center space-x-2">
              <FaBoxOpen className="text-black mr-2" />
              <span className="text-black">Data Barang</span>
            </h1>
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

        {/* Category Header */}
        <div className="flex items-center mb-6">
          <FaPowerOff className="text-3xl mr-3 text-black" />
          <h2 className="text-3xl font-semibold text-black">Elektronik</h2>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

// Component untuk navigasi sidebar
const MenuItem = ({ icon, label, collapsed, active }) => (
  <div
    className={`flex items-center space-x-4 cursor-pointer ${
      active ? "text-pink-300" : "text-white hover:text-pink-200"
    }`}
  >
    <span className="text-lg">{icon}</span>
    {!collapsed && <span>{label}</span>}
  </div>
);

// Component untuk kartu produk
const ProductCard = ({ product }) => (
  <div className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
      {/* Placeholder untuk gambar produk */}
      <div className="text-center text-gray-500">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.parentNode.classList.add(
              "flex",
              "items-center",
              "justify-center"
            );
            e.target.src = "";
            e.target.alt = "No image";
          }}
        />
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-medium text-sm mb-2 h-10 overflow-hidden">
        {product.name}
      </h3>
      <p className="text-lg font-bold text-black mb-2">
        Rp.{product.price.toLocaleString()}
      </p>
      <div className="flex justify-between">
        <button className="p-2 text-black hover:text-pink-500 transition-colors">
          <FaShoppingCart />
        </button>
        <button className="p-2 text-black hover:text-pink-500 transition-colors">
          <FaHeart />
        </button>
      </div>
    </div>
  </div>
);

export default ProductList;
