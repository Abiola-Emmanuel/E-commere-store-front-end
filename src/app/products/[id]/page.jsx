'use client'
import { use, useEffect, useState } from "react";
import { useCart } from "@/CartContext";
import { motion } from "framer-motion"
import React from "react";
import { FaSpinner } from "react-icons/fa";


export default function ProductPage({ params }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false)

  const { id } = use(params);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-2.5 my-2.5 gap-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl" />
        </div>
      ) : (
        <>
          {product && (
            <>
              <div className="border border-gray-500 p-8 rounded-3xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">{product.title && product.title.split(" ").slice(0, 3).join(" ")} </h2>
                <p className="text-2xl mb-4">${product.price}</p>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <div className="flex space-x-4">
                  <motion.button
                    whileTap={{ scale: 0.90 }}
                    className="bg-black text-white px-6 py-3 cursor-pointer"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}