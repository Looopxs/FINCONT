/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F9FC",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF",
          hover: "#1D4ED8",
          subtle: "#EFF6FF",
        },
        secondary: {
          DEFAULT: "#3B82F6",
          soft: "#DBEAFE",
        },
        turquoise: {
          DEFAULT: "#14B8A6",
          subtle: "#CCFBF1",
        },
        success: {
          DEFAULT: "#10B981",
          subtle: "#D1FAE5",
        },
        danger: {
          DEFAULT: "#EF4444",
          subtle: "#FEE2E2",
        },
        warning: {
          DEFAULT: "#F59E0B",
          subtle: "#FEF3C7",
        },
        indigo: {
          DEFAULT: "#6366F1",
          subtle: "#E0E7FF",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(15, 23, 42, 0.05)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
        floating: "0 12px 30px -4px rgba(37, 99, 235, 0.12)",
        glow: "0 0 25px rgba(37, 99, 235, 0.15)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-delayed": "float 5s ease-in-out 1.5s infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
