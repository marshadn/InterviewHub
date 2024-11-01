import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/sign-in/index.jsx";
import Home from "./home/index.jsx";
import Dashboard from "./dashboard/index.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Interview from "./dashboard/interview/[interviewId]/page.jsx";
import Start from "./dashboard/interview/[interviewId]/start/page.jsx";
import Feedback from "./dashboard/interview/[interviewId]/feedback/page.jsx";
import FAQs from './components/FAQs.jsx';
import Price from './components/Price.jsx';
import HowItWorks from './components/HowItWorks';
import ATSScoreChecker from "./components/ResumeSkillMatcher.jsx";
import MatchResults from "./components/MatchResultsPage.jsx";
import AskQns from "./components/AskQuestions.jsx";
import About from "./components/About.jsx";
import Privacy from "./components/Privacy.jsx";
import TermsOfService from "./components/TermsOfService.jsx";


 
// Update this path based on your folder structure


// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Add Google Fonts link dynamically
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/interview/:interviewId",
        element: <Interview />,
      },
      {
        path: "/dashboard/interview/:interviewId/start",
        element: <Start />,
      },
      {
        path: "/dashboard/interview/:interviewId/feedback", // Add feedback route
        element: <Feedback />,
      },
       {
        path: "/faqs", // Updated to match the Header link
        element: <FAQs />, // Ensure this component is imported correctly
      },
      {
        path: "/pricing", // Updated to match the Header link
        element: <Price />, // Ensure this component is imported correctly
      },
      {
        path: "/how-it-works", // Updated to match the Header link
        element: <HowItWorks />, // Ensure this component is imported correctly
      },
      {
        path: "/resume",
        element:<ATSScoreChecker />,
      },
      {
        path:"/match-results",
        element:< MatchResults />,
      },
       {
        path:"/ask",
        element:< AskQns />,
      },
         {
        path:"/about",
        element:< About />,
      },
           {
        path:"/privacy",
        element:< Privacy />,
      },
              {
        path:"/terms",
        element:< TermsOfService />,
      },
    
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in", 
    element: <SignInPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
