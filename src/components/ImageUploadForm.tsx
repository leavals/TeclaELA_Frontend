import React, { useState, ChangeEvent } from 'react';

interface ImageUploadFormProps {
  onClose: () => void;
  onSave: (image: File, imageName: string) => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onClose, onSave }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState('');

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageName(event.target.value);
  };

  const handleSave = () => {
    if (!selectedImage || !imageName) {
      alert("Por favor selecciona una imagen y dale un nombre.");
      return;
    }
    onSave(selectedImage, imageName);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={imageName}
          onChange={handleNameChange}
          placeholder="Nombre de la imagen"
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        {previewImage ? (
          <div>
            <img src={previewImage} alt="Preview" className="max-h-64" />
            <p className="mt-2">Imagen seleccionada</p>
          </div>
        ) : (
          <p>No hay imagen seleccionada</p>
        )}
      </div>
      <div className="flex space-x-4">
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar
        </button>
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ImageUploadForm;
