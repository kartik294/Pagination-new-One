"use client"
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle pagination click
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(products.length / 10) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl font-bold text-center mb-12">
        Featured Products
      </h2>

      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice((page - 1) * 10, page * 10).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {product.title}
                </h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            className={`px-4 py-2 text-white bg-blue-500 rounded-md mr-2 ${
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            onClick={() => selectPageHandler(page - 1)}
            disabled={page === 1}
          >
            ◀ Previous
          </button>
          {[...Array(Math.ceil(products.length / 10))].map((_, i) => (
            <button
              key={i}
              onClick={() => selectPageHandler(i + 1)}
              className={`px-4 py-2 text-blue-500 rounded-md mx-1 focus:outline-none ${
                page === i + 1 ? "bg-blue-500 text-white" : "hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`px-4 py-2 text-white bg-blue-500 rounded-md ml-2 ${
              page === Math.ceil(products.length / 10)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            onClick={() => selectPageHandler(page + 1)}
            disabled={page === Math.ceil(products.length / 10)}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
