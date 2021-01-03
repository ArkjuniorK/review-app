module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '2xl': '1440px'
      },
      height: {
        'screen-4/5': '80vh'
      }
    },
    fontFamily: {
      lato: 'Lato, sans-serif',
      raleway: 'Raleway, sans-serif'
    },
    colors: {
      transparent: 'transparent',
      light: '#fff',
      dark: '#080808',
      blue: {
        0: '#D4F1F4',
        50: '#7EC8E3',
        100: '#0000FF',
        200: '#000C66',
        300: '#050A30'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
