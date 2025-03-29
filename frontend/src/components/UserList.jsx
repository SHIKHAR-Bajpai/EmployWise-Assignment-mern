import React, { useState, useEffect } from 'react'
import UserCard from '../components/UserCard'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import config from '../../config'
import Header from './Header'
import Footer from './Footer'

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers(page)
  }, [page])

  
  // Function to fetch users from the API
  const getUsers = async (page) => {
    return await axios.get(`${config.API_URL}/users?page=${page}`)
  };

  const fetchUsers = async (page) => {
    try {
      const res = await getUsers(page)
      setUsers(res.data.data)
      setTotalPages(res.data.total_pages)
    } catch (error) {
      toast.error('Failed to load users. Please try again.', error)
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <div className="flex-grow flex flex-col justify-center items-center relative px-4 sm:px-6">
        <div className="w-full flex justify-center mb-6 ml-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-2 font-mono text-lg space-x-4">
          <button className={`px-4 py-2 rounded-4xl ${page === 1 ? 'bg-gray-200 border-1 border-gray-400' : 'bg-blue-500 text-white'}`}
            onClick={handlePrev} disabled={page === 1}>
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 border-1 border-gray-400 rounded-4xl">
            Page {page} of {totalPages}
          </span>
          <button className={`px-4 py-2 rounded-4xl ${page === totalPages ? 'bg-gray-200 border-1 border-gray-400' : 'bg-blue-500 text-white'}`}
            onClick={handleNext}
            disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UsersList
