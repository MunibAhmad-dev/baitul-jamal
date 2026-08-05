import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Truck, RotateCcw, Star } from 'lucide-react'

const trustBadges = [
  { icon: Truck, label: 'Free Delivery', sub: 'In Timergara' },
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
              Timergara's Trusted Home Store
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
              Premium mattresses, handwoven qaleen, elegant majalis sets, plush carpets, curtains, and quality bedding — all at the best prices in Timergara.
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

          {/* Right: Hero photo */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg">

              {/* Main photo frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/majalis-royal-gold-wide.jpg"
                  alt="Royal Majalis Setup — Baitul Jamal"
                  className="w-full aspect-[4/3] object-cover"
                />
                {/* Gradient overlay at bottom for label */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-5 text-white">
                  <p className="font-display font-bold text-lg leading-tight">Royal Blue & Gold Majalis</p>
                  <p className="text-xs text-white/75">Full room setup available</p>
                </div>
              </div>

              {/* Stats pill — top right */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 text-center min-w-[90px]">
                <p className="font-bold text-xl text-gold">4.9★</p>
                <p className="text-xs text-gray-500 font-medium">5000+ Happy Customers</p>
              </div>

              {/* Badge pill — bottom left */}
              <div className="absolute -bottom-4 -left-4 bg-brand text-white rounded-2xl shadow-xl px-4 py-3">
                <p className="font-bold text-sm">Premium Quality</p>
                <p className="text-xs text-brand-200">Sabaoon Chowk · Timergara</p>
              </div>

              {/* Floating category chips */}
              <div className="absolute top-10 -left-10 bg-white text-brand text-xs font-bold px-3 py-1.5 rounded-full shadow-lg -rotate-6 border border-brand-100">
                Majalis
              </div>
              <div className="absolute top-1/3 -right-8 bg-white text-gold-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg rotate-6 border border-gold/30">
                Carpets
              </div>
              <div className="absolute bottom-14 -right-10 bg-white text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg rotate-3 border border-gray-100">
                Qaleen
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
