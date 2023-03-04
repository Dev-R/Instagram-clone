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
          1000 : '#121212'
        },
        slate: {
          1100 : '#262626'
        },
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
