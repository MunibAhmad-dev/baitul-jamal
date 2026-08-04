import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { products } from '@/data/products'

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'mattresses', label: 'Mattresses' },
  { id: 'carpets', label: 'Carpets' },
  { id: 'qaleen', label: 'Qaleen' },
  { id: 'majalis', label: 'Majalis' },
  { id: 'bedsheets', label: 'Bedsheets' },
  { id: 'blankets', label: 'Blankets' },
]

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? products.slice(0, 8)
    : products.filter(p => p.category === activeTab).slice(0, 8)

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Our Collection</p>
            <h2 className="section-title">Featured Products</h2>
            <p className="text-gray-500 mt-2 text-base">Handpicked bestsellers and new arrivals</p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-brand font-semibold text-sm hover:gap-3 transition-all self-start md:self-auto"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-brand text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">No products in this category yet.</p>
          </div>
        )}

        {/* View more */}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 btn-outline"
          >
            Explore Full Collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
