import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Eye, Layers, LayoutGrid, Grip, Sofa, BedDouble, Wind } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

const iconMap = {
  Layers: Layers,
  LayoutGrid: LayoutGrid,
  Grip: Grip,
  Sofa: Sofa,
  BedDouble: BedDouble,
  Wind: Wind,
}

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
  const Icon = iconMap[product.icon] || Layers

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
      {/* Image / visual area */}
      <div className={`relative h-52 bg-gradient-to-br ${product.gradient} overflow-hidden`}>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
            backgroundSize: '18px 18px',
          }}
        />

        {/* Decorative circles */}
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute right-6 bottom-6 w-20 h-20 rounded-full bg-white/8" />

        {/* Category icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon size={36} className="text-white" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
              product.badgeColor === 'gold'
                ? 'bg-gold text-white'
                : 'bg-brand text-white'
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

        {/* Quick view button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md">
            <Eye size={14} className="text-gray-700" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
          {categoryLabels[product.category]}
        </p>

        {/* Name */}
        <h3 className="font-display font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-brand transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Urdu name */}
        <p className="text-xs text-gray-400 mb-3" dir="rtl">
          {product.nameUrdu}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={12}
                className={star <= Math.round(product.rating) ? 'text-gold fill-gold' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price + Cart */}
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
