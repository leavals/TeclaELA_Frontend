import React from 'react';

interface EmergencyButtonProps {
  onClick: () => void;
  key: string;
  className?: string; // Hacer que className sea opcional
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-red-500 text-white p-4 rounded text-2xl ${className}`} // Añadir className aquí
    >
      EMERGENCIA
    </button>
  );
};

export default EmergencyButton;
