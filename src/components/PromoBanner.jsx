import { Truck, Phone, Shield, Award } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    sub: 'On orders above PKR 5,000 in Timergara',
  },
  {
    icon: Phone,
    title: 'Cash on Delivery',
    sub: 'Pay when you receive your order',
  },
  {
    icon: Shield,
    title: '7-Day Returns',
    sub: 'Easy hassle-free return policy',
  },
  {
    icon: Award,
    title: 'Trusted Quality',
    sub: 'Serving Timergara & Dir District',
  },
]

export default function PromoBanner() {
  return (
    <>
      {/* Feature strip */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big promo banner */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block bg-gold/20 border border-gold/40 text-gold-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Special Offer
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Get <span className="text-gold">20% Off</span> Your First Order
            </h2>
            <p className="text-brand-200 text-base md:text-lg mb-8 leading-relaxed">
              Visit our showroom at Sabaoon Chowk, Timergara or call us today. Mention this offer to get 20% discount on your first purchase of PKR 10,000 or more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+923119523856"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:-translate-y-0.5 text-base"
              >
                <Phone size={18} />
                Call Now: +92 311 9523856
              </a>
              <a
                href="https://wa.me/923119523856"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-all border border-white/20 text-base"
              >
                WhatsApp Us
              </a>
            </div>
            <p className="text-brand-300 text-xs mt-6">
              * Offer valid for in-store purchases at Timergara showroom. Terms apply.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
