import { useUser } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { FaLaptop } from 'react-icons/fa';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-3 px-5 flex flex-col sm:flex-row justify-between items-center shadow-sm bg-white text-gray-800">
      {/* Logo and Title */}
      <div className="flex items-center gap-2 text-primary mb-3 sm:mb-0">
        <FaLaptop className="text-2xl" /> 
        <h1 className="text-2xl font-bold">InterviewHub</h1>
      </div>

      {/* Centered Navigation */}
      <div className="flex flex-col sm:flex-row flex-grow justify-center items-center gap-4 sm:gap-8">
        <Link to="/dashboard" className="text-gray-800 hover:text-primary font-semibold transition-transform duration-200 transform hover:scale-105">
          Dashboard
        </Link>
        <Link to="/faqs" className="text-gray-800 hover:text-primary font-semibold transition-transform duration-200 transform hover:scale-105">
          FAQs
        </Link>
        <Link to="/ask" className="text-gray-800 hover:text-primary font-semibold transition-transform duration-200 transform hover:scale-105">
          Ask Questions?
        </Link>
        <Link to="/how-it-works" className="text-gray-800 hover:text-primary font-semibold transition-transform duration-200 transform hover:scale-105">
          How it works
        </Link>
      </div>

      {/* User Button */}
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link to="/auth/sign-in">
            <Button className="bg-primary text-white">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;


