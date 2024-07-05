import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Configuration: React.FC = () => {
  const [textSize, setTextSize] = useState(localStorage.getItem('textSize') || 'text-lg');
  const [buttonSize, setButtonSize] = useState(localStorage.getItem('buttonSize') || 'w-32 h-16');
  const [buttonColor, setButtonColor] = useState(localStorage.getItem('buttonColor') || 'bg-blue-500');

  const [previousTextSize, setPreviousTextSize] = useState(textSize);
  const [previousButtonSize, setPreviousButtonSize] = useState(buttonSize);
  const [previousButtonColor, setPreviousButtonColor] = useState(buttonColor);

  const navigate = useNavigate();

  useEffect(() => {
    const savedTextSize = localStorage.getItem('textSize');
    const savedButtonSize = localStorage.getItem('buttonSize');
    const savedButtonColor = localStorage.getItem('buttonColor');

    if (savedTextSize) setTextSize(savedTextSize);
    if (savedButtonSize) setButtonSize(savedButtonSize);
    if (savedButtonColor) setButtonColor(savedButtonColor);
  }, []);

  const handleTextSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextSize(e.target.value);
  };

  const handleButtonSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setButtonSize(e.target.value);
  };

  const handleButtonColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setButtonColor(e.target.value);
  };

  const handleUndo = () => {
    setTextSize(previousTextSize);
    setButtonSize(previousButtonSize);
    setButtonColor(previousButtonColor);
  };

  const handleSave = () => {
    setPreviousTextSize(textSize);
    setPreviousButtonSize(buttonSize);
    setPreviousButtonColor(buttonColor);
    localStorage.setItem('textSize', textSize);
    localStorage.setItem('buttonSize', buttonSize);
    localStorage.setItem('buttonColor', buttonColor);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="absolute top-4 left-4">
        <FontAwesomeIcon icon={faArrowLeft} size="5x" className="text-gray-500 cursor-pointer" onClick={() => navigate(-1)} />
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <h2 className="text-4xl mb-8">Configuración</h2>
        
        <div className="mb-8">
          <label className="block text-gray-700 text-2xl mb-4">Tamaño de Texto</label>
          <select value={textSize} onChange={handleTextSizeChange} className="w-full p-4 border rounded text-2xl">
            <option value="text-lg">Pequeño</option>
            <option value="text-2xl">Mediano</option>
            <option value="text-4xl">Grande</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 text-2xl mb-4">Tamaño de los Botones</label>
          <select value={buttonSize} onChange={handleButtonSizeChange} className="w-full p-4 border rounded text-2xl">
            <option value="w-24 h-12 text-lg">Pequeño</option>
            <option value="w-32 h-16 text-2xl">Mediano</option>
            <option value="w-36 h-20 text-4xl">Grande</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 text-2xl mb-4">Color de los Botones</label>
          <select value={buttonColor} onChange={handleButtonColorChange} className="w-full p-4 border rounded text-2xl">
            <option value="bg-blue-500">Azul</option>
            <option value="bg-green-500">Verde</option>
            <option value="bg-red-500">Rojo</option>
            <option value="bg-yellow-500">Amarillo</option>
            <option value="bg-gray-500">Gris</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button onClick={handleUndo} className="bg-gray-500 text-white p-4 rounded text-2xl">Deshacer</button>
          <button onClick={handleSave} className="bg-blue-500 text-white p-4 rounded text-2xl">Guardar</button>
        </div>
        <div className="mt-8 text-center">
          <span className="text-2xl">Ejemplo de botón:</span>
          <div className="mt-4">
            <Button
              char="Botón"
              onClick={() => {}}
              color={buttonColor}
              active={false}
              size={buttonSize}
              textSize={textSize}
              capsLock={false}
              shift={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
