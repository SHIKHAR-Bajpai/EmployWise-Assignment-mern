import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../config'
import { useParams, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// Function to update/edit user data (first_name, last_name, email)
const UpdateUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: null,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/users/${id}`)
        // console.table(response.data.data)
        setUser(response.data.data)
      } catch (err) {
        setError('Failed to fetch user data')
        console.error('Error:', err)
      }
    }

    fetchUser()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError('')

      try {
        const response = await axios.put(`${config.API_URL}/users/${id}`, user)
        if (response.status === 200) {
          alert('User updated successfully')
          navigate('/get/users')
        }
      } catch (err) {
        setError('Failed to update user data')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <div className="flex-grow flex justify-center items-center font-mono p-6">
        <div className="container mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-xl p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Update User</h2>

          <div className="mb-6 text-center">
            <img src={user.avatar} alt={user.first_name}
              className="w-32 h-32 rounded-full border-4 border-blue-400 mx-auto" />
          </div>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="first_name" className="block font-medium text-lg text-gray-700 ml-1">
                First Name
              </label>
              <input type="text" id="first_name" name="first_name" value={user.first_name} onChange={handleChange}
                className="w-full p-3 text-lg border border-gray-300 rounded-lg"
                required/>
            </div>

            <div>
              <label htmlFor="last_name" className="block text-lg font- text-gray-700 ml-1">
                Last Name
              </label>
              <input type="text" id="last_name" name="last_name" value={user.last_name} onChange={handleChange}
                className="w-full p-3 text-lg border border-gray-300 rounded-lg"
                required/>
            </div>

            <div>
              <label htmlFor="email" className="block text-lg ml-1 font-medium text-gray-700">
                Email
              </label>
              <input type="email" id="email" name="email" value={user.email || ''} onChange={handleChange}
                className="w-full p-3 text-lg border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="flex justify-evenly items-center mt-6 text-xl px-3 py-2">
              <button type="submit" disabled={loading}
                className={`px-8 py-4 rounded-4xl transition ${loading ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`} >
                {loading ? 'Updating...' : 'Update'}
              </button>

              <button type="button" onClick={() => navigate('/get/users')}
                className="px-8 py-4 rounded-4xl bg-gray-500 text-white hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default UpdateUser
