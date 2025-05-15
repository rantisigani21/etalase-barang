"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHome,
  FaBoxOpen,
  FaPlusSquare,
  FaSignOutAlt,
  FaClipboardCheck,
} from "react-icons/fa";
import Navbar from "@/components/sidebar";
import { useRouter } from "next/navigation";

const InputKategori = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    kategori: "",
    tgl_buat: "",
    tgl_ubah: "",
  });
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/kategori");
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/kategori", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ kategori: "", tgl_buat: "", tgl_ubah: "" });
        setCategories((prev) => [...prev, data]);
      } else {
        setError(data.error || "Gagal menyimpan kategori");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim data");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" min-h-screen flex-1 bg-[#fefbff] p-16 flex justify-center items-start mx-auto">
      <main className="w-full max-w-3xl">
        <div className="flex justify-center items-center mb-6 bg-gray-100 p-4 rounded-md">
          <h1 className="text-2xl font-semibold flex items-center space-x-2">
            <FaClipboardCheck className="text-black" />
            <span className="text-black">Input Kategori</span>
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md space-y-4 max-w-3xl text-black"
        >
          <FormGroup
            label="Kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
          />
          <FormGroup
            label="Tanggal Buat"
            name="tgl_buat"
            type="date"
            value={formData.tgl_buat}
            onChange={handleChange}
          />
          <FormGroup
            label="Tanggal Ubah"
            name="tgl_ubah"
            type="date"
            value={formData.tgl_ubah}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">Data berhasil disimpan!</p>
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

const FormGroup = ({ label, name, type = "text", value, onChange }) => (
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
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
    />
  </div>
);

export default InputKategori;
