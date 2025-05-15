// app/api/barang/route.js
// Ini adalah kode Server-Side

import { query } from "./../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Query untuk mengambil data barang beserta nama kategori menggunakan JOIN
    const results = await query({
      query: `
        SELECT * FROM tb_kategori
      `,
      values: [], 
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
    const body = await request.json();
    const { kategori, tgl_buat, tgl_ubah } = body;

    // Validasi input
    if (!kategori || !tgl_buat || !tgl_ubah) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await query({
      query: `
        INSERT INTO tb_kategori (kategori, tgl_buat, tgl_ubah)
        VALUES (?, ?, ?)
      `,
      values: [kategori, tgl_buat, tgl_ubah],
    });

    return NextResponse.json(
      { message: "Kategori added successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting kategori:", error);
    return NextResponse.json(
      { error: "Failed to add kategori", details: error.message },
      { status: 500 }
    );
  }
}