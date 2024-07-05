import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/register/', {
        username,
        email,
        password,
      });
      navigate('/login'); // Redirigir a la página de login después de registrarse
    } catch (err) {
      setError('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="absolute top-4 left-4">
        <FontAwesomeIcon icon={faArrowLeft} size="5x" className="text-gray-500 cursor-pointer" onClick={() => navigate(-1)} />
      </div>
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-4xl mb-8 text-center">Register</h2>
        {error && <div className="bg-red-100 text-red-700 p-4 mb-8 rounded text-2xl">{error}</div>}
        <div className="mb-8">
          <label className="block text-gray-700 text-2xl mb-4">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 border rounded text-2xl"
            required
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 text-2xl mb-4">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border rounded text-2xl"
            required
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 text-2xl mb-4">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border rounded text-2xl"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-4 rounded text-2xl">Register</button>
      </form>
    </div>
  );
};

export default Register;
