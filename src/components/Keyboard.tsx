import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRepeat, faCirclePlay, faGear, faTrashCan, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import Button from './Button';
import WhatsAppButton from './WhatsAppButton';
import EmergencyButton from './EmergencyButton';

const specialButtonColors: { [key: string]: string } = {
  'DELETE_LEFT': 'bg-red-500',
  'SHIFT': 'bg-green-500',
  'MAY': 'bg-yellow-500',
  'ENT': 'bg-blue-500',
  'ESP': 'bg-gray-500',
  'NUM': 'bg-blue-500',
  'TRASH': 'bg-orange-500',
};

const Keyboard: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [capsLock, setCapsLock] = useState<boolean>(false);
  const [shift, setShift] = useState<boolean>(false);
  const [numLock, setNumLock] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  const [buttonSize, setButtonSize] = useState(localStorage.getItem('buttonSize') || 'w-32 h-16');
  const [textSize, setTextSize] = useState(localStorage.getItem('textSize') || 'text-lg');
  const [buttonColor, setButtonColor] = useState(localStorage.getItem('buttonColor') || 'bg-blue-500');
  const [buttonNumberColor, setButtonNumberColor] = useState(localStorage.getItem('buttonNumberColor') || 'bg-blue-600');

  const navigate = useNavigate();
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const savedTextSize = localStorage.getItem('textSize');
    const savedButtonSize = localStorage.getItem('buttonSize');
    const savedButtonColor = localStorage.getItem('buttonColor');
    const savedButtonNumberColor = localStorage.getItem('buttonNumberColor');

    if (savedTextSize) setTextSize(savedTextSize);
    if (savedButtonSize) setButtonSize(savedButtonSize);
    if (savedButtonColor) setButtonColor(savedButtonColor);
    if (savedButtonNumberColor) setButtonNumberColor(savedButtonNumberColor);
  }, []);

  const handleButtonClick = (char: string) => {
    if (char === 'DELETE_LEFT') {
      setText(text.slice(0, -1));
    } else if (char === 'ESP') {
      setText(text + ' ');
    } else if (char === 'ENT') {
      setText(text + '\n');
    } else if (char === 'SHIFT') {
      setShift(!shift);
    } else if (char === 'MAY') {
      setCapsLock(!capsLock);
    } else if (char === 'NUM') {
      setNumLock(!numLock);
    } else if (char === 'TRASH') {
      setText('');
    } else {
      const newChar = capsLock || shift ? char.toUpperCase() : char.toLowerCase();
      setText(text + newChar);
      if (shift) setShift(false);
    }
  };

  const getButtonRows = () => {
    const whatsappButton = username ? <WhatsAppButton key="WHA" className="w-full" /> : null;
    const emergencyButton = (
      <EmergencyButton key="EMER" onClick={() => new Audio('/sounds/emergency-sound.mp3').play()} className="w-full" />
    );

    if (numLock) {
      return [
        ['NUM', '1', '2', '3'],
        ['4', '5', '6', '7'],
        ['8', '9', '0', 'ESP'],
        ['DELETE_LEFT', 'q', 'w', 'e'],
        ['r', 't', 'y', 'u'],
        ['i', 'o', 'p', 'a'],
        ['s', 'd', 'f', 'g'],
        ['h', 'j', 'k', 'l'],
        ['ñ', 'z', 'x', 'c'],
        ['v', 'b', 'n', 'm'],
        ['ENT', 'SHIFT', 'MAY', 'TRASH'],
        [emergencyButton],
        [whatsappButton],
      ];
    } else {
      return [
        ['NUM', 'ESP', 'DELETE_LEFT', 'q'],
        ['w', 'e', 'r', 't'],
        ['y', 'u', 'i', 'o'],
        ['p', 'a', 's', 'd'],
        ['f', 'g', 'h', 'j'],
        ['k', 'l', 'ñ', 'z'],
        ['x', 'c', 'v', 'b'],
        ['n', 'm', 'ESP', 'ENT'],
        ['SHIFT', 'MAY', 'DELETE_LEFT', 'TRASH'],
        [emergencyButton],
        [whatsappButton],
      ];
    }
  };

  const buttonRows = getButtonRows();

  const handleUserClick = () => {
    navigate(username ? '/user' : '/login');
  };

  const handleSpeak = () => {
    speak({ text });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center space-x-8 mt-2 mb-4">
        <FontAwesomeIcon icon={faRepeat} size="3x" className="text-gray-500" />
        <FontAwesomeIcon icon={faUser} size="3x" className="text-gray-500" onClick={handleUserClick} />
        <FontAwesomeIcon icon={faGear} size="3x" className="text-gray-500" onClick={() => navigate('/configuration')} />
      </div>
      <div className="flex items-center w-full max-w-md mb-4 mt-4">
        <div className="bg-white p-6 rounded shadow-md flex-grow text-center text-4xl h-32 flex items-center justify-center">
          <div className="truncate">{text !== '' ? text : <span className="text-gray-400">Aquí aparecerá el texto</span>}</div>
        </div>
        <FontAwesomeIcon icon={faCirclePlay} size="3x" className="text-gray-500 ml-4" onClick={handleSpeak} />
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto flex-grow mt-4">
        {buttonRows.map((row, rowIndex) => (
          <div key={rowIndex} className={`grid grid-cols-${row.length} gap-2 w-full mb-2`}>
            {row.map((char, index) => (
              typeof char === 'string' ? (
                <Button
                  key={index}
                  char={
                    char === 'DELETE_LEFT' ? <FontAwesomeIcon icon={faDeleteLeft} /> :
                    char === 'TRASH' ? <FontAwesomeIcon icon={faTrashCan} /> : char
                  }
                  onClick={() => handleButtonClick(char)}
                  color={specialButtonColors[char] || (char.match(/[0-9]/) && numLock ? buttonNumberColor : buttonColor)}
                  active={(shift && char === 'SHIFT') || (capsLock && char === 'MAY') || (numLock && char === 'NUM')}
                  size={buttonSize}
                  textSize={textSize}
                  capsLock={capsLock}
                  shift={shift}
                />
              ) : (
                char // Renderiza el componente WhatsAppButton si el usuario está logueado
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
