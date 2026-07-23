import React from 'react';
import { useTheme } from 'next-themes';
import { MdDarkMode } from 'react-icons/md';
import { RxSun } from 'react-icons/rx';

const ThemeChanger: React.FC = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex justify-center items-center w-9 h-9 text-paper-text dark:text-gray-300 hover:text-accent-coral dark:hover:text-accent-coral hover:bg-paper-light dark:hover:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-coral/40 transition-all duration-200"
    >
      {isDark ? (
        <RxSun className="w-5 h-5" aria-hidden="true" />
      ) : (
        <MdDarkMode className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeChanger;
