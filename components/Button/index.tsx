import React from 'react';
import { useTheme } from 'next-themes';
import { MdDarkMode } from 'react-icons/md';
import { RxSun } from 'react-icons/rx';

const ThemeChanger: React.FC = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  if (currentTheme === 'dark') {
    return <RxSun className="w-6 h-6" onClick={() => setTheme('light')} />;
  }
  return <MdDarkMode className="w-6 h-6" onClick={() => setTheme('dark')} />;
};

export default ThemeChanger;
