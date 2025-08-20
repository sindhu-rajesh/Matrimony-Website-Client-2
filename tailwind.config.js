/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust as per your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C2185B", // rose-700 equivalent
        secondary: "#8E44AD", // purple-700 equivalent
        // optionally add some neutrals:
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
