/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0C4F3C',
          50: '#f0faf5',
          100: '#d9f2e6',
          200: '#b4e5ce',
          300: '#7fcfad',
          400: '#46b285',
          500: '#259669',
          600: '#187856',
          700: '#136146',
          800: '#124e3a',
          900: '#0C4F3C',
          950: '#062d22',
        },
        gold: {
          DEFAULT: '#C8973A',
          50: '#fdf8ee',
          100: '#f9eecb',
          200: '#f2d994',
          300: '#e9bc58',
          400: '#e2a430',
          500: '#C8973A',
          600: '#b07825',
          700: '#925e21',
          800: '#784c21',
          900: '#643f1f',
        },
        cream: '#FDF8EE',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
