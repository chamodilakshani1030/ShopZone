import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const totalItems = useCartStore((state) => state.totalItems)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <span className="text-2xl font-bold text-blue-600">ShopZone</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              {/* Nav Links */}
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/shop" className="text-gray-700 hover:text-blue-600 transition-colors">
                Shop
              </Link>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-2xl hover:text-blue-600 transition-colors"
              >
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-2xl"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-in duration-200">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <a href="#about" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                About
              </a>
            </div>
          )}
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
