import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaStar } from 'react-icons/fa';

const Browse = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchSkills();
    fetchCategories();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/skills/categories');
      setCategories(['All', ...response.data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback categories if API fails
      setCategories(['All', 'Technology', 'Language', 'Business', 'Arts & Crafts', 'Health & Fitness']);
    }
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-dark mb-4"
          >
            Explore Skills
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover thousands of skills offered by our community. Find your next mentor or learning partner today.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for skills (e.g. Python, Spanish, Yoga)..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="md:w-1/4 relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none appearance-none bg-white cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <motion.div 
                  key={skill.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
                >
                  <div className={`h-32 bg-gradient-to-r ${getGradient(skill.category)} relative`}>
                    <div className="absolute -bottom-6 left-6">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-2xl">
                        {getIcon(skill.category)}
                      </div>
                    </div>
                  </div>
                  <div className="pt-8 pb-6 px-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{skill.category}</span>
                      <div className="flex items-center text-amber-400 text-xs font-bold">
                        <FaStar className="mr-1" /> 4.8
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-2">{skill.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {skill.description || `Learn ${skill.name} from experienced mentors in our community.`}
                    </p>
                    <button className="w-full py-2 rounded-lg bg-indigo-50 text-indigo-600 font-bold hover:bg-indigo-100 transition">
                      View Mentors
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">😕</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No skills found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Helper to get gradient based on category
const getGradient = (category) => {
  switch(category) {
    case 'Technology': return 'from-blue-500 to-cyan-500';
    case 'Language': return 'from-orange-500 to-amber-500';
    case 'Business': return 'from-emerald-500 to-teal-500';
    case 'Arts & Crafts': return 'from-rose-500 to-pink-500';
    case 'Health & Fitness': return 'from-green-500 to-lime-500';
    case 'Music': return 'from-violet-500 to-purple-500';
    default: return 'from-indigo-500 to-blue-500';
  }
};

// Helper to get icon emoji based on category
const getIcon = (category) => {
  switch(category) {
    case 'Technology': return '💻';
    case 'Language': return '🗣️';
    case 'Business': return '💼';
    case 'Arts & Crafts': return '🎨';
    case 'Health & Fitness': return '🧘';
    case 'Music': return '🎵';
    case 'Cooking': return '🍳';
    default: return '✨';
  }
};

export default Browse;
