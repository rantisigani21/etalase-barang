// app/api/barang/route.js
// Ini adalah kode Server-Side

import { query } from "./../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
   
    const results = await query({
      query: `
        SELECT
          b.id,
          b.kode,
          b.nama,
          b.harga,
          b.stok,
          b.tgl_buat,
          b.tgl_ubah,
          b.image,
          b.id_kategori,
          k.kategori AS nama_kategori
        FROM
          tb_barang b
        JOIN
          tb_kategori k ON b.id_kategori = k.id
      `,
      values: [], // Tidak ada nilai yang dinamis untuk kueri ini
    });
    // Mengembalikan hasil sebagai JSON response
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching barang with category in API Route:", error); // Logging error di server
    // Mengembalikan error response jika terjadi masalah
    return NextResponse.json(
      { error: "Failed to fetch barang data with category" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Ambil data dari body request
    const body = await request.json();
    const { kode, nama, harga, jumlah, kategori } = body;

    // Validasi sederhana (opsional, bisa lebih kompleks)
    if (!kode || !nama || !harga || !jumlah || !kategori) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Konversi harga dan stok ke tipe data yang sesuai jika perlu (misalnya, Number)
    const parsedHarga = parseFloat(harga);
    const parsedStok = parseInt(jumlah);
    const parsedIdKategori = parseInt(kategori);

    // Periksa validitas konversi
    if (isNaN(parsedHarga) || isNaN(parsedStok) || isNaN(parsedIdKategori)) {
      return NextResponse.json(
        { error: "Invalid data types for harga, stok, or id_kategori" },
        { status: 400 }
      );
    }


    const result = await query({
      query: `
        INSERT INTO tb_barang (kode, nama, harga, stok, id_kategori)
        VALUES (?, ?, ?, ?, ?)
      `,
      values: [kode, nama, parsedHarga, parsedStok, parsedIdKategori],
    });

  
    return NextResponse.json(
      { message: "Barang added successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting barang in API Route:", error);
    return NextResponse.json(
      { error: "Failed to add barang", details: error.message },
      { status: 500 }
    );
  }
}
