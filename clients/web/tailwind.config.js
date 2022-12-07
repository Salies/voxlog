// Configure tailwind.css in the project root to override these defaults
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  // darkMode: "media", // media or class
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          "@screen sm": {
            maxWidth: "100%",
          },
          "@screen md": {
            maxWidth: "768px",
          },
          "@screen lg": {
            maxWidth: "768px",
          },
          "@screen xl": {
            maxWidth: "1024px",
          },
        },
      });
    },
  ],
};
