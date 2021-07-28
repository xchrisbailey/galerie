module.exports = {
  purge: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}'
  ],

  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
