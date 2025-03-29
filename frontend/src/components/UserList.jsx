import React, { useState, useEffect } from 'react'
import UserCard from '../components/UserCard'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import config from '../../config'
import Header from './Header'
import Footer from './Footer'

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchUsers(page)
  }, [page])

  useEffect(() => {
    const filtered = users.filter(user => 
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchQuery, users])

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
  }

  const handlePrev = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col justify-center items-center relative px-4 sm:px-6 py-6">
        <div className="mb-6 w-full max-w-4xl flex items-center justify-start">
          <label htmlFor="search" className='font-mono text-2xl bg-blue-500 py-2 px-5 border-2 border-blue-500 text-white rounded-3xl rounded-r-none'>Search: </label>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔎 Search by name or email "
            className="w-1/3 py-3 px-2 border-2 border-blue-500 font-mono rounded-3xl rounded-l-none focus:outline-none focus:ring-0 focus:ring-blue-500"
          />
        </div>

        <div className="container mx-auto w-full max-w-5xl flex justify-center mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
            ) : (
              <p className="text-center col-span-full">No users found</p>
            )}
          </div>
        </div>

        <div className="flex justify-center font-mono text-lg space-x-4">
          <button
            className={`px-4 py-2 rounded-4xl ${page === 1 ? 'bg-gray-200 border-1 border-gray-400' : 'bg-blue-500 text-white'}`}
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 border-1 border-gray-400 rounded-4xl">
            Page {page} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-4xl ${page === totalPages ? 'bg-gray-200 border-1 border-gray-400' : 'bg-blue-500 text-white'}`}
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UsersList
