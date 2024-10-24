import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaSpinner } from 'react-icons/fa';

const Button = ({
  onClick,
  text,
  icon: Icon,
  styleClass = '',
  type = 'button',
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-4 py-2 rounded-lg flex items-center justify-center w-full h-full ' +
          styleClass,
        { 'opacity-50 cursor-not-allowed': isLoading }
      )}
      type={type}
      disabled={isLoading}
    >
      {isLoading ? <FaSpinner className="animate-spin" /> : Icon && <Icon />}
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  icon: PropTypes.elementType,
  styleClass: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Button;
