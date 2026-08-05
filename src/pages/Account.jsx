import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Phone, Lock, Eye, EyeOff, Package, LogOut, ChevronRight, Edit2, Check, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useOrders, ORDER_STATUSES } from '@/context/OrderContext'
import { formatPrice } from '@/lib/utils'

function InputField({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  )
}

const inp = (err) =>
  `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
    err
      ? 'border-red-300 bg-red-50 focus:border-red-400'
      : 'border-gray-200 bg-gray-50 focus:border-brand focus:ring-2 focus:ring-brand/10'
  }`

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginForm({ onSwitch }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ phone: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError('') }

  const handle = (e) => {
    e.preventDefault()
    if (!form.phone || !form.password) { setError('Please fill all fields.'); return }
    setLoading(true)
    const result = login(form.phone.replace(/\s/g, ''), form.password)
    setLoading(false)
    if (result.success) navigate('/account/dashboard')
    else setError(result.error)
  }

  return (
    <form onSubmit={handle} className="space-y-4">
      <InputField label="Phone Number" error={''}>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="tel" placeholder="e.g. 0311-9952385" value={form.phone}
            onChange={e => set('phone', e.target.value)} className={`${inp(false)} pl-11`} />
        </div>
      </InputField>

      <InputField label="Password" error={''}>
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type={showPw ? 'text' : 'password'} placeholder="Your password" value={form.password}
            onChange={e => set('password', e.target.value)} className={`${inp(false)} pl-11 pr-11`} />
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </InputField>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 font-bold rounded-xl">
        {loading ? 'Logging in...' : 'Log In'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-brand font-semibold hover:underline">
          Sign Up
        </button>
      </p>

      <p className="text-center text-sm">
        <Link to="/checkout" className="text-gray-400 hover:text-gray-600 text-xs">
          Continue as guest →
        </Link>
      </p>
    </form>
  )
}

// ─── Signup ───────────────────────────────────────────────────────────────────
function SignupForm({ onSwitch }) {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: undefined, global: undefined })) }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    else if (!/^(03\d{9})$/.test(form.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter valid number e.g. 0311XXXXXXX'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'At least 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handle = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const result = signup(form.name.trim(), form.phone.replace(/[\s-]/g, ''), form.password)
    setLoading(false)
    if (result.success) navigate('/account/dashboard')
    else setErrors({ global: result.error })
  }

  return (
    <form onSubmit={handle} className="space-y-4">
      <InputField label="Full Name" error={errors.name}>
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Your full name" value={form.name}
            onChange={e => set('name', e.target.value)} className={`${inp(errors.name)} pl-11`} />
        </div>
      </InputField>

      <InputField label="Phone Number" error={errors.phone}>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="tel" placeholder="e.g. 0311-9952385" value={form.phone}
            onChange={e => set('phone', e.target.value)} className={`${inp(errors.phone)} pl-11`} />
        </div>
      </InputField>

      <InputField label="Password" error={errors.password}>
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type={showPw ? 'text' : 'password'} placeholder="Minimum 6 characters" value={form.password}
            onChange={e => set('password', e.target.value)} className={`${inp(errors.password)} pl-11 pr-11`} />
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </InputField>

      <InputField label="Confirm Password" error={errors.confirm}>
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="password" placeholder="Repeat password" value={form.confirm}
            onChange={e => set('confirm', e.target.value)} className={`${inp(errors.confirm)} pl-11`} />
        </div>
      </InputField>

      {errors.global && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <AlertCircle size={15} /> {errors.global}
        </div>
      )}

      <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 font-bold rounded-xl">
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-brand font-semibold hover:underline">
          Log In
        </button>
      </p>
    </form>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const { user, logout, updateProfile } = useAuth()
  const { getByUser } = useOrders()
  const navigate = useNavigate()
  const [tab, setTab] = useState('orders')
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [saved, setSaved] = useState(false)

  const myOrders = getByUser(user.id)

  const handleLogout = () => { logout(); navigate('/') }

  const saveProfile = () => {
    updateProfile({ name: name.trim() })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      {/* Profile header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {user.name[0].toUpperCase()}
          </div>
          <div>
            {editing ? (
              <div className="flex items-center gap-2">
                <input value={name} onChange={e => setName(e.target.value)}
                  className="border border-brand rounded-lg px-3 py-1 text-sm font-semibold outline-none focus:ring-2 focus:ring-brand/20" />
                <button onClick={saveProfile} className="w-7 h-7 bg-brand text-white rounded-full flex items-center justify-center">
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900">{user.name}</p>
                <button onClick={() => setEditing(true)} className="text-gray-400 hover:text-brand">
                  <Edit2 size={13} />
                </button>
                {saved && <span className="text-xs text-green-600 font-medium">Saved!</span>}
              </div>
            )}
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50">
          <LogOut size={15} /> Log out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
        {[
          { key: 'orders', label: `My Orders (${myOrders.length})` },
          { key: 'profile', label: 'Profile' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              tab === t.key ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Orders tab */}
      {tab === 'orders' && (
        myOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-4xl mb-3">📦</div>
            <p className="font-semibold text-gray-800">No orders yet</p>
            <p className="text-sm text-gray-500 mt-1">Your orders will appear here after checkout.</p>
            <Link to="/products" className="mt-5 inline-block btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myOrders.map(order => {
              const statusLabel = ORDER_STATUSES.find(s => s.key === order.status)
              const placed = new Date(order.placedAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
              return (
                <Link key={order.id} to={`/track-order?id=${order.id}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 block hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-mono font-bold text-brand text-base">{order.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{placed} · {order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700'
                        : order.status === 'dispatched' ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                      }`}>
                        {statusLabel?.label}
                      </span>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-brand transition-colors" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {item.image
                          ? <img src={item.image} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-gray-200" />
                        }
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <span className="text-xs text-gray-400">+{order.items.length - 3} more</span>
                    )}
                    <span className="ml-auto font-bold text-gray-900">{formatPrice(order.total)}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )
      )}

      {/* Profile tab */}
      {tab === 'profile' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-gray-900 mb-2">Account Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Name</span>
              <span className="text-sm font-semibold text-gray-900">{user.name}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Phone</span>
              <span className="text-sm font-semibold text-gray-900">{user.phone}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-sm text-gray-500">Member since</span>
              <span className="text-sm font-semibold text-gray-900">
                {new Date(user.createdAt).toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
          <div className="pt-2">
            <Link to="/track-order" className="flex items-center gap-2 text-brand font-semibold text-sm hover:underline">
              <Package size={15} /> Track an order by ID
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Account() {
  const { user } = useAuth()
  const [mode, setMode] = useState('login')

  if (user) return <Dashboard />

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User size={28} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl text-gray-900">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {mode === 'login'
              ? 'Log in to view your orders and track deliveries'
              : 'Sign up to save orders and track deliveries easily'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
          {[['login', 'Log In'], ['signup', 'Sign Up']].map(([key, label]) => (
            <button key={key} onClick={() => setMode(key)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                mode === key ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {mode === 'login'
            ? <LoginForm onSwitch={() => setMode('signup')} />
            : <SignupForm onSwitch={() => setMode('login')} />
          }
        </div>
      </div>
    </main>
  )
}
