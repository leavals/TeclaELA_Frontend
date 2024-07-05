import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

interface WhatsAppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  key: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ className, ...props }) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = localStorage.getItem('alertPhone') || '123456789';
    const message = encodeURIComponent('Necesito Asistencia');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`w-full bg-green-500 text-white p-4 rounded text-2xl ${className}`}
      {...props}
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </button>
  );
};

export default WhatsAppButton;
