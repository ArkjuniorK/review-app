module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: "'Open Sans', sans-serif",
      lato: 'Lato, sans-serif',
      raleway: 'Raleway, sans-serif'
    },
    colors: {
      transparent: 'transparent',
      light: '#fff',
      red: {
        50: '#FFF8F2',
        100: '#FF8282',
        200: '#6F2323'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
