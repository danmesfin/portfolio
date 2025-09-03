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
        paper: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)',
        'paper-hover': '0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
        'paper-layered': '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      colors: {
        primary: '#fdba74',
        secondary: '#059669',
        orangish: '#bc3908',
        redish: '#BD1600',
        base: '#f4f4f0',
        sky: '#941b0c',
        // Paper design colors
        paper: {
          white: '#fefefe',
          cream: '#faf9f7',
          light: '#f8f6f3',
          shadow: 'rgba(0, 0, 0, 0.08)',
          border: 'rgba(0, 0, 0, 0.06)',
          text: '#2d3748',
          muted: '#718096',
        },
        accent: {
          yellow: '#ffd93d',
          coral: '#ff6b6b',
          teal: '#4fd1c7',
          purple: '#9f7aea',
        },
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
