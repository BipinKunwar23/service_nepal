/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'xs':{'min':'400px','max':'640px'},
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'providers': "url('/src/images/providers2.png')",
      }
    },
    
  },
  plugins: [],
}

