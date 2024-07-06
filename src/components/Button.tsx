import React from 'react';

interface ButtonProps {
  char: string | React.ReactNode;
  onClick: (char: string) => void;
  color: string;
  active: boolean;
  size: string;
  textSize: string;
  capsLock: boolean;
  shift: boolean;
}

const Button: React.FC<ButtonProps> = ({ char, onClick, color, active, size, textSize, capsLock, shift }) => {
  const isSpecialChar = typeof char !== 'string';
  const displayChar = isSpecialChar ? char : capsLock || shift ? char.toUpperCase() : char.toLowerCase();

  const handleClick = () => {
    if (typeof char === 'string') {
      onClick(char);
    } else {
      onClick('');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${color} ${active ? 'ring-2 ring-offset-2 ring-indigo-500' : ''} ${size} ${textSize} text-white font-bold py-2 px-4 rounded`}
    >
      {displayChar}
    </button>
  );
};

export default Button;
