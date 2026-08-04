import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Truck, RotateCcw, Star } from 'lucide-react'

const trustBadges = [
  { icon: Truck, label: 'Free Delivery', sub: 'In Lahore city' },
  { icon: Shield, label: 'Quality Assured', sub: 'Original products' },
  { icon: RotateCcw, label: '7-Day Returns', sub: 'Hassle free' },
]

const floatingCards = [
  { label: 'Memory Foam', sub: 'Mattresses', gradient: 'from-teal-600 to-teal-800', rotate: '-rotate-3', top: 'top-4', left: 'left-4' },
  { label: 'Persian', sub: 'Qaleen', gradient: 'from-rose-600 to-rose-900', rotate: 'rotate-3', top: 'top-4', right: 'right-4' },
  { label: 'Majalis', sub: 'Sets', gradient: 'from-purple-600 to-purple-900', rotate: '-rotate-2', bottom: 'bottom-16', left: 'left-8' },
  { label: 'Soft', sub: 'Blankets', gradient: 'from-indigo-600 to-indigo-900', rotate: 'rotate-2', bottom: 'bottom-16', right: 'right-8' },
  { label: 'Turkish', sub: 'Carpets', gradient: 'from-amber-600 to-amber-800', rotate: '-rotate-1', top: '50%', left: '50%' },
]

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-cream via-white to-brand-50 overflow-hidden">
      {/* Background geometric pattern */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230C4F3C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Content */}
          <div className="animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <Star size={12} fill="currentColor" />
              Lahore's Trusted Home Store Since 2008
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
              Your Home,{' '}
              <span className="text-brand-900 relative">
                Beautifully
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gold rounded-full" />
              </span>{' '}
              <span className="text-gold">Furnished</span>
            </h1>

            {/* Urdu tagline */}
            <p className="text-lg text-gray-500 mb-3 font-medium" dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
              آپ کے گھر کو خوبصورت بنانے کی ہر چیز
            </p>

            {/* Sub text */}
            <p className="text-base text-gray-600 mb-8 leading-relaxed max-w-lg">
              Premium mattresses, handwoven qaleen, elegant majalis sets, plush carpets, and quality bedding — all at the best prices in Lahore.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/products" className="btn-primary flex items-center gap-2 text-base">
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link to="/products?category=mattresses" className="btn-outline flex items-center gap-2 text-base">
                Explore Categories
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {trustBadges.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual collage */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-sm h-[460px]">

              {/* Central large card */}
              <div className="absolute inset-8 bg-gradient-to-br from-brand-800 to-brand-950 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white p-8">
                <div className="text-6xl mb-4">🏡</div>
                <p className="font-display font-bold text-2xl text-center">Baitul Jamal</p>
                <p className="text-brand-200 text-sm mt-1 tracking-widest uppercase">House of Beauty</p>
                <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="font-bold text-xl text-gold">120+</p>
                    <p className="text-xs text-brand-200">Products</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="font-bold text-xl text-gold">15yr</p>
                    <p className="text-xs text-brand-200">Experience</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="font-bold text-xl text-gold">5000+</p>
                    <p className="text-xs text-brand-200">Customers</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="font-bold text-xl text-gold">4.9★</p>
                    <p className="text-xs text-brand-200">Rating</p>
                  </div>
                </div>
              </div>

              {/* Floating category chips */}
              <div className="absolute top-0 left-0 bg-gradient-to-br from-teal-600 to-teal-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg -rotate-3">
                Mattresses
              </div>
              <div className="absolute top-2 right-0 bg-gradient-to-br from-rose-600 to-rose-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg rotate-3">
                Qaleen
              </div>
              <div className="absolute bottom-4 left-0 bg-gradient-to-br from-amber-600 to-amber-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg rotate-2">
                Carpets
              </div>
              <div className="absolute bottom-2 right-2 bg-gradient-to-br from-purple-600 to-purple-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg -rotate-2">
                Majalis
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg rotate-1">
                Blankets
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-br from-sky-600 to-sky-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg -rotate-1">
                Bedsheets
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="h-8 bg-white mt-0" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
    </section>
  )
}
