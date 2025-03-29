import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user) {
      setUsername(user);
    }
  }, []);

  // Logout function 
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUsername('');
    navigate('/login'); 
  };

  return (
    <header className="bg-blue-500 text-white shadow-md py-3">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <h1 className="text-4xl font-bold font-mono py-6">User Management</h1>
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-6 items-center">
            {username ? (
              <>
                <li className="text-white font-semibold text-3xl font-mono">
                  Hello,👋
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-red-400 transition-all text-xl font-semibold font-mono border-2 p-4 ml-2 rounded-4xl">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-300 transition-all text-xl font-semibold font-mono border-2 p-4 rounded-4xl ">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-blue-300 transition-all text-xl font-semibold font-mono border-2 p-4 rounded-4xl">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
