import { Link } from 'react-router-dom'
import { ArrowRight, Layers, LayoutGrid, Grip, Sofa, BedDouble, Wind } from 'lucide-react'
import { categories } from '@/data/categories'

const iconMap = {
  Layers: Layers,
  LayoutGrid: LayoutGrid,
  Grip: Grip,
  Sofa: Sofa,
  BedDouble: BedDouble,
  Wind: Wind,
}

export default function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Browse By Category</p>
          <h2 className="section-title mb-4">Everything for Your Home</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            From sleeping comfort to sitting elegance — we have everything to furnish your home beautifully.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Layers
            const isLarge = idx === 0 || idx === 3

            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className={`
                  group relative overflow-hidden rounded-2xl md:rounded-3xl
                  bg-gradient-to-br ${cat.gradient}
                  card-hover cursor-pointer
                  ${isLarge ? 'row-span-1 md:col-span-1' : ''}
                `}
                style={{ minHeight: isLarge ? '220px' : '180px' }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 70%, white 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Decorative circles */}
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -right-4 top-8 w-20 h-20 rounded-full bg-white/5" />

                {/* Content */}
                <div className="relative z-10 p-6 md:p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="font-display font-bold text-white text-lg md:text-xl leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-white/70 text-xs mt-1 font-medium" dir="rtl">
                      {cat.nameUrdu}
                    </p>
                    <p className="text-white/60 text-xs mt-2 leading-relaxed hidden md:block">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-white/80 text-xs font-medium bg-white/15 px-3 py-1 rounded-full">
                      {cat.count}+ Products
                    </span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/40 group-hover:translate-x-1 transition-all duration-300">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
