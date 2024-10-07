import { useState } from "react";
import "./App.css";
// import { Button } from "./components/ui/button.jsx"; // Ensure the path matches the actual structure
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";


function App() {
  const [count, setCount] = useState(0);
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/sign-in'} /> 
  }
  return (
    <>
      <Header/>
     <Outlet/>   
    </>
  );
}

export default App;
