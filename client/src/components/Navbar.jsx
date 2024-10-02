import DarkModeButton from '../components/DarkModeButton';

const Navbar = () => {
  return (
    <div className="w-full justify-between flex px-1 py-6 sm:p-8 bg-emerald-300 dark:bg-emerald-900 items-center border-b-2 border-neutral-200 dark:border-neutral-500">
      <DarkModeButton />
    </div>
  );
};

export default Navbar;
