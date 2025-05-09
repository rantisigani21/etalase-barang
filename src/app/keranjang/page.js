// app/keranjang/page.tsx
"use client";

import React from "react";

export default function KeranjangPage() {
  // Simulasi data keranjang
  const items = [
    { id: 1, nama: "Baju Hitam", jumlah: 2, harga: 120000 },
    { id: 2, nama: "Celana Jeans", jumlah: 1, harga: 180000 },
  ];

  const total = items.reduce((acc, item) => acc + item.jumlah * item.harga, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{item.nama}</h2>
              <p>Jumlah: {item.jumlah}</p>
              <p>Harga Satuan: Rp{item.harga.toLocaleString()}</p>
            </div>
            <div className="text-right font-semibold">
              Rp{(item.jumlah * item.harga).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-xl font-bold text-right">
        Total: Rp{total.toLocaleString()}
      </div>
    </div>
  );
}
