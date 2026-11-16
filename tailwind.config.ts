import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0187ca",
          hover: "#0073ad",
          light: "#e0f2fe",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          500: "#0187ca",
          600: "#0073ad",
          700: "#0369a1",
        },
        ice: {
          blue: "#0187ca",
          blueHover: "#0073ad",
          lightBlue: "#e0f2fe",
          red: "#e11927",
          dark: "#0f172a",
          slate: "#334155",
          muted: "#64748b",
          border: "#e2e8f0",
          bg: "#f8fafc",
        },
      },
      fontFamily: {
        khmer: ["'Kantumruy Pro'", "'Battambang'", "sans-serif"],
        body: ["'Battambang'", "Inter", "sans-serif"],
        sans: ["Inter", "'Kantumruy Pro'", "sans-serif"],
      },
      boxShadow: {
        'ice': '0 4px 20px -2px rgba(1, 135, 202, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'ice-hover': '0 10px 25px -3px rgba(1, 135, 202, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow-primary': '0 0 20px -3px rgba(1, 135, 202, 0.35)',
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.4)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.35)',
      },
      keyframes: {
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        modalBackdrop: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.75', filter: 'brightness(1.2)' },
        },
        scanline: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' },
        },
      },
      animation: {
        'modal-in': 'modalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'modal-backdrop': 'modalBackdrop 0.2s ease-out forwards',
        'slide-down': 'slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pop': 'pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'float': 'float 3.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.2s infinite',
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
