import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = JSON.parse(window.localStorage.getItem('darkMode'));

    if (savedMode !== null) {
      return savedMode;
    } else {
      return (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
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
    window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
