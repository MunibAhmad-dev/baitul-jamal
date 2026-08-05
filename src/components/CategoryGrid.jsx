import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/data/categories'

export default function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Browse By Category</p>
          <h2 className="section-title mb-4">Everything for Your Home</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            From sleeping comfort to sitting elegance — we have everything to furnish your home beautifully.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group relative overflow-hidden rounded-2xl block"
              style={{ height: '190px' }}
            >
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
              )}

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 group-hover:from-black/85 transition-colors duration-300" />

              {/* Types badge — top right */}
              {cat.types && (
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {cat.types.length} types
                  </span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display font-bold text-white text-sm md:text-base leading-tight">
                  {cat.name}
                </h3>
                {cat.nameUrdu && (
                  <p className="text-white/65 text-[11px] mt-0.5" dir="rtl">{cat.nameUrdu}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/55 text-[11px]">{cat.count}+ items</span>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/40 group-hover:translate-x-0.5 transition-all duration-300">
                    <ArrowRight size={12} className="text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
