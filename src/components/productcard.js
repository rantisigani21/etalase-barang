import AddFavoriteButton from "./AddFavoriteButton";

export default function ProductCard({ id, name, price, image, category, onAddToCart, id_user }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded" />
      <h2 className="mt-2 font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">{category}</p>
      <p className="text-pink-600 font-bold">{price}</p>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={onAddToCart}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-400"
        >
          Tambah ke Keranjang
        </button>

      
        <AddFavoriteButton id_user={id_user} id_barang={id} />
      </div>
    </div>
  );
}
