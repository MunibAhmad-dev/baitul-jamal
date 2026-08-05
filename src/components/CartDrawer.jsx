import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { Link, useNavigate } from 'react-router-dom'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, totalPrice, totalItems } = useCart()
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-display font-bold text-xl text-gray-900">Your Cart</h2>
            <p className="text-sm text-gray-500">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag size={32} className="text-gray-400" />
              </div>
              <div>
                <p className="font-display font-semibold text-lg text-gray-800">Your cart is empty</p>
                <p className="text-sm text-gray-500 mt-1">Add some beautiful pieces to your home</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 p-3 rounded-xl bg-gray-50">
                  {/* Product color swatch */}
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${item.gradient} flex-shrink-0 flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold text-center px-1 leading-tight">{item.name.split(' ').slice(0,2).join(' ')}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{item.name}</p>
                    {item.size && <p className="text-xs text-gray-500 mt-0.5">Size: {item.size}</p>}
                    <p className="text-brand font-bold text-sm mt-1">{formatPrice(item.price)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                          className="p-1.5 hover:bg-gray-50 rounded-l-lg transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-sm font-semibold min-w-[24px] text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                          className="p-1.5 hover:bg-gray-50 rounded-r-lg transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 bg-white space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="font-display font-bold text-xl text-gray-900">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-gray-400 text-center">Delivery charges calculated at checkout</p>
            <button
              className="w-full btn-primary py-4 text-base rounded-xl"
              onClick={() => { setIsOpen(false); navigate('/checkout') }}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full btn-outline py-3 text-sm rounded-xl"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
