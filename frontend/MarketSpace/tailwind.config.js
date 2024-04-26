/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        'dark': '#22181c',
        'red': '#f44336',
        'green': '#81B29A',
        'warm': '#F4F1DE',
      },
    },
  },
  plugins: [],
};
