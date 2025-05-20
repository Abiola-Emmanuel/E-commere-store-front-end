'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/CartContext";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {

  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
      >
        {/* Checkmark icon with animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-block bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  )
}