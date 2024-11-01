
import { Button } from "../components/ui/button";
import { FaBook, FaComments, FaUsers, FaTools } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center text-center px-4 animate-bg-gradient">

      {/* Heading Animation - Slow Fade and Slide Down */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-bold text-gray-800 mb-4"
      >
        InterviewHub
      </motion.h1>
      
      {/* Subtitle Animation - Slide in from Right */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2.5, delay: 1, ease: "easeOut" }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Everything you need to ace your tech interviews
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          Level up your career and land your next role with mock interviews and live feedback.
        </p>
      </motion.div>
      
      {/* Button Animation - Scale Up */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
      >
        <Link to={"/auth/sign-in"}>
          <Button className="px-6 py-3 mb-8 bg-primary text-white hover:bg-secondary hover:text-primary hover:border-primary border-transparent border-2 transition-colors duration-200">
            Get Started
          </Button>
        </Link>
      </motion.div>
      
      {/* Feature Cards Animation - Each Card with Different Delay and Slide-Up */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.4,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl"
      >
        {[
          { name: 'Resume Analysis', icon: <FaBook /> },
          { name: 'Mock Interviews', icon: <FaComments /> },
          { name: 'Feedbak System', icon: <FaUsers /> },
          { name: 'Support', icon: <FaTools /> },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1.8, delay: index * 0.4, ease: "easeOut" }}
            className="p-8 bg-white rounded-lg shadow-lg border-2 border-transparent text-primary hover:bg-secondary hover:text-primary hover:border-primary transition-colors duration-200 flex flex-col items-center"
          >
            <div className="text-3xl">{item.icon}</div>
            <h3 className="text-2xl font-semibold mt-4">{item.name}</h3>
            <p className="text-gray-600 mt-2">
              Explore {item.name.toLowerCase()} to boost your skills.
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;

















