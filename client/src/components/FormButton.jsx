import PropTypes from 'prop-types';

const FormButton = ({ label, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
    >
      {label}
    </button>
  );
};

FormButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default FormButton;
