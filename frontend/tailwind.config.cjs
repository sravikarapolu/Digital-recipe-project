// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'system-ui', 'Segoe UI', 'Roboto', 'Arial'],
      },
      colors: {
        cream: {
          50:  "#fdfcf9",
          100: "#faf7f2",
          200: "#f5efe7",
          300: "#efe5d8",
        },
        caramel: {
          50:  "#fbefe1",
          100: "#f7dfc5",
          200: "#e6b88a",
          300: "#d3a36a",
          400: "#c28c52",
          500: "#b27c45", // main CTA
          600: "#9f6935",
        },
        brown: {
          100: "#B8ADA3",
          200: "#8C7A6B",
          300: "#5C4636",
          400: "#3D2F25",
          500: "#2A221C",
        },
        neutral: {
          50: "#FBF9F7",
          100: "#F1ECE7",
          200: "#E8E0DA",
          300: "#D7CFC7",
        }
      },
      boxShadow: {
        'card': '0 8px 28px rgba(38, 30, 24, 0.06)',
        'hover': '0 18px 50px rgba(38, 30, 24, 0.12)',
      },
      borderRadius: {
        'xl2': '1rem',
        '2xl': '1rem',
      },
      lineClamp: {},
    },
  },
  plugins: [],
};
