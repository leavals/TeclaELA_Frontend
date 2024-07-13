import React, { useState, useEffect } from 'react';
import UserIcons from '../UserIcons';
import Modal from 'react-modal';
import ImageUploadForm from '../ImageUploadForm';

Modal.setAppElement('#root'); // Asegúrate de que el ID coincida con el ID del elemento raíz de tu aplicación

const ActionButtons: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string>('Ninguna imagen seleccionada');
  const [editMode, setEditMode] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [images, setImages] = useState<(string | null)[]>(() => {
    const savedImages = localStorage.getItem('images');
    return savedImages ? JSON.parse(savedImages) : Array(10).fill(null);
  });
  const [imageNames, setImageNames] = useState<string[]>(() => {
    const savedImageNames = localStorage.getItem('imageNames');
    return savedImageNames ? JSON.parse(savedImageNames) : Array(10).fill('');
  });

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
    localStorage.setItem('imageNames', JSON.stringify(imageNames));
  }, [images, imageNames]);

  const handleImageClick = (index: number) => {
    setSelectedImage(images[index]);
    setSelectedImageName(imageNames[index] || 'Imagen ' + (index + 1));
  };

  const openModal = (buttonIndex: number) => {
    setSelectedButton(buttonIndex);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedButton(null);
  };

  const handleSaveImage = (image: File, imageName: string) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (selectedButton !== null) {
        const newImages = [...images];
        const newImageNames = [...imageNames];
        newImages[selectedButton] = reader.result as string;
        newImageNames[selectedButton] = imageName;
        setImages(newImages);
        setImageNames(newImageNames);
        closeModal();
      }
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <UserIcons />
      <div className="w-full max-w-4xl p-6 bg-white rounded shadow-md text-center mb-8">
        <div className="h-64 flex items-center justify-center bg-gray-200 rounded">
          {selectedImage ? (
            <img src={selectedImage} alt="Imagen seleccionada" className="max-h-full max-w-full object-contain" />
          ) : (
            <span>Imagen seleccionada</span>
          )}
        </div>
        <p className="mt-4 text-2xl">{selectedImageName}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => handleImageClick(index)}
              className="bg-blue-500 text-white p-4 rounded flex flex-col items-center justify-center w-full h-24"
            >
              {image ? (
                <img src={image} alt={imageNames[index]} className="h-full w-full object-contain" />
              ) : (
                <span>Imagen {index + 1}</span>
              )}
            </button>
            {editMode && (
              <button
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                onClick={() => openModal(index)}
              >
                Editar
              </button>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => setEditMode(!editMode)} className="mt-4 bg-green-500 text-white p-2 rounded">
        {editMode ? 'Terminar edición' : 'Editar botones'}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Imagen"
        className="modal large-modal"
        overlayClassName="overlay"
      >
        <ImageUploadForm onClose={closeModal} onSave={handleSaveImage} />
      </Modal>
    </div>
  );
};

export default ActionButtons;
