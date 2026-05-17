import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const { products, loading } = useProducts()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchParams] = useSearchParams()

  // Extract categories when products load
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map((p) => p.category))]
      setCategories(uniqueCategories)

      // Check if category is in URL
      const categoryParam = searchParams.get('category')
      if (categoryParam) {
        setSelectedCategories([categoryParam])
      }
    }
  }, [products, searchParams])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Filter by price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Filter by search
    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    }

    setFilteredProducts(result)
  }, [products, selectedCategories, priceRange, sortBy, searchQuery])

  const handleCategoryToggle = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 1000])
    setSearchQuery('')
    setSortBy('default')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop</h1>

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {sidebarOpen ? '✕ Close Filters' : '☰ Filters'}
        </button>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside
            className={`w-full md:w-64 ${
              sidebarOpen ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-gray-700 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600">
                    ${priceRange[0]} - ${priceRange[1]}
                  </p>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={handleClearFilters}
                className="w-full bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="grow">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <p className="text-gray-600">
                Showing <span className="font-bold">{filteredProducts.length}</span> products
              </p>

              <div className="flex gap-4 items-center flex-wrap">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="default">Sort By</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-300 rounded-xl h-80 animate-pulse"></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-6xl mb-4">🔍</p>
                <p className="text-xl text-gray-600">No products found</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-blue-600 hover:underline font-semibold"
                >
                  Clear filters and try again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
        </div>
      </div>
    </div>
  )
}
