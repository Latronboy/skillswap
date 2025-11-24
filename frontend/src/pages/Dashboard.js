import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaComments, FaChalkboardTeacher, FaBookReader, FaUserFriends, FaExchangeAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSkills: 0,
    offeredSkills: 0,
    learningSkills: 0,
    connections: 0,
    exchanges: 0
  });
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const skillsResponse = await axios.get(`/api/user-skills/user/${user.id}`);
      const skills = skillsResponse.data;
      setUserSkills(skills);
      
      const offeredSkills = skills.filter(skill => skill.skillType === 'OFFER');
      const learningSkills = skills.filter(skill => skill.skillType === 'LEARN');
      
      setStats({
        totalSkills: skills.length,
        offeredSkills: offeredSkills.length,
        learningSkills: learningSkills.length,
        connections: 0,
        exchanges: 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white pb-24 pt-12 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
              <p className="text-indigo-100 text-lg">Ready to learn something new today?</p>
            </div>
            <Link 
              to="/add-skill"
              className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-50 transition transform hover:scale-105 flex items-center"
            >
              <FaPlus className="mr-2" /> Add New Skill
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16">
        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Skills</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.totalSkills}</h3>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                <FaChalkboardTeacher size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Learning</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.learningSkills}</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <FaBookReader size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Connections</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.connections}</h3>
              </div>
              <div className="p-3 bg-pink-100 rounded-full text-pink-600">
                <FaUserFriends size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Exchanges</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.exchanges}</h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                <FaExchangeAlt size={24} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Skills Section */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">My Skills</h3>
                <Link to="/add-skill" className="text-indigo-600 text-sm font-medium hover:text-indigo-800">View All</Link>
              </div>
              <div className="p-6">
                {userSkills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userSkills.map((skill) => (
                      <div key={skill.id} className="flex items-center p-4 rounded-xl border border-gray-100 hover:shadow-md transition bg-gray-50">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ${
                          skill.skillType === 'OFFER' ? 'bg-indigo-500' : 'bg-purple-500'
                        }`}>
                          {skill.skillName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{skill.skillName}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            skill.skillType === 'OFFER' 
                              ? 'bg-indigo-100 text-indigo-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {skill.skillType === 'OFFER' ? 'Teaching' : 'Learning'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaPlus className="text-indigo-400 text-xl" />
                    </div>
                    <h4 className="text-gray-800 font-medium mb-2">No skills added yet</h4>
                    <p className="text-gray-500 text-sm mb-4">Start by adding skills you can teach or want to learn</p>
                    <Link to="/add-skill" className="text-indigo-600 font-bold hover:underline">Add your first skill</Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Recent Activity Placeholder */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
              </div>
              <div className="p-6 text-center text-gray-500 py-12">
                <FaExchangeAlt className="mx-auto text-4xl text-gray-300 mb-3" />
                <p>No recent activity to show.</p>
                <p className="text-sm mt-1">Connect with others to start exchanging skills!</p>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/browse" className="block w-full p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 hover:shadow-md transition group">
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-indigo-600 mr-3 group-hover:text-indigo-700">
                      <FaSearch />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Find Skills</p>
                      <p className="text-xs text-gray-500">Browse available mentors</p>
                    </div>
                  </div>
                </Link>
                
                <button className="block w-full p-4 rounded-xl bg-gradient-to-r from-purple-50 to-white border border-purple-100 hover:shadow-md transition group text-left">
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-purple-600 mr-3 group-hover:text-purple-700">
                      <FaComments />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Messages</p>
                      <p className="text-xs text-gray-500">Check your inbox</p>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-2">Pro Tip</h3>
              <p className="text-indigo-100 text-sm mb-4">
                Users with complete profiles and detailed skill descriptions get 3x more exchange requests!
              </p>
              <Link to="/profile" className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition">
                Update Profile
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
