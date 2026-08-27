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
          plum: '#601D49',
          'plum-dark': '#421131',
          'plum-light': '#7a285e',
          rose: '#EA9D9D',
          'rose-light': '#F7D4D4',
          cream: '#FDF4D2',
          'cream-light': '#FFFBF0',
          sage: '#8BBB92',
          'sage-dark': '#6B9D73',
          dark: '#2A0B20',
          surface: '#FAF7F2'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(96, 29, 73, 0.15)',
        'luxury-hover': '0 25px 50px -12px rgba(96, 29, 73, 0.25)',
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-subtle': 'pulseSubtle 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
