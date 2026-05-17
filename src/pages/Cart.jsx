import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQty = useCartStore((state) => state.updateQty)
  const totalPrice = useCartStore((state) => state.totalPrice)

  const subtotal = totalPrice
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = parseFloat((subtotal * 0.08).toFixed(2))
  const total = parseFloat((subtotal + shipping + tax).toFixed(2))

  const handleRemove = (id) => {
    removeItem(id)
    toast.error('Removed from cart')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">Your Cart</h1>

          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <p className="text-6xl mb-4">🛒</p>
            <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
            <Link
              to="/shop"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Your Cart ({items.reduce((sum, item) => sum + item.qty, 0)} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-6 flex gap-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain bg-gray-100 rounded shrink-0"
                />

                {/* Content */}
                <div className="grow">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    ${item.price.toFixed(2)} each
                  </p>

                  {/* Qty Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Line Total & Remove */}
                <div className="text-right flex flex-col justify-between">
                  <p className="font-bold text-gray-900">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="block w-full text-center border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
