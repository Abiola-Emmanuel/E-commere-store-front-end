'use client'

import { useCart } from "@/CartContext"
import Link from "next/link";
import { motion } from "framer-motion"

export default function CartPage() {
  const { cartItems, removeFromCart, totalPrice } = useCart();
  console.log(cartItems);


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {cartItems.length === 0 ? (
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
              Your cart is empty
            </h1>
            <p className="text-gray-500 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              href="/products"
              className="inline-block bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Your Shopping Cart
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cartItems.map((item, index) => (

              <motion.div
                key={`${item.id}-${index}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                whileHover={{ y: -5 }}
              >
                <div className="aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h4 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                  {item.title.split(" ").slice(0, 3).join(" ")}
                </h4>

                <p className="text-gray-600 mb-4">
                  <span className="font-medium">${item.price}</span>
                </p>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-red-50 text-red-600 font-medium rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </motion.button>
              </motion.div>
            ))}

          </div>

          <div className="mt-16 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-2xl font-bold text-gray-900">
                Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full sm:w-auto py-3 px-8 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )
      }
    </div >
  )
}