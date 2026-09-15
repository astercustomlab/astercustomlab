/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#15120F",
        panel: "#1E1A15",
        panel2: "#272119",
        crimson: "#9C1B2E",
        crimsondark: "#6E1220",
        bone: "#EFE9DC",
        steel: "#8A8175",
        brass: "#C9A227",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "diagonal-split":
          "linear-gradient(115deg, transparent 0%, transparent 58%, #9C1B2E 58%, #9C1B2E 100%)",
      },
    },
  },
  plugins: [],
};
