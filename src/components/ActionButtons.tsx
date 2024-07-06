import React, { useState } from 'react';
import UserIcons from './UserIcons';

const ActionButtons: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('Imagen seleccionada');

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <UserIcons />
      <div className="w-full max-w-4xl p-6 bg-white rounded shadow-md text-center mb-8">
        <div className="h-64 flex items-center justify-center bg-gray-200 rounded">
          <img src={`path/to/${selectedImage}.jpg`} alt={selectedImage} className="max-h-full max-w-full object-contain" />
        </div>
        <p className="mt-4 text-2xl">{selectedImage}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        {['Imagen 1', 'Imagen 2', 'Imagen 3', 'Imagen 4', 'Imagen 5', 'Imagen 6', 'Imagen 7', 'Imagen 8', 'Imagen 9', 'Imagen 10'].map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(image)}
            className="bg-blue-500 text-white p-4 rounded flex flex-col items-center justify-center"
          >
            <img src={`path/to/${image}.jpg`} alt={image} className="h-24 w-24 object-contain mb-2" />
            <span>{image}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
