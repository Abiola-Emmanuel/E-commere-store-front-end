'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useCart } from "@/CartContext";
import { motion } from "framer-motion"

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      setLoading(false)
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-4">
        <h2 className="underline flex justify-center gap-2.5 items-center text-3xl md:text-5xl font-bold">
          All Products
        </h2>

        {/* Search Bar */}
        <div className="relative w-full md:w-96 mt-4 md:mt-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div>
          <FaSpinner className="mx-auto animate-spin text-4xl" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="border border-black p-4 cursor-pointer rounded-2xl"
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-contain mb-6"
                  />
                  <h4 className="font-bold text-xl text-center md:text-2xl">
                    {product.title.split(" ").slice(0, 3).join(" ")}
                  </h4>

                  <p className="text-gray-600 mb-2 text-center">${product.price}</p>

                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-black border border-black px-4 py-2 inline-block mt-2 hover:bg-black hover:text-white"
                    >
                      View Details
                    </Link>
                    <motion.button
                      whileTap={{ scale: 0.90 }}
                      className="bg-black text-white px-6 py-3 cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-xl">No products found matching your search.</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-black border border-black px-4 py-2 hover:bg-black hover:text-white"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}