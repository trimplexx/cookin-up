import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    const setDarkModeClass = (isDarkMode) => {
      const htmlElement = document.querySelector('html');
      const themeColorMetaTag = document.querySelector(
        'meta[name="theme-color"]'
      );

      if (isDarkMode) {
        htmlElement.classList.add('dark');
        if (themeColorMetaTag) {
          themeColorMetaTag.setAttribute('content', '#064e3b');
        }
      } else {
        htmlElement.classList.remove('dark');
        if (themeColorMetaTag) {
          themeColorMetaTag.setAttribute('content', '#86efac');
        }
      }
    };

    setDarkModeClass(darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
