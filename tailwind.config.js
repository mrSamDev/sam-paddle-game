/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      textColor: {
        main: "rgb(var(--color-text-main) / <alpha-value>)",
      },
      backgroundColor: {
        main: "rgb(var(--color-bg-main) / <alpha-value>)",
        muted: "rgb(var(--color-bg-muted) / <alpha-value>)",
      },
      borderColor: {
        main: "rgb(var(--color-border-main) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
