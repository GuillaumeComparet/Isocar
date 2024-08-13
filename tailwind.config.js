/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        hover: "var(--hover)",
        btn: {
          background: "var(--btn-background)",
          "background-hover": "var(--btn-background-hover)",
        },
        "text-content-background": "var(--text-content-background)",
        cancel: "var(--cancel)",
        "cancel-hover": "var(--cancel-hover)",
        "background-opacity": "var(--background-opacity)",
        "highlight": "var(--highlight)",
      },
    },
  },
  plugins: [],
};
