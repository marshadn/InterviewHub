import { Outlet, Navigate,useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";
import Footer from "./components/custom/Footer";

function App() {
  const { isLoaded, isSignedIn } = useUser();
    const location = useLocation(); // Get the current location
  // Redirect to sign-in if the user is not signed in
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <>
      {location.pathname !== '/' && <Header />}
     
      <Outlet /> {/* This will render the child routes, like Dashboard */}
       <Footer/>
    </>
  );
}

export default App;
