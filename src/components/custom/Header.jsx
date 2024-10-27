import { useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { FaSun, FaMoon, FaLaptop } from 'react-icons/fa'; // Importing FontAwesome icons

function Header() {
  const { user, isSignedIn } = useUser();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-md dark:bg-gray-800 bg-white dark:text-gray-100">
      {/* Logo and Title */}
      <div className="flex items-center gap-2 text-primary">
        <FaLaptop className="text-2xl" /> {/* Computer Icon */}
        <h1 className="text-2xl font-bold font-sfpro">InterviewHub</h1> {/* Single heading */}
      </div>

      {/* Centered Navigation */}
      <div className="flex flex-grow justify-center gap-8">
        <Link to="/dashboard" className="font-bold text-primary hover:text-gray-600 transition-transform duration-200 transform hover:scale-105 font-sfpro">Dashboard</Link>
        <Link to="/faqs" className="font-bold text-primary hover:text-gray-600 transition-transform duration-200 transform hover:scale-105 font-sfpro">FAQs</Link>
        <Link to="/pricing" className="font-bold sfpro text-primary hover:text-gray-600 transition-transform duration-200 transform hover:scale-105">Pricing</Link>
        <Link to="/how-it-works" className=" font-sfpro font-bold text-primary hover:text-gray-600 transition-transform duration-200 transform hover:scale-105">How it works</Link>
      </div>

      {/* User Button and Dark Mode Toggle */}
      <div className="flex gap-4 items-center">
        {/* Dark Mode Toggle Icon */}
        <button onClick={toggleDarkMode} className="text-xl">
          {darkMode ? <FaSun className="text-gray-400" /> : <FaMoon className="text-gray-300" />}
        </button>

        {isSignedIn ? (
          <div className="flex gap-2 items-center">
            <UserButton />
          </div>
        ) : (
          <Link to="/auth/sign-in">
            <Button className="dark:bg-gray-700 dark:text-white">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;







// import { useState } from 'react';
// import { useUser } from "@clerk/clerk-react";
// import { Button } from "../ui/button";
// import { Link } from "react-router-dom";
// import { UserButton } from "@clerk/clerk-react";
// import { FaSun, FaMoon ,FaLaptop} from 'react-icons/fa'; // Importing FontAwesome icons

// function Header() {
//   const { user, isSignedIn } = useUser();
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   return (
//     <div className="p-3 px-5 flex justify-between items-center shadow-md dark:bg-gray-800 bg-white dark:text-gray-100">
//       {/* Logo */}
//       {/* <img src="/mylogo.png" width={100} height={100} alt="Logo" /> */}
//        <div className="flex items-center gap-2">
//         <FaLaptop className="text-2xl" /> {/* Computer Icon */}
//         <h1 className="text-2xl font-bold s">InterviewHub</h1>
//       </div>

//       <div className="flex gap-4 items-center">
//         {/* Dark Mode Toggle Icon */}
//         <button onClick={toggleDarkMode} className="text-xl">
//           {darkMode ? <FaSun className="text-grey-400" /> : <FaMoon className="text-grey-300" />}
//         </button>

//         {isSignedIn ? (
//           <div className="flex gap-2 items-center">
//             <Link to={"/dashboard"}>
//               <Button variant="outline" className="dark:border-gray-500 dark:text-gray-200">Dashboard</Button>
//             </Link>
//             <UserButton />
//           </div>
//         ) : (
//           <Link to={"/auth/sign-in"}>
//             <Button className="dark:bg-gray-700 dark:text-white">Get Started</Button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Header;








// // // import React from 'react'
// // import { useUser } from "@clerk/clerk-react";
// // import { Button } from "../ui/button";
// // import { Link } from "react-router-dom";
// // import { UserButton } from "@clerk/clerk-react";

// // function Header() {
// //   const { user, isSignedIn } = useUser();
// //   return (
// //     <div className="p-3 px-5 flex justify-between shadow-md gap-2">
// //       <img src="/mylogo.png" width={100} height={100} />
      

// //       {isSignedIn ? (
// //         <div className="flex gap-2 items-center">
// //           <Link to={"/dashboard"}>
// //             <Button variant="outline">Dashboard</Button>
// //           </Link>
// //           <UserButton />
// //         </div>
// //       ) : (
// //         <Link to={"/auth/sign-in"}>
// //           <Button>Get Started</Button>
// //         </Link>
// //       )}
// //     </div>
// //   );
// // }

// // export default Header;
