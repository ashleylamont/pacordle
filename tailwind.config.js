module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['Bitter', 'serif'],
      },
      colors: {
        'present': '#c4b75c',
        'correct': '#69AB66',
        'absent': '#787C7E',
        'tile-edge': '#d3d6da',
      }
    },
  },
  plugins: [],
}
