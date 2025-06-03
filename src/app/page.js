'use client'

import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await axios.get('https://fakestoreapi.com/products');
      setProducts(res.data.slice(0, 4));
      console.log(res.data);

      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <section className="py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 md:text-6xl">Minimal Designs</h2>
          <p className="text-xl mb-8">High Quality products with clean aesthetics</p>
          <Link
            href="/products"
            className="bg-black text-white px-6 py-3 inline-block rounded-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl" />
        </div>
      ) : (
        <section className="py-12">
          <h3 className="text-2xl md:text-4xl font-bold mb-9 text-center">Featured Products</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-48 mb-4 rounded-lg"
                  loading="lazy"
                />
                <h4 className="font-bold text-center">
                  {product.title.split(" ").slice(0, 3).join(" ")}
                </h4>
                <p className="text-gray-600 mb-2 text-center">${product.price}</p>

                <Link
                  href={`/products/${product.id}`}
                  className="text-black border border-black px-4 py-2 inline-block mt-2 mx-auto hover:bg-black hover:text-white text-center"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}


