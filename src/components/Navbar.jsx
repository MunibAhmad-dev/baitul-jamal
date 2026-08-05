import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, ChevronDown, Phone, Heart, User, LogOut, Package } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/context/WishlistContext'
import { categories } from '@/data/categories'

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart()
  const { user, logout } = useAuth()
  const { count: wishlistCount } = useWishlist()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [accountOpen, setAccountOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-brand-900 text-white text-center text-xs py-2 px-4 font-medium tracking-wide">
        <span className="hidden sm:inline">🚚 Free Delivery in Timergara &nbsp;|&nbsp; 📞 Call us: </span>
        <a href="tel:+9231199523856" className="underline underline-offset-2 hover:text-gold-300 transition-colors">+92 311 9952 3856</a>
        <span className="hidden sm:inline"> &nbsp;|&nbsp; Cash on Delivery Available</span>
      </div>

      {/* Main navbar */}
      <nav className={`sticky top-0 z-30 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-brand bg-brand-50' : 'text-gray-700 hover:text-brand hover:bg-gray-50'}`
                }
              >
                Home
              </NavLink>

              {/* Categories dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand hover:bg-gray-50 transition-colors">
                  Categories
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {categories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{cat.name[0]}</span>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{cat.name}</p>
                        <p className="text-xs text-gray-500">{cat.nameUrdu} · {cat.count}+ items</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-brand bg-brand-50' : 'text-gray-700 hover:text-brand hover:bg-gray-50'}`
                }
              >
                All Products
              </NavLink>

              <a
                href="#contact"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand hover:bg-gray-50 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-brand"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Call button (desktop only) */}
              <a
                href="tel:+9231199523856"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-brand border border-brand-200 text-sm font-medium hover:bg-brand-50 transition-colors"
              >
                <Phone size={14} />
                Order Now
              </a>

              {/* Wishlist */}
              <Link
                to="/account"
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-brand"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-brand"
                  aria-label="Account"
                >
                  {user
                    ? <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">{user.name[0].toUpperCase()}</div>
                    : <User size={20} />
                  }
                </button>

                {accountOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setAccountOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 animate-fade-in">
                      {user ? (
                        <>
                          <div className="px-4 py-2.5 border-b border-gray-100">
                            <p className="text-sm font-bold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.phone}</p>
                          </div>
                          <Link to="/account" onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <Package size={15} className="text-gray-400" /> My Orders
                          </Link>
                          <Link to="/track-order" onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <Package size={15} className="text-gray-400" /> Track Order
                          </Link>
                          <button onClick={() => { logout(); setAccountOpen(false) }}
                            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                            <LogOut size={15} /> Log Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to="/account" onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <User size={15} className="text-gray-400" /> Log In
                          </Link>
                          <Link to="/account" onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <User size={15} className="text-gray-400" /> Sign Up
                          </Link>
                          <Link to="/track-order" onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <Package size={15} className="text-gray-400" /> Track Order
                          </Link>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-brand"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3 animate-fade-in">
              <form onSubmit={handleSearch} className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search for mattresses, carpets, qaleen..."
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand-100 transition-all"
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              <Link to="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">Home</Link>
              <Link to="/products" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">All Products</Link>

              <div className="px-4 pt-2 pb-1">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Categories</p>
              </div>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                    {cat.name[0]}
                  </span>
                  <span>{cat.name} <span className="text-gray-400 font-normal">({cat.nameUrdu})</span></span>
                </Link>
              ))}

              <div className="pt-2 space-y-2">
                <Link to="/track-order" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Package size={16} className="text-gray-400" /> Track Order
                </Link>
                {user ? (
                  <>
                    <Link to="/account" onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <User size={16} className="text-gray-400" /> My Account ({user.name})
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false) }}
                      className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">
                      <LogOut size={16} /> Log Out
                    </button>
                  </>
                ) : (
                  <Link to="/account" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <User size={16} className="text-gray-400" /> Login / Sign Up
                  </Link>
                )}
                <a href="tel:+9231199523856" className="flex items-center justify-center gap-2 w-full py-3 bg-brand text-white rounded-xl text-sm font-semibold">
                  <Phone size={16} />
                  Call to Order: +92 311 9952 3856
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
