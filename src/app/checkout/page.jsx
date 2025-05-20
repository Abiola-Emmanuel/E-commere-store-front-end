'use client'

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { useCart } from "@/CartContext"

// Initialize Stripe outside component
let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

export default function CheckOutPage() {
  const { cartItems, totalPrice } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stripe, setStripe] = useState(null)

  // Load Stripe when component mounts
  useEffect(() => {
    getStripe().then(stripe => {
      setStripe(stripe)
    }).catch(err => {
      console.error('Failed to load Stripe:', err)
      setError('Failed to initialize payment processor')
    })
  }, [])

  const handleCheckout = async () => {
    if (!stripe) {
      setError('Payment processor not ready')
      return
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://e-commerce-backend-kzov.onrender.com/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            id: item.id,
            name: item.title,
            price: Math.round(item.price * 100),
            quantity: 1
          }))
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Checkout failed')
      }

      const { id: sessionId } = await response.json()

      if (!sessionId) {
        throw new Error('No session ID received from server')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })

      if (stripeError) throw stripeError

    } catch (err) {
      console.error('Checkout error:', err)
      setError(err.message || 'Payment processing failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>

      {/* Display cart summary */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <ul className="space-y-2 mb-4">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title.split(" ").slice(0, 3).join(" ")}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
        <div className="border-t pt-2 font-bold">
          <span>Total: </span>
          <span>${totalPrice}</span>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="border border-black p-6">

        <button
          onClick={handleCheckout}
          disabled={loading || cartItems.length === 0}
          className="bg-black text-white w-full py-3 mt-4 disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Pay $${totalPrice}`}
        </button>
      </div>
    </div >
  )
}