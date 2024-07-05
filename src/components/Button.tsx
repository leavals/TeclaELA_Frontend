import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
  char: string | JSX.Element;
  onClick: () => void;
  color: string;
  active: boolean;
  size: string;
  textSize: string;
  capsLock: boolean;
  shift: boolean;
}

const Button: React.FC<ButtonProps> = ({ char, onClick, color, active, size, textSize, capsLock, shift }) => {
  const buttonClasses = `${color} ${size} ${textSize} ${active ? 'bg-opacity-75' : 'bg-opacity-100'} text-white`;

  const renderChar = () => {
    if (typeof char === 'string') {
      if (char === 'DELETE_LEFT') {
        return <FontAwesomeIcon icon={faDeleteLeft} />;
      } else if (char === 'TRASH') {
        return <FontAwesomeIcon icon={faTrashCan} />;
      } else if (char.length === 1 && /[a-zA-Z]/.test(char)) {
        return capsLock || shift ? char.toUpperCase() : char.toLowerCase();
      } else {
        return char;
      }
    } else {
      return char;
    }
  };

  return (
    <button onClick={onClick} className={`${buttonClasses} rounded flex items-center justify-center`}>
      {renderChar()}
    </button>
  );
};

export default Button;
