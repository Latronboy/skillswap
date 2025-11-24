import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-dark">
            Skill<span className="text-primary">Swap</span>
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="nav-link font-medium text-dark">Home</Link>
          <Link to="/browse" className="nav-link font-medium text-dark">Browse Skills</Link>
          <Link to="/" className="nav-link font-medium text-dark">How It Works</Link>
          <Link to="/" className="nav-link font-medium text-dark">Community</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hidden md:block bg-primary hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition duration-300">
                Dashboard
              </Link>
              <Link to="/profile" className="hidden md:block bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-6 rounded-full transition duration-300">
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="hidden md:block bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-full transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:block bg-primary hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition duration-300">
                Sign In
              </Link>
              <Link to="/register" className="hidden md:block bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-6 rounded-full transition duration-300">
                Join Free
              </Link>
            </>
          )}
          <button className="md:hidden text-dark">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
