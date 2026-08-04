import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, ShoppingCart, Phone, Check, ChevronRight, Layers, LayoutGrid, Grip, Sofa, BedDouble, Wind, ArrowLeft } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { getProductById, products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import ProductCard from '@/components/ProductCard'

const iconMap = { Layers, LayoutGrid, Grip, Sofa, BedDouble, Wind }

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = getProductById(id)

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard')
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    )
  }

  const Icon = iconMap[product.icon] || Layers
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAdd = () => {
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link to="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/products" className="hover:text-brand transition-colors">Products</Link>
            <ChevronRight size={12} />
            <Link to={`/products?category=${product.category}`} className="hover:text-brand transition-colors capitalize">
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Back button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand mb-6 transition-colors">
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Visual */}
          <div>
            <div className={`w-full aspect-[4/3] rounded-3xl bg-gradient-to-br ${product.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10" />
              <div className="absolute right-8 bottom-8 w-32 h-32 rounded-full bg-white/8" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center">
                  <Icon size={56} className="text-white" />
                </div>
              </div>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-5 left-5">
                  <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${
                    product.badgeColor === 'gold' ? 'bg-gold text-white' : 'bg-brand text-white'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Category + Urdu */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider capitalize">{product.category}</span>
              <span className="text-gray-200">•</span>
              <span className="text-xs text-gray-400" dir="rtl">{product.nameUrdu}</span>
            </div>

            <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={16} className={s <= Math.round(product.rating) ? 'text-gold fill-gold' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
              <span className="font-bold text-gray-800">{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display font-bold text-3xl text-brand-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    -{discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-800 mb-3">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        selectedSize === size
                          ? 'border-brand bg-brand text-white'
                          : 'border-gray-200 text-gray-600 hover:border-brand-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'btn-primary'
                }`}
              >
                {added ? <Check size={20} /> : <ShoppingCart size={20} />}
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <a
                href="tel:+923001234567"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-brand text-brand font-bold text-base hover:bg-brand hover:text-white transition-all"
              >
                <Phone size={20} />
                Order by Phone
              </a>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm font-semibold text-gray-800 mb-3">Product Highlights</p>
              <ul className="space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check size={14} className="text-brand mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="section-title mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
