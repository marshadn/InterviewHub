// import React from 'react';

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      {/* About Me Heading */}
      <h1 className="text-primary font-bold text-3xl mb-4">About Me</h1>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-3/4 hover:border-primary transition duration-300 border-2 border-transparent">
        {/* Top Half - Photo */}
        <div className="flex justify-center p-6 border-b border-gray-200">
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQHBSYkF3qINmQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719762585337?e=1735776000&v=beta&t=xnztg5qIKD_545HScQTPDwLOm_OtEi2r9G9CLbP6w6Q"
            alt="Muhamed Marshad"
            className="w-32 h-32 rounded-full border-2 border-transparent hover:border-primary transition duration-300"
          />
        </div>
        
        {/* Bottom Half - Text Content */}
        <div className="p-6">
          <h2 className="text-primary text-2xl font-bold mb-2" style={typingAnimation}>
            Developer: Muhamed Marshad
          </h2>
          <h3 className="text-lg" style={typingAnimation}>
            <strong>Contact No:</strong> +91 9539695981
          </h3>
          <h3 className="text-lg" style={typingAnimation}>
            <strong>Email:</strong> marsmuhd@gmail.com
          </h3>
          <h3 className="text-lg" style={typingAnimation}>
            <strong>Instagram:</strong> marshadn
          </h3>
          <h3 className="text-lg" style={typingAnimation}>
            <strong>LinkedIn:</strong> marshadn
          </h3>
          <h3 className="text-lg" style={typingAnimation}>
            <strong>Education:</strong> College of Engineering Trivandrum (MCA)
          </h3>
          
          <p className="text-gray-900 font-semibold mt-4">
            I am a passionate web developer dedicated to creating efficient, user-friendly web applications.
            My goal is to leverage the latest technologies and best practices to solve real-world problems
            and deliver impactful digital experiences.
          </p>
        </div>
      </div>

      {/* Global Keyframes inside a <style> tag */}
      <style>
        {`
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
          @keyframes blink {
            50% { border-color: transparent; }
          }
        `}
      </style>
    </div>
  );
}

const typingAnimation = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  borderRight: '3px solid var(--primary-color)',
  animation: 'typing 6s steps(20), blink 2s step-end', // Animates 3 times, then stops
};

export default About;
