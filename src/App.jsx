import { useState } from "react";
import "./App.css";
// import { Button } from "./components/ui/button.jsx"; // Ensure the path matches the actual structure
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";


function App() {
  const [count, setCount] = useState(0);
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/sign-in'} /> 
  }
  return (
    <>
      
     <Outlet/>   
    </>
  );
}

export default App;
