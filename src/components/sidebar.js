"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaBoxOpen, FaHome, FaPlusSquare } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  
  const MenuItem = ({ icon, label, collapsed, url }) => (
    <div className="flex items-center space-x-4 text-white hover:text-pink-200 cursor-pointer">
      <span className="text-lg">{icon}</span>
      {!collapsed && (
        <Link href={url}>
          <span>{label}</span>
        </Link>
      )}
    </div>
  );

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-[#1a1313] text-white flex flex-col transition-all duration-300`}
    >
     
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 text-pink-300">
        <div
          className={`text-2xl italic font-semibold ${collapsed ? "hidden" : "block"}`}
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
        <MenuItem
          icon={<FaHome />}
          label="Dashboard"
          collapsed={collapsed}
          url={"/"}
        />

        <MenuItem
          url={"/data-barang"}
          icon={<FaBoxOpen />}
          label="Data barang"
          collapsed={collapsed}
        />
        <MenuItem
          url={"/data-kategori"}
          icon={<FaPlusSquare />}
          label="Data kategori"
          collapsed={collapsed}
        />

      
      </nav>
    </aside>
  );
};

export default Sidebar;
