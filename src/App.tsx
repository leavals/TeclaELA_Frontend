import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import Keyboard from './components/Keyboard';
import Configuration from './components/Configuration';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Keyboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/keyboard" element={<Keyboard />} />
        <Route path="/configuration" element={<Configuration />} />
      </Routes>
    </Router>
  );
};

export default App;
