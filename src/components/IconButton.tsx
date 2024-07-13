import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IconButtonProps {
  icon: IconProp;
  onClick: () => void;
  color: string;
  size: string;
  textSize: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, color, size, textSize }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded p-3 ${color} ${size} ${textSize} text-white hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-green-400`}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default IconButton;
