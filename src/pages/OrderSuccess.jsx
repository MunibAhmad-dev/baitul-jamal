import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, Package, Phone, MessageCircle, ArrowRight, Copy, Check } from 'lucide-react'
import { useOrders } from '@/context/OrderContext'
import { formatPrice } from '@/lib/utils'

export default function OrderSuccess() {
  const [params] = useSearchParams()
  const { getById } = useOrders()
  const [copied, setCopied] = useState(false)

  const orderId = params.get('id')
  const order = getById(orderId)

  const copyId = () => {
    navigator.clipboard.writeText(orderId).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const waMessage = encodeURIComponent(
    `السلام علیکم! میں نے ابھی آرڈر دیا ہے۔ Order ID: ${orderId}. براہ کرم تصدیق کریں۔`
  )

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-gray-500">Order not found.</p>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

        {/* Success header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-500 text-base">
            شکریہ! آپ کا آرڈر موصول ہو گیا ہے۔ ہم 2 گھنٹے کے اندر کال کریں گے۔
          </p>
        </div>

        {/* Order ID card */}
        <div className="bg-brand-900 text-white rounded-2xl p-6 mb-6 text-center">
          <p className="text-brand-200 text-sm mb-2">Your Order ID</p>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono font-bold text-2xl tracking-widest">{orderId}</span>
            <button
              onClick={copyId}
              className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              title="Copy order ID"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
          <p className="text-brand-300 text-xs mt-3">
            Save this ID to track your order at any time
          </p>
        </div>

        {/* What's next */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package size={18} className="text-brand" />
            What happens next?
          </h2>
          <div className="space-y-3">
            {[
              { step: '1', text: 'We will call you within 2 hours to confirm your order', sub: `on ${order.customer.phone}` },
              { step: '2', text: 'Order is prepared and packed at our Timergara showroom', sub: '' },
              { step: '3', text: 'Your order is dispatched for delivery', sub: 'Estimated: 2–5 working days' },
              { step: '4', text: 'Delivered to your door — pay on delivery (COD)', sub: order.payment === 'bank' ? 'Bank transfer details shared after confirmation' : 'Cash on delivery' },
            ].map(({ step, text, sub }) => (
              <div key={step} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step}
                </span>
                <div>
                  <p className="text-sm text-gray-800">{text}</p>
                  {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order details recap */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Order Details</h2>
          <div className="space-y-3 mb-4">
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
          <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
            <span>Total Paid</span>
            <span className="text-brand">{formatPrice(order.total)}</span>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            <p><span className="font-medium text-gray-700">Deliver to:</span> {order.customer.name}</p>
            <p className="mt-0.5">{order.customer.address}, {order.customer.city}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={`/track-order?id=${orderId}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-700 transition-colors"
          >
            <Package size={18} />
            Track My Order
          </Link>
          <a
            href={`https://wa.me/923119523856?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ebe5d] transition-colors"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <Link
            to="/products"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <a
            href="tel:+923119523856"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Phone size={16} />
            Call Us
          </a>
        </div>
      </div>
    </main>
  )
}
