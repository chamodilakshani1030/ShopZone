export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopZone</h3>
            <p className="text-gray-400">
              Your one-stop destination for amazing products at unbeatable prices. Shop with confidence and enjoy the best deals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/shop" className="hover:text-white transition-colors">Shop</a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white transition-colors">Cart</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and updates</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} ShopZone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
