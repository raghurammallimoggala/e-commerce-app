/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom-3': "0px 4px 16px 0px #bfbfbf",
      },
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

