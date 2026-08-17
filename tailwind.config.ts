import type { Config } from "tailwindcss";

// Premium, restrained visual system — see docs/decisions.md for rationale.
// Monochrome foundation + a single accent, distinctive type pairing,
// deliberately NOT the default Tailwind/shadcn purple-gradient look.
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        border: "var(--border)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "brand-orange": "var(--brand-orange)",
        danger: "var(--danger)",
        success: "var(--success)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
