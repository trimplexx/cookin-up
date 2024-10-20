import PropTypes from "prop-types";
import clsx from "clsx";

const ToggleButton = ({ label, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-6 py-2 font-bold rounded-lg text-white",
        isActive
          ? "bg-emerald-700 hover:bg-emerald-800"
          : "bg-emerald-500 hover:bg-emerald-600"
      )}
    >
      {label}
    </button>
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default ToggleButton;
