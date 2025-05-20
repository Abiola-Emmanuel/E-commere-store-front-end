'use client'

import { motion } from "framer-motion"
import { Link } from "lucide-react"

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center mt-52">
      <h3 className=" border border-green-500 rounded-lg  p-6">You have to SignUp or SignIn</h3>
      <a className="curor-pointer bg-black text-white p-1.5 mt-2 rounded-lg" href="/">
        Home
      </a>
    </div>
  )
}