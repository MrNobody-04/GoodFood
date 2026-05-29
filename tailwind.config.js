/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f6',
          100: '#fbf0eb',
          200: '#f6ddd3',
          300: '#eebfae',
          400: '#e0987f',
          500: '#d07052',
          600: '#c15537',
          700: '#a1442c',
          800: '#823725',
          900: '#6a3022',
          DEFAULT: '#c15537', // Terracotta/Warm orange
        },
        accent: {
          50: '#fefcf3',
          100: '#fdf9e7',
          200: '#faf0c3',
          300: '#f5e394',
          400: '#edd15c',
          500: '#e1b72a',
          600: '#c5971f',
          700: '#a1761c',
          800: '#805d1b',
          950: '#e1b72a',
          DEFAULT: '#e1b72a', // Amber/Honey yellow
        },
        darkBg: {
          light: '#2d2421',
          DEFAULT: '#1c1513',
          dark: '#120d0c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 30px rgba(0, 0, 0, 0.03)',
        'premium-hover': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'dark-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
