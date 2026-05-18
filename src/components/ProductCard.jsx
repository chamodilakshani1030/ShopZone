import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'

export default function ProductCard({ id, image, title, price, rating, category }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({ id, image, title, price, rating, category })
    toast.success('Added to cart!')
  }

  const renderStars = (rate) => {
    const stars = []
    const fullStars = Math.floor(rate)
    const hasHalfStar = rate % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>⭐</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half">⭐</span>)
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>)
    }
    return stars
  }

  return (
    <div className="bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden h-full flex flex-col border border-slate-800">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-slate-950 h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
          {category}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 text-xl hover:scale-110 transition-transform"
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        {/* Title */}
        <h3 className="text-sm text-white font-semibold line-clamp-2 mb-2">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2 text-sm">
          <div className="flex gap-0.5">
            {renderStars(rating?.rate || 0)}
          </div>
          <span className="text-gray-600 text-xs">({rating?.count || 0})</span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-indigo-400 mb-4">${price.toFixed(2)}</p>

        {/* Actions */}
        <div className="space-y-2 mt-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${id}`}
            className="block text-center text-indigo-300 text-sm hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
