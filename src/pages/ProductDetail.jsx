import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useProduct, useProducts } from '../hooks/useProducts'
import { useCartStore } from '../store/cartStore'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const { product, loading } = useProduct(parseInt(id))
  const { products } = useProducts()
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const relatedProducts = useMemo(() => {
    if (!product || products.length === 0) return []
    return products
      .filter(
        (p) => p.category === product.category && p.id !== product.id
      )
      .slice(0, 4)
  }, [product, products])

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    toast.success(`Added ${quantity} item(s) to cart!`)
    setQuantity(1)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-300 rounded-xl h-96 animate-pulse mb-8"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl text-gray-600">Product not found</p>
          <Link to="/shop" className="text-blue-600 hover:underline mt-4 block">
            ← Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 bg-white rounded-xl shadow-md p-8">
          {/* Left Column - Image */}
          <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center h-96">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col justify-between">
            {/* Category Badge */}
            <div>
              <div className="inline-block bg-gray-400 text-white text-sm px-3 py-1 rounded-full mb-4 capitalize">
                {product.category}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {renderStars(product.rating?.rate || 0)}
                </div>
                <span className="text-gray-600">
                  {product.rating?.rate?.toFixed(1) || 'N/A'} ({product.rating?.count || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <p className="text-4xl font-bold text-blue-600 mb-6">
                ${product.price.toFixed(2)}
              </p>

              {/* Description */}
              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <label className="font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-lg hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg mb-4"
              >
                Add to Cart
              </button>

              <Link
                to="/shop"
                className="text-blue-600 hover:underline font-semibold text-center block"
              >
                ← Back to Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  id={relProduct.id}
                  image={relProduct.image}
                  title={relProduct.title}
                  price={relProduct.price}
                  rating={relProduct.rating}
                  category={relProduct.category}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
