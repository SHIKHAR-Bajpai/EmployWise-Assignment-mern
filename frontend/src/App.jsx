import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import LoginPage from './components/Login';
import UserList from './components/UserList';
import EditUser from './components/UpdateUser';

const isAuthenticated = localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/get/users" element={ isAuthenticated ? <UserList /> : <LoginPage />} />
        <Route path="/update/user/:id" element={ isAuthenticated ? <EditUser /> : <LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
