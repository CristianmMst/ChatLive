/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        chat: "25% 75%",
      },
      gridTemplateRows: {
        chat: "8% 78% 14%",
        contacts: "8% 92%",
      },
    },
  },
  plugins: [],
};
