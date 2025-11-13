/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Quicksand"', "sans-serif"],
      },
      colors: {
        primary: "#1e293b", // slate-800
        accent: "#14b8a6",  // teal-500
      },
    },
  },
  plugins: [],
};
