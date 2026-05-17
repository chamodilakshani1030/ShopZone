import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { products, loading } = useProducts()

  const featuredProducts = useMemo(() => {
    return products.slice(0, 8)
  }, [products])

  const categories = [
    { name: 'Electronics', emoji: '💻', value: 'electronics' },
    { name: 'Jewelery', emoji: '💍', value: 'jewelery' },
    { name: "Men's Clothing", emoji: '👔', value: "men's clothing" },
    { name: "Women's Clothing", emoji: '👗', value: "women's clothing" },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Shop The Latest Trends</h1>
          <p className="text-xl text-blue-100 mb-8">
            Discover amazing products at unbeatable prices
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/shop"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/shop"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Check out our best-selling items</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-300 rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  rating={product.rating}
                  category={product.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-600">Browse our popular categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                to={`/shop?category=${cat.value}`}
                className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="text-6xl mb-4">{cat.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
