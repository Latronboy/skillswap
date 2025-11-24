import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChalkboardTeacher, FaSearch, FaExchangeAlt, FaStar, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-light overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, 50, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-500 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-12 md:mb-0"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                Master New Skills <br/>
                <span className="text-indigo-400">Through Exchange</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8 max-w-lg leading-relaxed">
                Join a community of lifelong learners. Teach what you know, learn what you love, and grow together without spending a dime.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-indigo-500/30 transition"
                  >
                    Get Started Free
                  </motion.button>
                </Link>
                <Link to="/browse">
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-transparent border-2 border-indigo-400 text-indigo-100 hover:text-white font-bold py-4 px-8 rounded-full text-lg transition"
                  >
                    Explore Skills
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Floating Cards */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 shadow-xl z-20"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">🎸</div>
                    <div>
                      <p className="font-bold text-sm">Guitar Lessons</p>
                      <p className="text-xs text-green-300">Offered by Alex</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 -left-4 bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 shadow-xl z-20"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-xl">🇪🇸</div>
                    <div>
                      <p className="font-bold text-sm">Spanish Tutor</p>
                      <p className="text-xs text-blue-300">Wanted by Sarah</p>
                    </div>
                  </div>
                </motion.div>

                <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl p-1 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
                  <div className="bg-slate-900 rounded-[22px] overflow-hidden h-96 flex items-center justify-center relative">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-60"></div>
                     <div className="relative z-10 text-center p-6">
                        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                          <FaExchangeAlt className="text-3xl text-indigo-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">SkillSwap</h3>
                        <p className="text-gray-300">Connect. Learn. Grow.</p>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f8fafc" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-light relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-slate-800 mb-4">How SkillSwap Works</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto text-lg">
              Exchange your expertise for new skills in three simple steps. No money involved, just pure knowledge sharing.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              { 
                icon: <FaChalkboardTeacher />, 
                title: "List Your Skills", 
                desc: "Create a profile and list the skills you can teach others.",
                color: "bg-indigo-100 text-indigo-600"
              },
              { 
                icon: <FaSearch />, 
                title: "Find a Match", 
                desc: "Search for people offering the skills you want to learn.",
                color: "bg-purple-100 text-purple-600"
              },
              { 
                icon: <FaExchangeAlt />, 
                title: "Start Swapping", 
                desc: "Connect, schedule a session, and start learning from each other.",
                color: "bg-pink-100 text-pink-600"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 text-center"
              >
                <div className={`w-20 h-20 rounded-full ${item.color} flex items-center justify-center text-3xl mx-auto mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Skills Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-2">Trending Skills</h2>
              <p className="text-gray-600">What the community is learning right now</p>
            </div>
            <Link to="/browse" className="text-indigo-600 font-bold flex items-center hover:text-indigo-800 transition">
              View All Skills <FaArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Web Development", count: "120+", color: "from-blue-500 to-cyan-500" },
              { name: "Digital Marketing", count: "95+", color: "from-emerald-500 to-teal-500" },
              { name: "Graphic Design", count: "80+", color: "from-purple-500 to-pink-500" },
              { name: "Languages", count: "200+", color: "from-orange-500 to-amber-500" }
            ].map((skill, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.03 }}
                className="group cursor-pointer"
              >
                <div className={`h-40 rounded-t-2xl bg-gradient-to-r ${skill.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
                </div>
                <div className="bg-slate-50 p-6 rounded-b-2xl border border-t-0 border-gray-100 shadow-sm group-hover:shadow-md transition">
                  <h3 className="font-bold text-lg text-slate-800 mb-1">{skill.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <FaStar className="text-amber-400 mr-1" /> {skill.count} active users
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Share Your Knowledge?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of others who are already learning and growing together. It's free, fun, and rewarding.
          </p>
          <Link to="/register">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg shadow-indigo-500/30 transition"
            >
              Join the Community
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
