/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ["Noto Sans", "sans-serif"],
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
};
