// eslint-disable-next-line import/no-extraneous-dependencies -- build-time config
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Class strings also live here (e.g. utils/proseClasses.ts) — without this
    // those classes are purged from the build.
    './utils/**/*.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // --font-sans (IBM Plex Mono) and --font-display (Fraunces) are
        // provided by next/font in _app.tsx.
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.mono],
        mono: ['var(--font-sans)', ...defaultTheme.fontFamily.mono],
        display: ['var(--font-display)', ...defaultTheme.fontFamily.serif],
        // `hand` is retired; kept mapped to the mono so any stray usage during
        // the redesign degrades cleanly rather than breaking.
        hand: ['var(--font-sans)', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        allSide: '0 0 10px 5px',
        paper: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)',
        'paper-hover':
          '0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
        'paper-layered':
          '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      colors: {
        base: '#efece3',
        // Warm editorial neutrals — near-black ink on warm paper, no blue cast.
        paper: {
          white: '#f6f3ec',
          cream: '#eceae1',
          light: '#e6e3d9',
          shadow: 'rgba(28, 25, 20, 0.08)',
          border: 'rgba(28, 25, 20, 0.16)',
          text: '#1c1a15',
          muted: '#6f6a5f',
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
