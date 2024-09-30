/*
 * Formatted file
 */

import { useEffect, useState } from 'react';
import { MdNightlightRound, MdOutlineWbSunny } from 'react-icons/md';

const DarkModeButton = () => {
  // Odczytujemy stan trybu ciemnego z localStorage podczas inicjalizacji komponentu
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    const setDarkModeClass = (isDarkMode) => {
      const htmlElement = document.querySelector('html');
      if (isDarkMode) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    };
    setDarkModeClass(darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <button
      id="theme-toggle"
      type="button"
      className="text-gray-600 dark:text-gray-400 hover:bg-gray-500 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-500 dark:focus:ring-gray-600 rounded-lg text-sm p-2.5"
      onClick={toggleDarkMode}
    >
      <MdNightlightRound className={darkMode ? 'hidden w-5 h-5' : 'w-5 h-5'} />
      <MdOutlineWbSunny className={!darkMode ? 'hidden w-5 h-5' : 'w-5 h-5'} />
    </button>
  );
};

export default DarkModeButton;
