export default function ItemCard({ title, imageUrl }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
  );
}
