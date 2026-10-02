/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: '#8B1E1E', dark: '#6A1414', light: '#A82B2B' },
        saffron: '#F59E0B',
        gold: { DEFAULT: '#D4A017', soft: '#E9C766' },
        cream: { DEFAULT: '#FFF7E6', dark: '#F5E9CC' },
        charcoal: { DEFAULT: '#171717', soft: '#262626' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 20px 50px -20px rgba(139,30,30,0.35)',
      },
    },
  },
  plugins: [],
};
