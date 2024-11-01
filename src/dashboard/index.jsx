import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddNewInterview from '../components/custom/AddNewInterview';
import ATSScoreChecker from "../components/ResumeSkillMatcher.jsx";
import StageCard from '../components/StageCard';

const images = [
  "https://images.ctfassets.net/pdf29us7flmy/nFQzlQRFpWdpAaVgN1bUV/7b4dc7d3b728810c8194555f759e8e3d/motivational_interview_GettyImages-1142966869-red_.jpg",
  "https://images.pexels.com/photos/4344878/pexels-photo-4344878.jpeg?cs=srgb&dl=pexels-edmond-dantes-4344878.jpg&fm=jpg",
  "https://images.pexels.com/photos/4344677/pexels-photo-4344677.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

function Dashboard() {
  const [currentImage, setCurrentImage] = useState(0);

  // Slideshow functionality to change images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='p-10 items-center'>
      <h2 className='font-bold text-2xl text-primary font-sfpro flex justify-center mb-4'>Dashboard</h2>
      <h2 className='text-gray-500 font-semibold flex justify-center'>Create and Start Your Interview</h2>
      
      

      {/* Other Cards */}
     {/* Use flexbox for the two cards in a horizontal line */}
    <div className='flex my-5 mb-10 mt-10'>
      {/* First Half */}
      <div className='flex-1 flex justify-center items-center'>
        <AddNewInterview />
      </div>
      {/* Second Half */}
      <div className='flex-1 flex justify-center items-center'>
        <ATSScoreChecker />
      </div>
    </div>
      
      {/* Interview Stages Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5 border-primary rounded-sm">
        <StageCard 
          title="Realistic Experience" 
          description="Mock interviews that simulate real scenarios to keep you prepared and composed for the actual ones." 
          imageSrc="https://rolerootsconsultancy.com/wp-content/uploads/2024/07/80f8f19b9adf002c34951271dde53473_hero8-1024x576.jpg"
        />
        <StageCard 
          title="Discover your Strengths" 
          description="Receive constructive feedback from interviewers, enabling them to identify strengths and refine interview techniques." 
          imageSrc="https://b3649796.smushcdn.com/3649796/wp-content/uploads/2020/04/33-Common-Job-Interview-Questions-To-Help-You-Prepare-Your-Next-Interview-scaled.jpg?lossy=2&strip=1&webp=1s"
        />
        <StageCard 
          title="Sell Yourself Better" 
          description="Familiarity with the interview process reduces anxiety and nervousness, allowing you to perform better under pressure during actual interviews." 
          imageSrc="https://media.licdn.com/dms/image/D4E12AQEhm-rtuBhVNg/article-cover_image-shrink_600_2000/0/1720017628522?e=2147483647&v=beta&t=LZvEnBogQdNuljY1hiyfJW7tiAJZxoYIOJnglA2ZgTQ"
        />
        
      </div>
      {/* Large Overview Card with Slideshow */}
      <div className="max-w-5xl mx-auto my-8 p-8 bg-white shadow-lg rounded-lg border-2 border-transparent hover:border-primary transition-all duration-300 flex flex-col">
        
        {/* Card Content Container */}
        <div className="flex flex-row">
          {/* Left half - Text Content */}
          <div className="w-1/2 p-6 flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold text-primary mb-4">How to Use the Mock Interview Website</h3>
            <p className="text-gray-700 mb-2 text-center">
              1. <span className="font-bold">Add a New Interview</span> - Begin by selecting the type of job role and skills you want to be assessed on. This feature allows you to tailor your interview experience to your specific career goals.
            </p>
            <p className="text-gray-700 mb-2 text-center">
              2. <span className="font-bold">Check Your ATS Score</span> - Upload your resume and use the ATS Score Checker to evaluate your resume's compatibility with job requirements. This tool ensures your resume is optimized before interviews.
            </p>
            <p className="text-gray-700 mb-2 text-center">
              3. <span className="font-bold">Experience Realistic Mock Interviews</span> - Go through various interview stages that simulate real interview scenarios, complete with questions specific to your selected job role and skill level.
            </p>
            <p className="text-gray-700 mb-2 text-center">
              4. <span className="font-bold">Receive Constructive Feedback</span> - After completing each stage, receive detailed feedback to identify your strengths and areas for improvement, helping you perform better in actual interviews.
            </p>
          </div>

          {/* Right half - Image Slideshow */}
          <div className="w-1/2 relative flex justify-center items-center">
            <div
              className="w-full h-full rounded-lg bg-cover bg-center transition-all duration-1000"
              style={{
                backgroundImage: `url(${images[currentImage]})`,
              }}
            ></div>
          </div>
        </div>

        {/* Centered Button inside Card */}
        <div className="flex justify-center mt-4">
          <Link to="/ask">
            <button className="py-2 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-blue-900 transition duration-300 border-2 border-transparent hover:border-primary duration-500">
              Do you Have Any Questions?  Then Click here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
