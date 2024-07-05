import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/keyboard'); // Redirigir a la página de teclado si ya está logueado
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api-token-auth/', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username); // Guardar el nombre de usuario en localStorage
      navigate('/keyboard'); // Redirigir a la página del teclado
    } catch (err) {
      setError('Login failed. Please check your username and password.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="absolute top-4 left-4">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" className="text-gray-500 cursor-pointer" onClick={() => navigate(-1)} />
      </div>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-4xl mb-8 text-center">Login</h2>
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
          <label className="block text-gray-700 text-2xl mb-4">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border rounded text-2xl"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-4 rounded text-2xl">Login</button>
        <div className="mt-8 text-center text-2xl">
          <span className="text-gray-700">No tienes cuenta? </span>
          <span className="text-blue-500 cursor-pointer" onClick={handleRegisterClick}>Regístrate</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
