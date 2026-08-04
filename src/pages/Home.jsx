import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'
import FeaturedProducts from '@/components/FeaturedProducts'
import PromoBanner from '@/components/PromoBanner'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoBanner />
      <Testimonials />
    </main>
  )
}
