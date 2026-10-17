/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#173F35",
        beige: "#F0EDE4",
        softBlue: "#E3F0FF"
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0, 0, 0, 0.04)"
      },
      borderRadius: {
        xl2: "1.5rem"
      },
      animation: {
        slideDown: "slideDown 0.3s ease-out"
      },
      keyframes: {
        slideDown: {
          "from": {
            "opacity": "0",
            "transform": "translateY(-10px)"
          },
          "to": {
            "opacity": "1",
            "transform": "translateY(0)"
          }
        }
      }
    }
  },
  plugins: []
};
