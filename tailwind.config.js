/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        monoton: ["'Monoton'", "cursive"],
        sarina: ["'Sarina'", "cursive"],
        gothic: ["'Special Gothic Expanded One'", "sans-serif"],
      },
    },
  },
  plugins: [
     require('tailwind-scrollbar-hide'),
  ],
};
