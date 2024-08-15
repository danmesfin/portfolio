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
        orangish: '#bc3908',
        redish: '#BD1600',
        base: '#bc3908',
        sky: '#941b0c',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
