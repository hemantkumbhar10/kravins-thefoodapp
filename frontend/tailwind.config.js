/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        "object-fit": "contain, cover, fill",
      },
      colors: {
        tomato: "#FF4B3A",
      },
    },
    container: {
      padding: {
        lg: "10rem",
      },
    },
  },
  plugins: [],
};
