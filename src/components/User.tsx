import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const User: React.FC = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertPhone, setAlertPhone] = useState(localStorage.getItem('alertPhone') || '');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSavePhone = () => {
    localStorage.setItem('alertPhone', alertPhone);
    setIsModalOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="absolute top-4 left-4">
        <FontAwesomeIcon icon={faArrowLeft} size="5x" className="text-gray-500 cursor-pointer" onClick={() => navigate(-1)} />
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <h2 className="text-4xl mb-8">Perfil de Usuario</h2>
        <p className="mb-8 text-2xl">Bienvenido, {username}</p>
        <div className="flex flex-col space-y-4">
          <button className="bg-blue-500 text-white p-4 rounded text-2xl">Editar mis datos</button>
          <button className="bg-blue-500 text-white p-4 rounded text-2xl" onClick={handleOpenModal}>Configurar Teléfono Alerta</button>
          <button className="bg-blue-500 text-white p-4 rounded text-2xl" onClick={() => navigate('/action-buttons')}>Configurar botones</button>
          <button className="bg-blue-500 text-white p-4 rounded text-2xl" onClick={handleLogout}>Cerrar Mi Sesión</button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="modal large-modal"
        overlayClassName="overlay"
      >
        <h2 className="text-2xl mb-4">Configurar Teléfono Alerta</h2>
        <input
          type="text"
          value={alertPhone}
          onChange={(e) => setAlertPhone(e.target.value)}
          className="p-4 border rounded w-full mb-4 text-xl"
          placeholder="Ingrese su teléfono de alerta"
        />
        <div className="flex justify-between">
          <button className="bg-gray-500 text-white p-4 rounded text-xl" onClick={handleCloseModal}>Cancelar</button>
          <button className="bg-blue-500 text-white p-4 rounded text-xl" onClick={handleSavePhone}>Confirmar</button>
        </div>
      </Modal>
    </div>
  );
};

export default User;
