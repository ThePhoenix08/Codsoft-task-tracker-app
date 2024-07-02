/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        neomorphism: "9px 9px 16px #b8b9be, -9px -9px 16px #ffffff",
        "neomorphism-inset":
          "inset 9px 9px 16px #b8b9be, inset -9px -9px 16px #ffffff",
        "neomorphism-focus":
          "inset 6px 6px 12px #b8b9be, inset -6px -6px 12px #ffffff",
      },
      colors: {
        "neo-bg": "#f9f9f9",
      },
      borderRadius: {
        "3xl": "30px",
        full: "50%",
      },
    },
  },
  variants: {
    boxShadow: ["hover"],
  },
  plugins: [],
};

