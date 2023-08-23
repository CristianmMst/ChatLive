/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        chat: "25% 75%",
      },
      gridTemplateRows: {
        chat: "10% 78% 12%",
      },
    },
  },
  plugins: [],
};
