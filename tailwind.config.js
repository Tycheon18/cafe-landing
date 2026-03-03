/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coffee': {
          50: '#faf6f3',
          100: '#f5ede7',
          200: '#e8d5c4',
          300: '#dbbda1',
          400: '#c18d5b',
          500: '#a76f3e',
          600: '#8b5a32',
          700: '#6f4829',
          800: '#593a22',
          900: '#48301d',
        },
      },
    },
  },
  plugins: [],
}
