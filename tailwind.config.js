module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#683c1f", // Custom primary color
        secondary: "#656364", // Custom secondary color
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
