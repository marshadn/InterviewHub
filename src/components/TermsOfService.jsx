// import React from 'react';

function TermsOfService() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      
      {/* Main Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl hover:border-primary transition duration-300 border-2 border-transparent p-6">
        
        {/* Terms of Service Heading */}
        <h1 className="text-primary text-3xl font-bold mb-6 text-center" >
          Terms of Service
        </h1>
        
        {/* Terms Content */}
        <div className="p-6">
          <h2 className="text-primary text-2xl font-bold mb-2" style={typingAnimation}>
            Acceptance of Terms
          </h2>
          <p className="text-gray-900 mt-2">
            By accessing or using our service, you agree to be bound by these Terms of Service and all applicable laws. If you disagree, please refrain from using our service.
          </p>

          <h2 className="text-primary text-2xl font-bold mt-6 mb-2" style={typingAnimation}>
            Service Usage
          </h2>
          <p className="text-gray-900 mt-2">
            Our services are provided for personal and non-commercial use only. You agree not to misuse the service, including, but not limited to, unauthorized access or disruption of our systems.
          </p>

          <h2 className="text-primary text-2xl font-bold mt-6 mb-2" style={typingAnimation}>
            Intellectual Property
          </h2>
          <p className="text-gray-900 mt-2">
            All content on this site, including text, graphics, and logos, is our property or the property of our licensors. Unauthorized use of any materials on our site is prohibited.
          </p>
          
          <h2 className="text-primary text-2xl font-bold mt-6 mb-2" style={typingAnimation}>
            Limitation of Liability
          </h2>
          <p className="text-gray-900 mt-2">
            We are not liable for any damages resulting from your use of the service or your inability to access the service. This includes any direct, indirect, or incidental damages.
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

export default TermsOfService;
