import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiTrash2, FiImage } from 'react-icons/fi';
import ImageCropper from '../common/ImageCropper';

const DishCardEdit = ({ dish, editMode, onChange }) => {
  const [isCropping, setIsCropping] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const handleNameChange = (e) => {
    onChange({ name: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onChange({ image: null });
    setTempImage(null);
  };

  const saveCroppedImage = (croppedImage) => {
    onChange({ image: croppedImage });
    setIsCropping(false);
    setTempImage(null);
  };

  const cancelCropping = () => {
    setIsCropping(false);
    setTempImage(null);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg mb-4 flex flex-col">
      <div className="flex-shrink-0 mb-4 sm:mb-0 relative">
        {editMode && (
          <label className="block w-full sm:w-[600px] h-60 sm:h-80 border border-gray-300 rounded-lg overflow-hidden cursor-pointer">
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
            />
            {dish.image ? (
              <img
                src={
                  typeof dish.image === 'string'
                    ? dish.image
                    : URL.createObjectURL(dish.image)
                }
                alt={dish.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Wybierz zdjęcie
              </div>
            )}
          </label>
        )}
        {!editMode &&
          (dish.image ? (
            <img
              src={
                typeof dish.image === 'string'
                  ? dish.image
                  : URL.createObjectURL(dish.image)
              }
              alt={dish.name}
              className="w-full h-full object-cover max-w-[600px]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-neutral-700 text-gray-400">
              <FiImage size={200} className="opacity-60" />
            </div>
          ))}
        {dish.image && editMode && (
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <FiTrash2 />
          </button>
        )}
      </div>

      <div className="ml-0 sm:ml-4 flex flex-col justify-center">
        <h4 className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
          {dish.mealCategoryName}
        </h4>
        {editMode ? (
          <input
            type="text"
            defaultValue={dish.name}
            onChange={handleNameChange}
            className="w-full text-gray-700 dark:text-gray-300 dark:bg-neutral-700 border-b p-2 mb-2"
            placeholder="Nazwa dania"
          />
        ) : (
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {dish.name}
          </p>
        )}
      </div>

      {isCropping && tempImage && (
        <ImageCropper
          tempImage={tempImage}
          onSave={saveCroppedImage}
          onCancel={cancelCropping}
        />
      )}
    </div>
  );
};

DishCardEdit.propTypes = {
  dish: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DishCardEdit;
