import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaBookReader, FaPlus, FaSearch } from 'react-icons/fa';

const AddSkill = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewSkillForm, setShowNewSkillForm] = useState(false);
  
  const [formData, setFormData] = useState({
    skillId: '',
    skillType: 'OFFER',
    proficiencyLevel: 3,
    description: '',
    isAvailable: true
  });

  const [newSkillData, setNewSkillData] = useState({
    name: '',
    category: 'Technology',
    description: ''
  });

  const categories = [
    'Technology', 'Language', 'Business', 'Arts & Crafts', 
    'Health & Fitness', 'Music', 'Cooking', 'Other'
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = skills.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills(skills);
    }
  }, [searchQuery, skills]);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkills(response.data);
      setFilteredSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSkillSelect = (skill) => {
    setFormData({ ...formData, skillId: skill.id });
    setSearchQuery(skill.name);
  };

  const handleCreateSkill = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/skills', {
        ...newSkillData,
        isActive: true
      });
      const createdSkill = response.data;
      setSkills([...skills, createdSkill]);
      setFormData({ ...formData, skillId: createdSkill.id });
      setSearchQuery(createdSkill.name);
      setShowNewSkillForm(false);
    } catch (error) {
      console.error('Error creating skill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.skillId) {
      alert('Please select a skill');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/user-skills', {
        ...formData,
        userId: user.id
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding user skill:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">Add a New Skill</h2>
            <p className="text-indigo-100 mt-2">Share your expertise or find something new to learn</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Skill Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Skill</label>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                    <div className="pl-3 text-gray-500">
                      <FaSearch />
                    </div>
                    <input
                      type="text"
                      className="w-full px-4 py-3 focus:outline-none"
                      placeholder="Search for a skill..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {searchQuery && !formData.skillId && (
                    <div className="absolute z-10 w-full bg-white mt-1 border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredSkills.map(skill => (
                        <div
                          key={skill.id}
                          className="px-4 py-3 hover:bg-indigo-50 cursor-pointer transition"
                          onClick={() => handleSkillSelect(skill)}
                        >
                          <p className="font-medium text-gray-900">{skill.name}</p>
                          <p className="text-xs text-gray-500">{skill.category}</p>
                        </div>
                      ))}
                      {filteredSkills.length === 0 && (
                        <div 
                          className="px-4 py-3 hover:bg-indigo-50 cursor-pointer text-indigo-600 font-medium flex items-center"
                          onClick={() => setShowNewSkillForm(true)}
                        >
                          <FaPlus className="mr-2" /> Create "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* New Skill Form Modal/Section */}
              {showNewSkillForm && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-indigo-50 p-6 rounded-xl border border-indigo-100"
                >
                  <h4 className="font-bold text-indigo-900 mb-4">Create New Skill</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-indigo-800 mb-1">Skill Name</label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={newSkillData.name}
                        onChange={(e) => setNewSkillData({...newSkillData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-indigo-800 mb-1">Category</label>
                      <select
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={newSkillData.category}
                        onChange={(e) => setNewSkillData({...newSkillData, category: e.target.value})}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-indigo-800 mb-1">Description</label>
                    <textarea
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      rows="2"
                      value={newSkillData.description}
                      onChange={(e) => setNewSkillData({...newSkillData, description: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowNewSkillForm(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleCreateSkill}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                    >
                      Create Skill
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Skill Type */}
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`cursor-pointer p-4 rounded-xl border-2 transition flex flex-col items-center justify-center text-center ${
                    formData.skillType === 'OFFER' 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => setFormData({...formData, skillType: 'OFFER'})}
                >
                  <FaChalkboardTeacher className="text-3xl mb-2" />
                  <span className="font-bold">I want to Teach</span>
                  <span className="text-xs mt-1">Offer this skill to others</span>
                </div>
                <div 
                  className={`cursor-pointer p-4 rounded-xl border-2 transition flex flex-col items-center justify-center text-center ${
                    formData.skillType === 'LEARN' 
                      ? 'border-purple-600 bg-purple-50 text-purple-700' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setFormData({...formData, skillType: 'LEARN'})}
                >
                  <FaBookReader className="text-3xl mb-2" />
                  <span className="font-bold">I want to Learn</span>
                  <span className="text-xs mt-1">Find a mentor for this</span>
                </div>
              </div>

              {/* Proficiency & Description */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proficiency Level (1-5)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    value={formData.proficiencyLevel}
                    onChange={(e) => setFormData({...formData, proficiencyLevel: parseInt(e.target.value)})}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description / Goals
                  </label>
                  <textarea
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-4"
                    rows="4"
                    placeholder={formData.skillType === 'OFFER' 
                      ? "Describe your experience and what you can teach..." 
                      : "Describe what you want to learn and your current level..."}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="mr-4 px-6 py-3 text-gray-700 font-medium hover:text-gray-900 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
                >
                  {loading ? 'Saving...' : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddSkill;
