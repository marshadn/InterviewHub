// import React from 'react';

function Privacy() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      
      {/* Main Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl hover:border-primary transition duration-300 border-2 border-transparent p-6">
        
        {/* Privacy Policy Heading */}
        <h1 className="text-primary text-3xl font-bold mb-6 text-center" >
          Privacy Policy
        </h1>
        
        {/* Privacy Content */}
        <div className="p-6">
          <h2 className="text-primary text-2xl font-bold mb-2" style={typingAnimation}>
            Data Collection
          </h2>
          <p className="text-gray-900 mt-2">
            We value your privacy and collect only the data necessary to enhance your experience. Your personal information is stored securely and is not shared with any third parties.
          </p>

          <h2 className="text-primary text-2xl font-bold mt-6 mb-2" style={typingAnimation}>
            Use of Data
          </h2>
          <p className="text-gray-900 mt-2">
            Information collected is solely used to provide and improve our services. We do not sell or disclose any information without your consent.
          </p>

          <h2 className="text-primary text-2xl font-bold mt-6 mb-2" style={typingAnimation}>
            Cookies and Tracking
          </h2>
          <p className="text-gray-900 mt-2">
            Our website uses cookies to provide a personalized experience. You can opt out of cookies in your browser settings, though some features may not work as intended.
          </p>
          
          <h2 className="text-primary text-2xl font-bold mt-6 mb-2" style={typingAnimation}>
            Contact Us
          </h2>
          <p className="text-gray-900 mt-2">
            For any questions regarding our privacy practices, feel free to reach out to us.
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
  animation: 'typing 3s steps(20), blink 0.75s step-end', // Animates 3 times, no infinite
};

export default Privacy;
