import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Truck, CreditCard, Banknote, Check, AlertCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import { useAuth } from '@/context/AuthContext'
import { formatPrice } from '@/lib/utils'

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1.5">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  )
}

const inputCls = (err) =>
  `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
    err
      ? 'border-red-400 bg-red-50 focus:border-red-500'
      : 'border-gray-200 bg-gray-50 focus:border-brand focus:ring-2 focus:ring-brand/10'
  }`

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const { placeOrder } = useOrders()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: '',
    address: '',
    notes: '',
    payment: 'cod',
  })
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^(03\d{9}|3\d{9})$/.test(form.phone.replace(/[\s-]/g, '')))
      e.phone = 'Enter a valid number e.g. 0311-9523856'
    if (!form.city.trim()) e.city = 'City / area is required'
    if (!form.address.trim()) e.address = 'Delivery address is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setPlacing(true)
    const order = placeOrder({
      customer: { name: form.name, phone: form.phone, city: form.city, address: form.address, notes: form.notes },
      payment: form.payment,
      items: items.map(i => ({ id: i.id, name: i.name, image: i.image, size: i.size, qty: i.qty, price: i.price })),
      total: totalPrice,
      userId: user?.id || null,
    })
    clearCart()
    navigate(`/order-success?id=${order.id}`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-5xl">🛒</div>
        <h2 className="font-display font-bold text-2xl text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500">Add some products before checking out.</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    )
  }

  const delivery = totalPrice >= 5000 ? 0 : 300
  const grandTotal = totalPrice + delivery

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link to="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/products" className="hover:text-brand transition-colors">Products</Link>
            <ChevronRight size={12} />
            <span className="text-gray-700 font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Left — form */}
            <div className="lg:col-span-3 space-y-6">

              {/* Delivery info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-display font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
                  <Truck size={18} className="text-brand" />
                  Delivery Information
                </h2>
                <div className="space-y-4">
                  <Field label="Full Name" error={errors.name}>
                    <input
                      type="text"
                      placeholder="e.g. Ahmed Khan"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      className={inputCls(errors.name)}
                    />
                  </Field>

                  <Field label="Phone Number" error={errors.phone}>
                    <input
                      type="tel"
                      placeholder="e.g. 0311-9523856"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      className={inputCls(errors.phone)}
                    />
                    <p className="text-xs text-gray-400 mt-1">We'll call this number to confirm your order</p>
                  </Field>

                  <Field label="City / Area" error={errors.city}>
                    <input
                      type="text"
                      placeholder="e.g. Timergara, Dir"
                      value={form.city}
                      onChange={e => set('city', e.target.value)}
                      className={inputCls(errors.city)}
                    />
                  </Field>

                  <Field label="Full Delivery Address" error={errors.address}>
                    <textarea
                      rows={3}
                      placeholder="House no., street, mohalla, landmark..."
                      value={form.address}
                      onChange={e => set('address', e.target.value)}
                      className={inputCls(errors.address)}
                    />
                  </Field>

                  <Field label="Special Instructions (optional)">
                    <input
                      type="text"
                      placeholder="Colour preference, delivery time, etc."
                      value={form.notes}
                      onChange={e => set('notes', e.target.value)}
                      className={inputCls(false)}
                    />
                  </Field>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-display font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
                  <CreditCard size={18} className="text-brand" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { key: 'cod',  Icon: Banknote, label: 'Cash on Delivery', sub: 'Pay when you receive your order — no advance required' },
                    { key: 'bank', Icon: CreditCard, label: 'Bank Transfer', sub: 'Transfer before dispatch. Details shared after order confirmation.' },
                  ].map(({ key, Icon, label, sub }) => (
                    <label
                      key={key}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.payment === key
                          ? 'border-brand bg-brand-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={key}
                        checked={form.payment === key}
                        onChange={() => set('payment', key)}
                        className="mt-0.5 accent-brand"
                      />
                      <Icon size={20} className={form.payment === key ? 'text-brand flex-shrink-0' : 'text-gray-400 flex-shrink-0'} />
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {!user && (
                <p className="text-xs text-gray-400 text-center">
                  Have an account? <Link to="/account" className="text-brand font-semibold hover:underline">Log in</Link> for faster checkout.
                  &nbsp;Or continue as guest — no account needed.
                </p>
              )}
            </div>

            {/* Right — order summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="font-display font-bold text-lg text-gray-900 mb-5">Order Summary</h2>

                <div className="space-y-4 mb-5">
                  {items.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {item.image
                          ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          : <div className={`w-full h-full bg-gradient-to-br ${item.gradient}`} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.size} × {item.qty}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 flex-shrink-0">{formatPrice(item.price * item.qty)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>
                      {delivery === 0 ? 'Free' : formatPrice(delivery)}
                    </span>
                  </div>
                  {delivery === 0 && (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <Check size={11} /> Free delivery on orders above PKR 5,000
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-gray-100 pt-3 mt-2">
                    <span>Total</span>
                    <span className="text-brand">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={placing}
                  className="w-full mt-6 btn-primary py-4 text-base font-bold rounded-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {placing ? 'Placing Order...' : `Place Order — ${formatPrice(grandTotal)}`}
                </button>

                <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                  By placing this order you agree to our return and delivery policy. We'll call to confirm within 2 hours.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
