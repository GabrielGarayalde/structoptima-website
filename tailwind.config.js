/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./apps/MCTS_floor.html"],
  theme: {
    extend: {},
  },

  plugins: [
    // require("tailwindcss"),
    // require("autoprefixer"),
    require("daisyui"),
  ],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "#172554",
          "primary-focus": "mediumblue",
          "secondary": "#f3f4f6",
        },
      },
    ],
  },
};
