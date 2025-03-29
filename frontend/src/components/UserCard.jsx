import React from 'react'
import axios from 'axios'
import config from '../../config'
import { useNavigate } from 'react-router-dom'

// UserCard component 
const UserCard = ({ user }) => {

    const navigate = useNavigate()

    const handleDelete = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this user?')
        
        if (confirmation) {
        try {
            const response = await axios.delete(`${config.API_URL}/users/${user.id}`)
            
            if (response.status === 204) {
            alert('User deleted successfully')
            }
        } catch (error) {
            alert('Error deleting user. Please try again later.')
            console.error('Error:', error)
        }
        }
    }

    // Function to navigate to the update user page
    const handleEdit = () => {
        navigate(`/update/user/${user.id}`);
    };

  return (
    <div className="w-68 p-6 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col items-center space-y-4 hover:shadow-xl transition-shadow duration-300">
      <img src={user.avatar} 
        alt={user.first_name} 
        className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-md" />
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 font-mono">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">email: {user.email}</p>
      </div>

      <div className="flex space-x-3 mt-3 font-mono ml-2">
        <button onClick={handleEdit}
        className="bg-blue-500 text-white px-4 py-2 rounded-4xl hover:bg-blue-600 transition">
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="bg-red-400 text-white px-4 py-2 rounded-4xl hover:bg-red-600 transition">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard
