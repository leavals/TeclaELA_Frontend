import React from 'react';
import Button from './Button';

interface SpecialButtonRowProps {
  row: string[];
  handleButtonClick: (char: string) => void;
  buttonColor: string;
  buttonSize: string;
  textSize: string;
  shift: boolean;
  capsLock: boolean;
}

const SpecialButtonRow: React.FC<SpecialButtonRowProps> = ({ row, handleButtonClick, buttonColor, buttonSize, textSize, shift, capsLock }) => {
  return (
    <div className={`grid grid-cols-${row.length} gap-2 w-full mb-2`}>
      {row.map((char, index) => (
        <Button
          key={index}
          char={char}
          onClick={() => handleButtonClick(char)}
          color={buttonColor}
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

export default SpecialButtonRow;
