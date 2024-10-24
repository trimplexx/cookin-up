import PropTypes from 'prop-types';
import clsx from 'clsx';

const FormButton = ({ label, onClick, type, isLoading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={clsx(
        'w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105',
        { 'opacity-50 cursor-not-allowed': isLoading }
      )}
    >
      {isLoading ? (
        <div className="flex justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        label
      )}
    </button>
  );
};

FormButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default FormButton;
