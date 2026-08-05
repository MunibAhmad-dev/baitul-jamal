import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Package, CheckCircle, Truck, MapPin, Clock, Phone, MessageCircle } from 'lucide-react'
import { useOrders, ORDER_STATUSES } from '@/context/OrderContext'
import { formatPrice } from '@/lib/utils'

function StatusBar({ currentStatus }) {
  const idx = ORDER_STATUSES.findIndex(s => s.key === currentStatus)
  return (
    <div className="relative mt-2 mb-6">
      {/* Line */}
      <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200" />
      <div
        className="absolute top-5 left-5 h-0.5 bg-brand transition-all duration-700"
        style={{ width: idx === 0 ? '0%' : `${(idx / (ORDER_STATUSES.length - 1)) * 100}%` }}
      />
      {/* Steps */}
      <div className="relative flex justify-between">
        {ORDER_STATUSES.map((s, i) => {
          const done = i <= idx
          const active = i === idx
          return (
            <div key={s.key} className="flex flex-col items-center gap-2 w-16">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                done
                  ? 'bg-brand border-brand text-white'
                  : 'bg-white border-gray-200 text-gray-300'
              } ${active ? 'shadow-md scale-110' : ''}`}>
                {done ? <CheckCircle size={18} /> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <div className="text-center">
                <p className={`text-[10px] font-semibold leading-tight ${done ? 'text-brand' : 'text-gray-400'}`}>
                  {s.label}
                </p>
                <p className={`text-[10px] mt-0.5 leading-tight ${done ? 'text-brand/70' : 'text-gray-300'}`} dir="rtl">
                  {s.labelUr}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function OrderCard({ order }) {
  const statusLabel = ORDER_STATUSES.find(s => s.key === order.status)
  const placed = new Date(order.placedAt).toLocaleDateString('en-PK', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-brand-50 border-b border-brand-100 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500">Order ID</p>
          <p className="font-mono font-bold text-brand text-lg">{order.id}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Placed on</p>
          <p className="text-sm font-semibold text-gray-800">{placed}</p>
        </div>
      </div>

      <div className="px-6 py-5">
        {/* Status bar */}
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-4">Order Status</p>
        <StatusBar currentStatus={order.status} />

        {/* Status message */}
        <div className={`rounded-xl p-4 mb-5 ${
          order.status === 'delivered'
            ? 'bg-green-50 border border-green-100'
            : 'bg-amber-50 border border-amber-100'
        }`}>
          <p className={`text-sm font-semibold ${order.status === 'delivered' ? 'text-green-700' : 'text-amber-700'}`}>
            {order.status === 'placed'    && '✅ Your order has been received! We will call you within 2 hours to confirm.'}
            {order.status === 'confirmed' && '📞 Order confirmed! We are now preparing your items.'}
            {order.status === 'processing'&& '📦 Your order is being packed and prepared for dispatch.'}
            {order.status === 'dispatched'&& '🚚 Your order is on its way! Estimated delivery: 1–3 days.'}
            {order.status === 'delivered' && '🎉 Delivered! Thank you for shopping with Baitul Jamal.'}
          </p>
        </div>

        {/* Items */}
        <div className="space-y-3 mb-5">
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                {item.image
                  ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-gray-200" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                <p className="text-xs text-gray-400">{item.size} × {item.qty}</p>
              </div>
              <p className="text-sm font-bold text-gray-900">{formatPrice(item.price * item.qty)}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400">Deliver to</p>
            <p className="text-sm font-semibold text-gray-800">{order.customer.name}</p>
            <p className="text-xs text-gray-500">{order.customer.address}, {order.customer.city}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Total</p>
            <p className="font-bold text-lg text-brand">{formatPrice(order.total)}</p>
            <p className="text-xs text-gray-400 capitalize">{order.payment === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
          </div>
        </div>
      </div>

      {/* Contact actions */}
      <div className="px-6 pb-5 flex gap-3">
        <a
          href="tel:+9231199523856"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-50 text-brand text-sm font-semibold rounded-xl hover:bg-brand-100 transition-colors"
        >
          <Phone size={15} /> Call Us
        </a>
        <a
          href={`https://wa.me/9231199523856?text=${encodeURIComponent(`Order ID: ${order.id} — tracking inquiry`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-50 text-green-700 text-sm font-semibold rounded-xl hover:bg-green-100 transition-colors"
        >
          <MessageCircle size={15} /> WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function TrackOrder() {
  const [params] = useSearchParams()
  const { getById, getByPhone } = useOrders()

  const [input, setInput] = useState(params.get('id') || '')
  const [results, setResults] = useState(params.get('id') ? [getById(params.get('id'))].filter(Boolean) : null)
  const [searched, setSearched] = useState(!!params.get('id'))

  const handleSearch = (e) => {
    e.preventDefault()
    const q = input.trim()
    if (!q) return
    if (q.toUpperCase().startsWith('BJ-')) {
      const found = getById(q.toUpperCase())
      setResults(found ? [found] : [])
    } else {
      setResults(getByPhone(q))
    }
    setSearched(true)
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package size={28} className="text-brand" />
          </div>
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-500 text-sm">
            Enter your Order ID (e.g. BJ-20260805-1234) or phone number to check your order status.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={input}
              onChange={e => { setInput(e.target.value); setSearched(false) }}
              placeholder="Order ID or phone number"
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all shadow-sm"
            />
          </div>
          <button type="submit" className="btn-primary px-6 py-3.5 rounded-xl font-semibold">
            Track
          </button>
        </form>

        {/* Results */}
        {searched && results !== null && (
          results.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-semibold text-gray-800">No order found</p>
              <p className="text-sm text-gray-500 mt-1">
                Check your Order ID or phone number and try again.
              </p>
              <a
                href="tel:+9231199523856"
                className="mt-4 inline-flex items-center gap-2 text-brand text-sm font-semibold hover:underline"
              >
                <Phone size={14} /> Call us for help: +92 311 9952 3856
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {results.map(order => <OrderCard key={order.id} order={order} />)}
            </div>
          )
        )}

        {/* Help */}
        {!searched && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <p className="text-sm text-gray-500 mb-3">Need help with your order?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+9231199523856" className="flex items-center justify-center gap-2 text-brand font-semibold text-sm py-2.5 px-5 bg-brand-50 rounded-xl hover:bg-brand-100 transition-colors">
                <Phone size={15} /> +92 311 9952 3856
              </a>
              <a href="https://wa.me/9231199523856" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-green-700 font-semibold text-sm py-2.5 px-5 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
