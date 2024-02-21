/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./apps/MCTS_floor.html"],
  theme: {
    extend: {
    },
  },

  plugins: [
    require("daisyui"),
  ],

  daisyui: {
    themes: [
      {
        light: {
          "primary": "#f43f5e",

        },
      },
    ],
  },
};
