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
      keyframes: {
        hexPulse: {
          "0%, 100%": {
            transform: "translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1)",
          },
          "50%": {
            transform: "translate(var(--tw-translate-x), var(--tw-translate-y)) scale(0.1)",
          },
        },
        hexFade: {
          "0%, 100%": {
            backgroundColor: "rgb(var(--color-bg-muted))",
          },
          "50%": {
            backgroundColor: "rgb(var(--color-bg-main))",
          },
        },
      },
      animation: {
        "hex-pulse": "hexPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "hex-fade": "hexFade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
