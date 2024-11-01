import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-200 text-black p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo and Company Name */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">InterviewHub</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 text-center">
          <a href="/about" className=" font-semibold hover:text-primary transition-colors duration-200">About Us</a>
          <a href="/pricing" className="font-semibold hover:text-primary transition-colors duration-200">Pricing</a>
          <a href="/privacy" className="font-semibold hover:text-primary transition-colors duration-200">Privacy Policy</a>
          <a href="/terms" className="font-semibold hover:text-primary transition-colors duration-200">Terms of Service</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl hover:text-primary transition-colors duration-200" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-primary transition-colors duration-200" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-primary transition-colors duration-200" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-primary transition-colors duration-200" />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} InterviewHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
