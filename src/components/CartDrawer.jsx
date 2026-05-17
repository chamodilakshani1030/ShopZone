import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'

export default function CartDrawer({ isOpen, onClose }) {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQty = useCartStore((state) => state.updateQty)
  const totalPrice = useCartStore((state) => state.totalPrice)

  const handleRemove = (id) => {
    removeItem(id)
    toast.error('Removed from cart')
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button
              onClick={onClose}
              className="mt-4 text-blue-600 hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain bg-gray-100 rounded"
                  />

                  {/* Content */}
                  <div className="grow">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>

                    {/* Qty Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-600 text-xl"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Checkout
              </Link>

              <button
                onClick={onClose}
                className="w-full text-center border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
