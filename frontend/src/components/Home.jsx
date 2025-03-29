import React from 'react'
import Header from './Header'
import Footer from './Footer'
import home from '../assets/images/home.svg'
import '.././App.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token')

  // Home Page Button to fetch all users
  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/get/users');
    } else {
      alert('Please log in to view users');
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow flex justify-evenly items-center mx-36">
        <div className="text-font-mono text-center py-8">
          <h1 className="lg:text-4xl font-extrabold mb-16">
            Organise team and 
            <div className="lg:text-8xl duration-300 text-blue-500 animate-pulse text-center">
              <div className='typewriter'>Work Faster...</div>
            </div>
          </h1>
            
          <button
            onClick={handleButtonClick} 
            className="px-10 py-6 lg:text-4xl bg-blue-500 text-white rounded-full hover:bg-white hover:text-blue-500 hover:border-2 hover:border-blue-500 transition">
              Get All Users &#10148;
          </button>

        </div>

        <div>
            <img src={home} alt="home illustration"
              className="xl:w-xl lg:w-lg sm:w-sm"/>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
