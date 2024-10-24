import PropTypes from 'prop-types';
import clsx from 'clsx';

const ToggleButton = ({ label, onClick, isActive, children }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-6 py-2 font-bold rounded-lg text-white flex items-center space-x-2',
        isActive
          ? 'bg-emerald-700 hover:bg-emerald-800'
          : 'bg-emerald-500 hover:bg-emerald-600'
      )}
    >
      {children ? (
        <>
          {label && <span>{label}</span>}
          {children}
        </>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default ToggleButton;
