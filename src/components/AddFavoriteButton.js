"use client";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function AddFavoriteButton({ id_user, id_barang }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async () => {
    setIsLoading(true);
    const res = await fetch("/api/favorit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_user, id_barang }),
    });

    const data = await res.json();
    setIsLoading(false);

    if (res.ok) {
      setIsFavorited(true);
      alert(data.message);
    } else {
      alert("Gagal menambahkan ke favorit");
    }
  };

  return (
    <button
      onClick={handleFavorite}
      disabled={isLoading || isFavorited}
      title="Tambahkan ke Favorit"
      className="text-red-500 text-2xl"
    >
      {isFavorited ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
}
