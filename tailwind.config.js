/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#0B2416",
          900: "#0E2B1B",
          800: "#163D24",
          700: "#1E4E2F",
        },
        pasture: {
          600: "#2F7A3D",
          500: "#398F49",
        },
        signal: {
          400: "#7ED957",
          300: "#A6E884",
        },
        paper: {
          0: "#FFFFFF",
          50: "#F6F8F3",
          100: "#EEF2E8",
        },
        ink: {
          900: "#10221A",
          600: "#3A4F42",
          400: "#6C8377",
        },
        amber: {
          500: "#E8871E",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "fence-grid":
          "linear-gradient(rgba(16,34,26,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,34,26,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
