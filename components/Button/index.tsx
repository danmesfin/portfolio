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
      className="flex justify-center items-center w-9 h-9 text-paper-muted dark:text-gray-400 hover:text-paper-text dark:hover:text-paper-white focus:outline-none focus-visible:ring-2 focus-visible:ring-paper-text/40 transition-colors duration-200"
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
