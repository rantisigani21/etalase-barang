"use client";

import { useState, useEffect } from "react";
import { FaClipboardCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

const InputBarang = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    kategori: "",
    jumlah: "",
    harga: "",
    tgl_buat: "",
    tgl_ubah: "",
  });

  const [categories, setCategories] = useState([]); // State untuk menyimpan kategori
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Mengambil data kategori saat komponen pertama kali dimuat
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/kategori"); // Ganti dengan route API kategori
        const data = await res.json();
        if (res.ok) {
          setCategories(data);
        } else {
          setError(data.error || "Gagal mengambil data kategori");
        }
      } catch (err) {
        setError("Gagal terhubung ke API kategori");
      }
    };
    fetchCategories();
  }, []); // Array kosong agar hanya dijalankan sekali saat mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    // Validasi manual (termasuk validasi kategori)
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        setError(`Field '${key}' wajib diisi`);
        setSubmitting(false);
        return;
      }
    }

    // Menambahkan nilai tanggal saat data dikirim
    const currentDate = new Date().toISOString();

    const dataToSubmit = {
      ...formData,
      tgl_buat: formData.tgl_buat || currentDate,
      tgl_ubah: currentDate,
    };

    try {
      const res = await fetch("/api/barang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Gagal menambahkan barang");

      setSuccess(true);
      setFormData({
        kode: "",
        nama: "",
        kategori: "", // Reset kategori juga
        jumlah: "",
        harga: "",
        tgl_buat: "",
        tgl_ubah: "",
      });

      // Redirect kalau mau
      // router.push("/data-barang");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-start bg-gray-100 p-8 min-h-screen">
      <main className="bg-white p-6 rounded-md shadow-md w-full max-w-xl text-black">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold flex justify-center items-center gap-2">
            <FaClipboardCheck className="text-pink-400" />
            Input Barang
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGroup
            label="Kode Barang"
            name="kode"
            value={formData.kode}
            onChange={handleInputChange}
          />
          <FormGroup
            label="Nama Barang"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
          />
          {/* Menggunakan data kategori dari state */}
          <DropdownGroup
            label="Kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleInputChange}
            options={categories} // Pass array kategori dari state
          />
          <FormGroup
            label="Jumlah Barang"
            name="jumlah"
            type="number"
            value={formData.jumlah}
            onChange={handleInputChange}
          />
          <FormGroup
            label="Harga Barang"
            name="harga"
            type="number"
            value={formData.harga}
            onChange={handleInputChange}
          />

          <FormGroup
            label="Tanggal Pembuatan"
            name="tgl_buat"
            type="date"
            value={formData.tgl_buat}
            onChange={handleInputChange}
          />
          <FormGroup
            label="Tanggal Perubahan"
            name="tgl_ubah"
            type="date"
            value={formData.tgl_ubah}
            onChange={handleInputChange}
          />

          {submitting && <p className="text-blue-600">Menyimpan data...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {success && (
            <p className="text-green-600">Barang berhasil ditambahkan!</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 bg-pink-300 hover:bg-pink-200 text-white font-semibold px-6 py-2 rounded-md"
          >
            {submitting ? "Menyimpan..." : "Simpan Barang"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="bg-pink-300 hover:bg-pink-200 text-white font-semibold px-6 py-2 rounded-md flex justify-between"
          >
            Kembali
          </button>
        </form>
      </main>
    </div>
  );
};

const FormGroup = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
    />
  </div>
);

// Modifikasi komponen DropdownGroup untuk menerima array objek kategori
const DropdownGroup = ({ label, name, value, onChange, options }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700"
    >
      <option value="">Pilih kategori</option>
      {/* Mapping data kategori untuk membuat options */}
      {options.map((category) => (
        <option key={category.id} value={category.id}>
          {category.kategori}
        </option>
      ))}
    </select>
  </div>
);

export default InputBarang;
