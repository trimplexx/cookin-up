import PropTypes from "prop-types";
import { useState } from "react";

const InputField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  isPassword,
  autoComplete,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="relative mb-4">
      <label
        className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && !visible ? "password" : type}
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-300"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete || (isPassword ? "new-password" : "off")}
        />
        {isPassword && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors"
          >
            {visible ? "Ukryj" : "Pokaż"}
          </button>
        )}
      </div>
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isPassword: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default InputField;
