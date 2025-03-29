import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)

  // Chekcking if user is already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login Function
  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        console.log('Token set in localStorage:', localStorage.getItem('token'))
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please try again.')
      } else {
        setError('An unexpected error occurred. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/get/users')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-mono">
      <Header />

      <div className="flex-grow flex justify-center items-center p-4">
        <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
          {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-3/4 flex justify-center mx-auto py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all text-xl mt-8 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} 
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage
