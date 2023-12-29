/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      neon: '',
    },

    extend: {
      fontFamily: {
        display: ['peachy-keen-jf', 'sans-serif!important'],
        hand: ['Nanum Pen Script', 'sans!important'],
      },
      boxShadow: {
        allSide: '0 0 10px 5px',
      },
      colors: {
        primary: '#fdba74',
        secondary: '#059669',
        orangish: '#7c2d12',
        darkOrange: '#7c2d12',
        redish: '#BD1600',
        base: '#7c2d12',
        sky: '#941b0c',
        lightOrange: '#fed7aa',
      },
    },
  },
  plugins: [],
};
