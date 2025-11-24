import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEdit, FaSave, FaTimes, FaPlus } from 'react-icons/fa';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('offered');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    if (user) {
      setEditedUser({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
        location: user.location || ''
      });
      fetchUserSkills();
    }
  }, [user]);

  const fetchUserSkills = async () => {
    try {
      const response = await axios.get(`/api/user-skills/user/${user.id}`);
      setUserSkills(response.data);
    } catch (error) {
      console.error('Error fetching user skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(`/api/users/${user.id}`, editedUser);
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const offeredSkills = userSkills.filter(skill => skill.skillType === 'OFFER');
  const learningSkills = userSkills.filter(skill => skill.skillType === 'LEARN');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen">
      {/* Profile Header */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-8 md:mb-0 flex justify-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center text-indigo-600 text-5xl font-bold">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 border-4 border-white">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:w-3/4 md:pl-12 text-center md:text-left text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-grow">
                  {isEditing ? (
                    <div className="space-y-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          className="px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                          placeholder="First Name"
                          value={editedUser.firstName}
                          onChange={(e) => setEditedUser({...editedUser, firstName: e.target.value})}
                        />
                        <input
                          type="text"
                          className="px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                          placeholder="Last Name"
                          value={editedUser.lastName}
                          onChange={(e) => setEditedUser({...editedUser, lastName: e.target.value})}
                        />
                      </div>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Location"
                        value={editedUser.location}
                        onChange={(e) => setEditedUser({...editedUser, location: e.target.value})}
                      />
                      <textarea
                        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Bio"
                        rows="3"
                        value={editedUser.bio}
                        onChange={(e) => setEditedUser({...editedUser, bio: e.target.value})}
                      ></textarea>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-4xl font-bold">{user?.firstName} {user?.lastName}</h1>
                      <p className="text-indigo-100 text-lg mt-2">@{user?.username}</p>
                      {user?.location && (
                        <div className="flex items-center justify-center md:justify-start mt-3">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-indigo-100">{user?.location}</span>
                        </div>
                      )}
                      {user?.bio && (
                        <p className="text-indigo-50 mt-4 max-w-2xl leading-relaxed">
                          {user.bio}
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div className="mt-6 md:mt-0 flex space-x-3">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleSaveProfile}
                        className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-6 rounded-full transition flex items-center shadow-lg"
                      >
                        <FaSave className="mr-2" /> Save
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="bg-red-500 text-white hover:bg-red-600 font-bold py-3 px-6 rounded-full transition flex items-center"
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-6 rounded-full transition flex items-center shadow-lg"
                    >
                      <FaEdit className="mr-2" /> Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{offeredSkills.length}</div>
              <div className="text-gray-600 font-medium">Skills Offered</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">{learningSkills.length}</div>
              <div className="text-gray-600 font-medium">Learning</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-pink-600 mb-2">0</div>
              <div className="text-gray-600 font-medium">Connections</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">My Skills</h2>
            <Link to="/add-skill">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition flex items-center shadow-lg">
                <FaPlus className="mr-2" /> Add Skill
              </button>
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  className={`py-4 px-8 font-bold transition ${
                    activeTab === 'offered'
                      ? 'text-indigo-600 border-b-4 border-indigo-600 bg-indigo-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('offered')}
                >
                  Skills I Offer ({offeredSkills.length})
                </button>
                <button
                  className={`py-4 px-8 font-bold transition ${
                    activeTab === 'learning'
                      ? 'text-purple-600 border-b-4 border-purple-600 bg-purple-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('learning')}
                >
                  Want to Learn ({learningSkills.length})
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeTab === 'offered' ? offeredSkills : learningSkills).map((skill) => (
                  <motion.div 
                    key={skill.id} 
                    whileHover={{ y: -5 }}
                    className="border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-indigo-200 transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl text-gray-800">{skill.skillName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        activeTab === 'offered' 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        Level {skill.proficiencyLevel || 3}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {skill.description || 'No description provided'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {skill.skillCategory}
                      </span>
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                        Edit
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {(activeTab === 'offered' ? offeredSkills : learningSkills).length === 0 && (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaPlus className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No skills yet</h3>
                  <p className="text-gray-500 mb-6">
                    {activeTab === 'offered' 
                      ? 'Add skills you can teach to others.' 
                      : 'Add skills you want to learn from others.'}
                  </p>
                  <Link to="/add-skill">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition">
                      Add Your First Skill
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
