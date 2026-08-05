import { createContext, useContext, useState, useEffect } from 'react'

const OrderContext = createContext(null)

function generateOrderId() {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const r = Math.floor(Math.random() * 9000) + 1000
  return `BJ-${d}-${r}`
}

export const ORDER_STATUSES = [
  { key: 'placed',      label: 'Order Placed',   labelUr: 'آرڈر موصول' },
  { key: 'confirmed',   label: 'Confirmed',       labelUr: 'تصدیق شدہ' },
  { key: 'processing',  label: 'Processing',      labelUr: 'تیاری' },
  { key: 'dispatched',  label: 'Dispatched',      labelUr: 'روانہ' },
  { key: 'delivered',   label: 'Delivered',       labelUr: 'پہنچ گیا' },
]

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('bj_orders')
    if (stored) setOrders(JSON.parse(stored))
  }, [])

  const save = (list) => {
    setOrders(list)
    localStorage.setItem('bj_orders', JSON.stringify(list))
  }

  const placeOrder = (data) => {
    const order = {
      ...data,
      id: generateOrderId(),
      placedAt: new Date().toISOString(),
      status: 'placed',
      statusHistory: [{ status: 'placed', at: new Date().toISOString() }],
    }
    save([order, ...orders])
    return order
  }

  const getById = (id) => orders.find(o => o.id === id)

  const getByPhone = (phone) =>
    orders.filter(o => o.customer.phone.replace(/\s/g, '') === phone.replace(/\s/g, ''))

  const getByUser = (userId) => orders.filter(o => o.userId === userId)

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getById, getByPhone, getByUser }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => useContext(OrderContext)
