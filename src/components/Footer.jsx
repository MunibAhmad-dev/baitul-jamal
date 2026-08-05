import { Link } from 'react-router-dom'
import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import { categories } from '@/data/categories'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo textColor="text-white" />
            <p className="mt-4 text-2xl font-semibold text-gold/90 tracking-wide" dir="rtl" style={{ fontFamily: 'serif' }}>
              بيت الجمال
            </p>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Timergara's trusted name in quality home furnishings. We bring beauty and comfort to every home.
            </p>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed" dir="rtl">
              ٹیمرگرہ میں گھریلو سامان کا قابلِ اعتماد نام
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                {/* Facebook icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                {/* Instagram icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://wa.me/9231199523856"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Categories</h4>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-gold rounded-full" />
                    {cat.name}
                    <span className="text-gray-600 text-xs">({cat.nameUrdu})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'All Products', to: '/products' },
                { label: 'About Us', to: '/#about' },
                { label: 'Contact', to: '/#contact' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-gold rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mt-8 mb-5">Policies</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="text-gray-500 flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full" />Return Policy</span></li>
              <li><span className="text-gray-500 flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full" />Delivery Info</span></li>
              <li><span className="text-gray-500 flex items-center gap-2"><span className="w-1 h-1 bg-gray-600 rounded-full" />Warranty Terms</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Sabaoon Chowk, Timergara</p>
                  <p className="text-sm text-gray-300">Near Parko Electronics, Dir, KPK</p>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a href="tel:+9231199523856" className="text-sm text-gray-300 hover:text-white transition-colors">
                  +92 311 9952 3856
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <MessageCircle size={16} className="text-gold flex-shrink-0" />
                <a
                  href="https://wa.me/9231199523856"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  WhatsApp: +92 311 9952 3856
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a href="mailto:info@baituljamal.pk" className="text-sm text-gray-300 hover:text-white transition-colors">
                  info@baituljamal.pk
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-gray-800 rounded-xl">
              <p className="text-xs text-gray-400 mb-1">Shop Hours</p>
              <p className="text-sm text-white font-medium">Mon – Sat: 9 AM – 9 PM</p>
              <p className="text-sm text-gray-400">Sunday: 10 AM – 7 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Baitul Jamal. All rights reserved.</p>
          <p>Made with ❤️ for Timergara</p>
        </div>
      </div>
    </footer>
  )
}
