/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#171717',
        primary: '#6366f1',
        primaryHover: '#818cf8',
        accent: '#f43f5e',
      }
    },
  },
  plugins: [],
}
