import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatPriceShort(price) {
  if (price >= 1000) {
    return `PKR ${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`
  }
  return `PKR ${price}`
}
