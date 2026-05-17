import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'

export default function Checkout() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const totalPrice = useCartStore((state) => state.totalPrice)

  const subtotal = totalPrice
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = parseFloat((subtotal * 0.08).toFixed(2))
  const total = parseFloat((subtotal + shipping + tax).toFixed(2))

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'USA',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Format card number
    if (name === 'cardNumber') {
      const formatted = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19)
      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    // Format expiry date
    if (name === 'expiryDate') {
      const formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{2})/, '$1/')
        .slice(0, 5)
      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'

    const cardDigits = formData.cardNumber.replace(/\s/g, '')
    if (cardDigits.length !== 16) newErrors.cardNumber = 'Card number must be 16 digits'

    if (formData.expiryDate.length !== 5) newErrors.expiryDate = 'Expiry date must be MM/YY'

    if (formData.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

    // Generate random order number
    const orderNum = `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    setOrderNumber(orderNum)
    setShowSuccess(true)
  }

  const handleContinueShopping = () => {
    clearCart()
    navigate('/shop')
  }

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-2xl text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/shop')}
            className="text-blue-600 hover:underline font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-8">
              {/* Shipping Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.address && (
                      <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      {errors.city && (
                        <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      {errors.zipCode && (
                        <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option>USA</option>
                      <option>UK</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength="19"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        maxLength="5"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      {errors.expiryDate && (
                        <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="●●●"
                        maxLength="3"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      {errors.cvv && (
                        <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain bg-gray-100 rounded shrink-0"
                    />
                    <div className="grow min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-600">Qty: {item.qty}</p>
                    </div>
                    <p className="font-semibold text-gray-900 whitespace-nowrap">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
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
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
            <p className="text-6xl mb-6">🎉</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
            <p className="text-2xl font-bold text-blue-600 mb-6">{orderNumber}</p>
            <p className="text-lg text-gray-600 mb-2">Thank you, {formData.fullName}!</p>
            <p className="text-gray-600 mb-8">Your order is on its way.</p>

            <button
              onClick={handleContinueShopping}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
