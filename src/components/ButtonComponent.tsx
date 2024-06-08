import React, { useState } from 'react';

const ButtonComponent: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleButtonClick = (char: string) => {
    if (char === 'DELETE') {
      setText(text.slice(0, -1));
    } else {
      setText(text + char);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md text-center text-4xl mb-4">
        <div className="truncate">{text || <span className="text-gray-400">Aquí aparecerá el texto</span>}</div>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        <button
          onClick={() => handleButtonClick('a')}
          className="bg-blue-500 text-white font-bold py-8 px-4 rounded-full text-3xl w-full"
        >
          a
        </button>
        <button
          onClick={() => handleButtonClick('e')}
          className="bg-blue-500 text-white font-bold py-8 px-4 rounded-full text-3xl w-full"
        >
          e
        </button>
        <button
          onClick={() => handleButtonClick('i')}
          className="bg-blue-500 text-white font-bold py-8 px-4 rounded-full text-3xl w-full"
        >
          i
        </button>
        <button
          onClick={() => handleButtonClick('o')}
          className="bg-blue-500 text-white font-bold py-8 px-4 rounded-full text-3xl w-full"
        >
          o
        </button>
        <button
          onClick={() => handleButtonClick('u')}
          className="bg-blue-500 text-white font-bold py-8 px-4 rounded-full text-3xl w-full"
        >
          u
        </button>
        <button
          onClick={() => handleButtonClick('DELETE')}
          className="bg-red-500 text-white font-bold py-8 px-4 rounded-full text-3xl w-full"
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

export default ButtonComponent;
