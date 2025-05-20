'use client'
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/CartContext"
import { FaShoppingCart } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react"

const links = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Products", path: "/products" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartItems } = useCart();
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between p-6 relative mb-8">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-lg font-bold md:text-2xl">E-Commerce</h1>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <div key={link.id}>
            <Link href={link.path}>
              {link.name}
            </Link>
          </div>
        ))}
        <Link
          className="flex items-center gap-1.5 text-lg font-medium py-2 text-neutral-900"
          href="/cart"
        >
          <FaShoppingCart />: {cartItems.length}
        </Link>

        {session ? (
          <div className="flex items-center gap-2">
            <img
              src={session.user.image}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={() => signOut()}
              className="text-sm hover:underline"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google logo"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center gap-4">
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-9 h-9 flex justify-center items-center"
        >
          <i className={`bx bx-${mobileMenuOpen ? 'x' : 'menu'}`}></i>
        </motion.button>
      </div>

      {/* Mobile Menu DropDown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 p-6 border-t border-neutral-200 dark:border-neutral-800 z-50">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <div
                key={link.id}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  className="block text-lg font-medium py-2 text-neutral-900 dark:text-white"
                  href={link.path}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            <Link
              className="flex items-center gap-1.5 text-lg font-medium py-2 text-neutral-900 dark:text-white"
              href="/cart"
            >
              <FaShoppingCart />: {cartItems.length}
            </Link>

            {session ? (
              <div className="flex items-center gap-2">
                <img
                  src={session.user.image}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={() => signOut()}
                  className="text-sm hover:underline"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-white text-black px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google logo"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}