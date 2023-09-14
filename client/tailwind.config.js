module.exports = {
  content: ["./src/**/*.{html,jsx,js,tsx,ts}", "./index.html"],
  theme: {
    extend: {},
    screens: {
      'sm': '428px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};
