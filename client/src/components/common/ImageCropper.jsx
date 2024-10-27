import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { FiCheck, FiX } from 'react-icons/fi';
import createCroppedImage from '../../utils/imageUtils';

const ImageCropper = ({ tempImage, onSave, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = useCallback(async () => {
    const croppedImage = await createCroppedImage(tempImage, croppedAreaPixels);
    onSave(croppedImage);
  }, [croppedAreaPixels, tempImage, onSave]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-neutral-900 rounded-lg p-4 w-full max-w-4xl">
        <div className="w-full h-96 sm:h-[500px] relative">
          <Cropper
            image={tempImage}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="rect"
            showGrid={true}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 text-white p-2 rounded mr-2"
            onClick={handleSave}
          >
            <FiCheck />
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={onCancel}
          >
            <FiX />
          </button>
        </div>
      </div>
    </div>
  );
};

ImageCropper.propTypes = {
  tempImage: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ImageCropper;
