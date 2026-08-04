import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, Search, X } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'
import { categories } from '@/data/categories'

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('default')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const activeCategory = searchParams.get('category') || 'all'
  const query = searchParams.get('q') || ''

  const setCategory = (id) => {
    const next = new URLSearchParams(searchParams)
    if (id === 'all') next.delete('category')
    else next.set('category', id)
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]

    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory)
    }

    if (query) {
      const q = query.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameUrdu.includes(q) ||
        p.category.includes(q)
      )
    }

    switch (sort) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price)
      case 'price-desc': return list.sort((a, b) => b.price - a.price)
      case 'rating': return list.sort((a, b) => b.rating - a.rating)
      case 'reviews': return list.sort((a, b) => b.reviews - a.reviews)
      default: return list
    }
  }, [activeCategory, query, sort])

  const activeCat = categories.find(c => c.id === activeCategory)

  return (
    <main className="min-h-screen bg-gray-50 pb-16">

      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display font-bold text-3xl text-gray-900">
            {query
              ? `Search: "${query}"`
              : activeCat ? activeCat.name : 'All Products'
            }
          </h1>
          {activeCat && (
            <p className="text-gray-500 mt-1" dir="rtl">{activeCat.nameUrdu}</p>
          )}
          <p className="text-gray-400 text-sm mt-2">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === 'all' ? 'bg-brand text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      activeCategory === cat.id ? 'bg-brand text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${cat.gradient} flex-shrink-0`} />
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">

              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700"
              >
                <SlidersHorizontal size={16} />
                Filter
              </button>

              {/* Active filter chip */}
              {activeCategory !== 'all' && activeCat && (
                <div className="flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand text-sm font-medium px-3 py-1.5 rounded-full">
                  {activeCat.name}
                  <button onClick={() => setCategory('all')} className="hover:bg-brand-100 rounded-full p-0.5">
                    <X size={12} />
                  </button>
                </div>
              )}

              {/* Sort */}
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="ml-auto px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-brand cursor-pointer"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Mobile category filter */}
            {mobileFilterOpen && (
              <div className="lg:hidden flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-4">
                <button
                  onClick={() => setCategory('all')}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === 'all' ? 'bg-brand text-white' : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat.id ? 'bg-brand text-white' : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            {/* Products grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search size={48} className="text-gray-200 mx-auto mb-4" />
                <p className="font-display font-bold text-xl text-gray-800 mb-2">No products found</p>
                <p className="text-gray-500 text-sm">Try a different search term or browse all categories.</p>
                <button onClick={() => setCategory('all')} className="mt-6 btn-primary">
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
