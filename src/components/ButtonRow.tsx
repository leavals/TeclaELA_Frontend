import React from 'react';
import Button from './Button';

interface ButtonRowProps {
  row: string[];
  handleButtonClick: (char: string) => void;
  buttonColor: string;
  buttonSize: string;
  textSize: string;
  shift: boolean;
  capsLock: boolean;
  isNumVisible: boolean;
}

const ButtonRow: React.FC<ButtonRowProps> = ({ row, handleButtonClick, buttonColor, buttonSize, textSize, shift, capsLock, isNumVisible }) => {
  return (
    <div className={`grid grid-cols-${row.length} gap-2 w-full mb-2`}>
      {row.map((char, index) => (
        <Button
          key={index}
          char={char}
          onClick={() => handleButtonClick(char)}
          color={char.match(/\d/) ? `bg-gray-${isNumVisible ? 600 : 500}` : buttonColor}
          active={(shift && char === 'SHIFT') || (capsLock && char === 'CAPS')}
          size={buttonSize}
          textSize={textSize}
          capsLock={capsLock}
          shift={shift}
        />
      ))}
    </div>
  );
};

export default ButtonRow;
