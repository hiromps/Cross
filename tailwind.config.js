/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f0f0f0",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      textColor: {
        foreground: "hsl(var(--foreground))",
      },
      backgroundColor: {
        background: "hsl(var(--background))",
      },
    },
  },
  plugins: [],
}

