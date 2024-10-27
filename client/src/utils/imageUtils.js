const createCroppedImage = async (imageSrc, crop) => {
  const image = await createImage(imageSrc);
  const croppedImage = await getCroppedImg(image, crop);
  return croppedImage;
};
export default createCroppedImage;

export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (err) => reject(err));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export const getCroppedImg = (image, crop) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    }, 'image/jpeg');
  });
};

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      const base64Data = result.split(',')[1];

      const isValidBase64 = /^[A-Za-z0-9+/=]+$/.test(
        base64Data.replace(/=+$/, '')
      );
      if (!isValidBase64) {
        reject(new Error('Dane obrazu zawierają nieprawidłowe znaki.'));
      } else {
        console.log('Base64 conversion successful.');
        resolve(base64Data);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
