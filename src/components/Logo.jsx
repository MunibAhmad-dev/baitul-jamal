export default function Logo({ className = '', textColor = 'text-brand-900' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon mark */}
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer hexagon */}
        <path
          d="M19 2L35 11V27L19 36L3 27V11L19 2Z"
          fill="#0C4F3C"
          stroke="#0C4F3C"
          strokeWidth="1"
        />
        {/* House / arch shape */}
        <path
          d="M19 8L28 14V22H22V18H16V22H10V14L19 8Z"
          fill="#C8973A"
        />
        {/* Door */}
        <rect x="16.5" y="18" width="5" height="4" rx="2.5" fill="#0C4F3C" />
        {/* Gold dot accent */}
        <circle cx="19" cy="11" r="1.5" fill="#FDF8EE" />
      </svg>

      {/* Wordmark */}
      <div className="leading-none">
        <div className={`font-display font-bold text-xl tracking-tight ${textColor}`}>
          Baitul <span className="text-gold">Jamal</span>
        </div>
        <div className="text-[11px] font-medium text-gold/80 mt-0.5 tracking-wide" dir="rtl" style={{ fontFamily: 'serif' }}>
          بيت الجمال
        </div>
        <div className="text-[8px] font-sans font-medium tracking-[0.2em] uppercase text-gray-400 mt-0.5">
          Home &amp; Living
        </div>
      </div>
    </div>
  )
}
