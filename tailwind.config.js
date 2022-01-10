module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{//300,600,800
      sans: ['Nunito Sans', 'sans-serif']
    },
    extend: {
      colors: {
        'VeryDarkBlue2': '#111517',
      }
    },
  },
  plugins: [],
}
