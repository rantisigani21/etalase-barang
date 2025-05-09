"use client";


import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">EtalaseBarang</h1>
      <ul className="flex gap-4 text-gray-700">
        <li>
          <Link href="/">Beranda</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>

    
    </nav>
  );
};

export default Navbar;
