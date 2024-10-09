import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <h1 className="text-5xl font-extrabold text-emerald-600 dark:text-emerald-300 mb-4">
        404
      </h1>
      <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-300 mb-2">
        Strona nie znaleziona
      </h2>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-6">
        Przykro nam, ale nie możemy znaleźć żądanej strony.
      </p>
      <NavLink
        to="/"
        className="cursor-pointer bg-white dark:bg-neutral-700 dark:border-2 dark:border-emerald-300 py-3 px-6 rounded-lg shadow-lg transition duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 active:bg-emerald-100 dark:active:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-700"
      >
        <span className="text-xl font-semibold text-emerald-600 dark:text-emerald-300">
          Wróć do strony głównej
        </span>
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
