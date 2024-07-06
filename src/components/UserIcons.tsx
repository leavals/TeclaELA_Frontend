import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRepeat, faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const UserIcons: React.FC = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    const username = localStorage.getItem('username');
    if (username) {
      navigate('/user');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex justify-center space-x-8 mt-2 mb-4">
      <FontAwesomeIcon icon={faRepeat} size="4x" className="text-gray-500" onClick={() => navigate('/action-buttons')} />
      <FontAwesomeIcon icon={faUser} size="4x" className="text-gray-500" onClick={handleUserClick} />
      <FontAwesomeIcon icon={faGear} size="4x" className="text-gray-500" onClick={() => navigate('/configuration')} />
    </div>
  );
};

export default UserIcons;
