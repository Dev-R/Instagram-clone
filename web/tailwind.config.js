/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          1000 : '#121212',
          1100 : '#262626'
        },
        gray: {
          1100 : '#636363'
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
