import { MdNightlightRound, MdOutlineWbSunny } from 'react-icons/md';
import useDarkMode from '../hooks/useDarkMode';

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      id="theme-toggle"
      type="button"
      className="text-gray-600 dark:text-neutral-100 hover:bg-emerald-400 dark:hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400 dark:focus:ring-emerald-700 rounded-lg text-sm p-2.5"
      onClick={toggleDarkMode}
    >
      <MdNightlightRound className={darkMode ? 'hidden w-5 h-5' : 'w-5 h-5'} />
      <MdOutlineWbSunny className={!darkMode ? 'hidden w-5 h-5' : 'w-5 h-5'} />
    </button>
  );
};

export default DarkModeButton;
