import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Ahmed Raza',
    city: 'Gulberg, Lahore',
    rating: 5,
    text: 'Bought a complete majalis set for my drawing room. The quality is exceptional and exactly as described. Delivery was on time. Highly recommend Baitul Jamal!',
    initials: 'AR',
    color: 'bg-brand text-white',
  },
  {
    name: 'Fatima Malik',
    city: 'Defence, Lahore',
    rating: 5,
    text: 'The memory foam mattress I ordered is amazing. Best sleep I\'ve had in years! Price was very reasonable compared to other shops. Will definitely buy again.',
    initials: 'FM',
    color: 'bg-gold text-white',
  },
  {
    name: 'Hassan Tariq',
    city: 'Johar Town, Lahore',
    rating: 5,
    text: 'Got a handwoven Persian qaleen for my living room. It transformed the whole look! The staff was very helpful in choosing the right size and design.',
    initials: 'HT',
    color: 'bg-rose-600 text-white',
  },
  {
    name: 'Sana Akhtar',
    city: 'Model Town, Lahore',
    rating: 4,
    text: 'Ordered bedsheets and blankets for the whole house. Great quality for the price. The printed bedsheet set is beautiful. Cash on delivery made it very convenient.',
    initials: 'SA',
    color: 'bg-purple-600 text-white',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Customer Reviews</p>
          <h2 className="section-title mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={18} className="text-gold fill-gold" />
              ))}
            </div>
            <span className="font-bold text-gray-800">4.9/5</span>
            <span className="text-gray-400 text-sm">based on 500+ reviews</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r) => (
            <div key={r.name} className="bg-gray-50 rounded-2xl p-6 relative hover:shadow-md transition-shadow">
              <Quote size={24} className="text-brand-100 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    size={14}
                    className={s <= r.rating ? 'text-gold fill-gold' : 'text-gray-200 fill-gray-200'}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-5 line-clamp-4">
                "{r.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${r.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                  {r.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
