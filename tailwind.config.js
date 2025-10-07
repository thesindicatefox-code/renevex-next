/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#161a1f",
        accent: "#9b111e" /* бордовый-премиум */
      }
    }
  },
  plugins: []
};
