/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'sans-serif'],
        geist: ['var(--font-geist)', 'sans-serif'], 
      },
      blur: {
        xxl: '80px',
      },
      zIndex: {
        '-1': '-1',
        '100': '100',
      },
    },
  },
  plugins: [],
};
