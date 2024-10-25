import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const RootPageLobbies = ({ to, title, subtitle, isCreateLobby }) => {
  return (
    <NavLink
      to={to}
      className={clsx(
        "cursor-pointer bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg transform transition duration-200 hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-4",
        "focus:ring-emerald-300 dark:focus:ring-emerald-700 flex-grow min-w-[250px] max-w-[300px]",
        isCreateLobby
          ? "py-6 max-w-72 active:bg-emerald-100 dark:active:bg-emerald-900"
          : "active:bg-emerald-100 dark:active:bg-emerald-900"
      )}
    >
      <h2 className="text-3xl font-extrabold text-center text-emerald-600 dark:text-emerald-300 mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
      {isCreateLobby && (
        <h2 className="text-4xl font-extrabold text-center text-emerald-600 dark:text-emerald-300">
          +
        </h2>
      )}
    </NavLink>
  );
};

RootPageLobbies.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  isCreateLobby: PropTypes.bool,
};

export default RootPageLobbies;
