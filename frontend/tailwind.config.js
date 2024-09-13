/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#FCA5F1",
        secondary: "#B5FFFF",
        custompink: '#BE07A2',
        customblue:'#0D87F2',
        join:'#fde3fa',
      },
      container: {
        padding: {
          center: true,
          default: "1rem",
          sm: "2rem",
          md: "3rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      }
    },
  },
  plugins: [],
}

