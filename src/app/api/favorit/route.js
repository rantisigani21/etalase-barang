import { NextResponse } from "next/server";
import * as db from "./../../../../lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { id_user, id_barang } = body;

    
    if (!id_user || !id_barang) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const query = "INSERT INTO tb_favorit (id_user, id_barang) VALUES (?, ?)";

    
    const result = await new Promise((resolve, reject) => {
      db.query(query, [id_user, id_barang], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return NextResponse.json(
      { message: "Berhasil ditambahkan ke favorit", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server", error },
      { status: 500 }
    );
  }
}
