/*
 * Formatted file
 */

import DarkModeButton from '../components/DarkModeButton';

const Navbar = () => {
  return (
    <div className="w-full justify-between flex px-1 py-6 sm:p-8 bg-slate-300 dark:bg-zinc-700 items-center">
      <DarkModeButton />
    </div>
  );
};

export default Navbar;
