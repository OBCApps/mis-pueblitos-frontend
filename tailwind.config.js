/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
  important: true,
  content: ["./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily:{
        Montserrat: ["Montserrat", "sans-serif"],
        Battambang: ["Battambang", "system-ui"]
      },
      colors: {
        primary: '#F33535',
        fondo: '#FEFBFB',
        secondary: '#33425B',
        terceary: '#29252C',
        
      },
      width: {
        '500':'50vw',
      },
      screens: {
        'xxxs': '251px',
        'xxs': '325px',
        'xs': '380px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
