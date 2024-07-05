import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRepeat, faGear } from '@fortawesome/free-solid-svg-icons';

interface UserIconsProps {
  handleUserClick: () => void;
  navigate: (path: string) => void;
}

const UserIcons: React.FC<UserIconsProps> = ({ handleUserClick, navigate }) => {
  return (
    <div className="flex justify-center space-x-8 mt-2 mb-4">
      <FontAwesomeIcon icon={faRepeat} size="4x" className="text-gray-500" />
      <FontAwesomeIcon icon={faUser} size="4x" className="text-gray-500" onClick={handleUserClick} />
      <FontAwesomeIcon icon={faGear} size="4x" className="text-gray-500" onClick={() => navigate('/configuration')} />
    </div>
  );
};

export default UserIcons;
