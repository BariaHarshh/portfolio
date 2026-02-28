/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          900: '#050d1a',
          800: '#0a1628',
          700: '#0f1f38',
          600: '#142a4a',
        },
        'teal-accent': '#2dd4bf',
        'orange-accent': '#f97316',
      },
      fontFamily: {
        'jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
        'space': ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      backdropBlur: {
        'xl': '24px',
        '2xl': '40px',
      },
      boxShadow: {
        'glow-teal': '0 0 30px rgba(45, 212, 191, 0.3)',
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.3)',
        'glow-teal-lg': '0 0 60px rgba(45, 212, 191, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'orbit-spin': 'orbit-spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 20px rgba(45, 212, 191, 0.2)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(45, 212, 191, 0.5)' },
        },
        'orbit-spin': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}