"use client";
import { useEffect, useState } from "react";

export default function FavoritPage() {
  const [favoritList, setFavoritList] = useState([]);

  useEffect(() => {
    const fetchFavorit = async () => {
      const res = await fetch("/api/favorit");
      const data = await res.json();
      setFavoritList(data);
    };

    fetchFavorit();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorit Saya</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {favoritList.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded mb-2" />
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.category}</p>
            <p className="text-pink-600 font-bold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
