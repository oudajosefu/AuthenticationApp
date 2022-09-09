/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ["Noto Sans", "sans-serif"],
      }
    },
  },
  darkMode: 'class',
  plugins: [],
};
