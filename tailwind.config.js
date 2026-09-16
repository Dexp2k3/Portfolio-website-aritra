/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '4.5': '1.125rem',
      },
      colors: {
        charcoal: {
          900: '#0c0f17',
          950: '#080b11',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'monospace',
        ],
        handwriting: [
          'Caveat',
          'cursive',
        ],
      },
    },
  },
  plugins: [],
}
