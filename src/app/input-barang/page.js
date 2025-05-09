"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaBoxOpen,
  FaPlusSquare,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaClipboardCheck,
  FaUpload,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Navbar from "@/components/sidebar";

const InputBarang = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex-1 bg-[#fefbff] p-6 flex justify-center items-start">
      {/* Sidebar */}
      {/* <aside
        className={`$${
          collapsed ? "w-20" : "w-64"
        } bg-[#1a1313] text-white flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between px-20 py-4 border-b border-gray-700 text-pink-300">
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

        <nav className="flex-1 mt-6 space-y-6 px-4">
          <Link href="/" passHref>
            <div className="cursor-pointer">
              <MenuItem
                icon={<FaHome />}
                label="Dashboard"
                collapsed={collapsed}
              />
            </div>
          </Link>

          <Link href="/data-barang" passHref>
            <div className="cursor-pointer mt-6">
              <MenuItem
                icon={<FaBoxOpen />}
                label="Data barang"
                collapsed={collapsed}
              />
            </div>
          </Link>

          <Link href="/input-barang" passHref>
            <div className="cursor-pointer mt-6">
              <MenuItem
                icon={<FaPlusSquare />}
                label="Input barang"
                collapsed={collapsed}
              />
            </div>
          </Link>
        </nav>

        <div className="mt-auto px-4 py-4 border-t border-gray-700 cursor-pointer">
          <MenuItem
            icon={<FaSignOutAlt />}
            label="Logout"
            collapsed={collapsed}
          />
        </div>
      </aside> */}

      {/* Main Content */}
      <main className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-center items-center mb-6 bg-gray-100 p-4 rounded-md">
          <h1 className="text-2xl font-semibold flex items-center space-x-2">
            <FaClipboardCheck className="text-black" />
            <span className="text-black">Input barang</span>
          </h1>
          <div className="flex items-center space-x-2">
            {/* <input
              type="text"
              placeholder="Search for..."
              className="px-4 py-1 rounded-md border border-gray-300 focus:outline-none text-black"
            />
            <button className="bg-pink-300 p-2 rounded-md text-white">
              <FiSearch />
            </button> */}
            {/* <FaUser className="text-2xl text-black ml-2" /> */}
          </div>
        </div>

        {/* Form Input */}
        <form className="bg-white p-6 rounded-md shadow-md space-y-4 max-w-3xl text-black">
          <FormGroup label="Kode Barang" name="kode-barang" />
          <FormGroup label="Nama Barang" name="nama-barang" />
          <DropdownGroup
            label="Kategori"
            name="kategori"
            options={["Electronic", "Clothes", "Food"]}
          />
          {/* <FormGroup label="Jenis Barang" name="jenis-barang" /> */}
          <FormGroup label="Jumlah Barang" name="jumlah-barang" type="number" />
          <FormGroup label="Harga Barang" name="harga-barang" type="number" />
          <UploadGroup label="Upload Barang" name="upload-barang" />

          <button
            type="submit"
            className="mt-4 bg-pink-300 hover:bg-pink-200 text-white font-semibold px-6 py-2 rounded-md"
          >
            Simpan
          </button>
        </form>
      </main>
    </div>
  );
};

const FormGroup = ({ label, name, type = "text" }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
    />
  </div>
);

const DropdownGroup = ({ label, name, options }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <select
      name={name}
      id={name}
      className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700"
    >
      <option value="">Pilih kategori</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const UploadGroup = ({ label, name }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="flex items-center gap-2">
      <input
        type="file"
        name={name}
        id={name}
        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-300 file:text-white hover:file:bg-pink-200"
      />
    </div>
  </div>
);

const MenuItem = ({ icon, label, collapsed }) => (
  <div className="flex items-center space-x-4 text-white hover:text-pink-200 cursor-pointer">
    <span className="text-lg">{icon}</span>
    {!collapsed && <span>{label}</span>}
  </div>
);

export default InputBarang;
