import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Eye } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

const categoryLabels = {
  mattresses: 'Mattresses',
  carpets: 'Carpets',
  qaleen: 'Qaleen',
  majalis: 'Majalis',
  bedsheets: 'Bedsheets',
  blankets: 'Blankets',
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product, product.sizes?.[0] || 'Standard')
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {product.image && !imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Fallback gradient */
          <div className={`w-full h-full bg-gradient-to-br ${product.gradient || 'from-brand-700 to-brand-900'} flex items-center justify-center`}>
            <span className="text-white/60 text-sm">No image</span>
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
              product.badgeColor === 'gold' ? 'bg-gold text-white' : 'bg-brand text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-500 text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors && product.colors.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {product.colors.slice(0, 5).map(c => (
              <span
                key={c.name}
                title={c.name}
                className="w-4 h-4 rounded-full border-2 border-white shadow"
                style={{ background: c.hex }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white shadow text-[8px] font-bold text-gray-600 flex items-center justify-center">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Quick-view pill */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md">
            <Eye size={14} className="text-gray-700" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
          {categoryLabels[product.category]}
        </p>

        <h3 className="font-display font-bold text-gray-900 text-base leading-snug mb-1 group-hover:text-brand transition-colors line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-gray-400 mb-3" dir="rtl">{product.nameUrdu}</p>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} size={12}
                className={star <= Math.round(product.rating) ? 'text-gold fill-gold' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-lg text-brand-900">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white scale-95'
                : 'bg-brand text-white hover:bg-brand-700 hover:scale-105'
            }`}
          >
            <ShoppingCart size={14} />
            {added ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </Link>
  )
}
