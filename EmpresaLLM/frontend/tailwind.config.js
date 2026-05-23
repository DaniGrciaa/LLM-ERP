/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#ededed",
        card: "#18181b",
        border: "#27272a",
        primary: "#fafafa",
        primaryHover: "#27272a",
        secondary: "#27272a",
        accent: "#3b82f6"
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(500px)' },
          '100%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
