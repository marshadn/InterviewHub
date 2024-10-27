// "use client";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { db } from "../../../../utils/db";
// import { MockInterview } from "../../../../utils/schema";
// import { eq } from "drizzle-orm";
// import { useState } from "react";
// import { Button } from "../../../components/ui/button";
// import { Link } from "react-router-dom";

// function Interview() {
//   const { interviewId } = useParams(); // Get interviewId from the URL
//   const [interviewData, setInterviewData] = useState();
//   // Function to fetch interview details by mockId/interviewId
//   const GetInterviewDetails = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, interviewId)); // Correctly passing interviewId

//     setInterviewData(result[0]);
//   };

//   // Call GetInterviewDetails when interviewId changes
//   useEffect(() => {
//     console.log(interviewId); // Log the interviewId for debugging
//     if (interviewId) {
//       GetInterviewDetails(); // Fetch details only if interviewId is available
//     }
//   }, [interviewId]); // Add interviewId as a dependency to trigger re-fetching

//   return (
//     <div className="my-10 ">
//       <h2 className="font-bold text-2xl flex justify-center flex-col items-center ">
//         Let's Get started
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div className="flex flex-col my-5 gap-5 ">
//           <div className="flex flex-col p-5 rounded-lg border gap-5">
//             <h2 className="text-lg">
//               <strong>Job Role/Job Position:</strong>{" "}
//               {interviewData ? interviewData.jobPosition : "Loading..."}
//             </h2>
//             <h2 className="text-lg">
//               <strong>Job Description/Tech Stack:</strong>{" "}
//               {interviewData ? interviewData.jobDesc : "Loading..."}
//             </h2>
//             <h2 className="text-lg">
//               <strong>Years of Experience:</strong>{" "}
//               {interviewData ? interviewData.jobExperience : "Loading..."}
//             </h2>
//           </div>
//         </div>
//         <div>
//           <h3 className="h-72 w-full  my-7 p20 bg-secondary text-center rounded ">
//             webcam icon here
//           </h3>
//           <Button variant="ghost" className="w-full">
//             Enable webcam and Microphone
//           </Button>
//         </div>
//       </div>
//       <div className="flex justify-end items-end p-3">
//         <Link to={"/dashboard/interview/" + interviewId + "/start"}>
//           <Button>Start Interview</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Interview;


"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam"; // Importing the webcam library
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { FaLightbulb, FaCamera } from "react-icons/fa"; // Importing the bulb and camera icons

function Interview() {
  const { interviewId } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false); // Webcam toggle state

  // Function to fetch interview details by mockId/interviewId
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    setInterviewData(result[0]);
  };

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const toggleWebcam = () => {
    setIsWebcamEnabled(!isWebcamEnabled);
  };

  return (
    <div className="my-10 p-5 max-w-4xl mx-auto bg-white rounded-lg shadow-lg hover:border-primary transition-colors duration-200">
      <h2 className="font-bold text-3xl text-center mb-5">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Reduced gap between cards */}
        {/* Left Side Cards */}
        <div className="flex flex-col gap-4"> {/* Reduced gap between left cards */}
          {/* Interview Details Card */}
          <div className="flex flex-col gap-5 p-5 border rounded-lg shadow-sm bg-gray-100 hover:border-primary transition-colors duration-200">
            <h2 className="text-lg">
              <strong>Job Role/Position:</strong>{" "}
              {interviewData ? interviewData.jobPosition : "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>{" "}
              {interviewData ? interviewData.jobDesc : "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>{" "}
              {interviewData ? interviewData.jobExperience : "Loading..."}
            </h2>
          </div>

          {/* Information Card */}
          <div className="flex flex-col gap-5 p-5 border rounded-lg shadow-sm bg-light-yellow-100 hover:border-primary transition-colors duration-200">
            <div className="flex items-center">
              <FaLightbulb className="text-3xl text-yellow-500 mr-2" />
              <h3 className="text-xl font-semibold">Information</h3>
            </div>
            <p className="text-gray-700">
              Enable webcam and Microphone to start your AI-driven mock interview. It has a set of questions which you can answer, and at the last, you will get the report on the basis of your answers. 
              <br />
              <br />
              <strong>NOTE:</strong> We never recorded your video; you can disable webcam access at any time you want.
            </p>
          </div>
        </div>

        {/* Webcam Card */}
        <div className="flex flex-col gap-5 p-5 border rounded-lg shadow-sm bg-gray-100 hover:border-primary transition-colors duration-200">
          <div className="flex items-center justify-between">
            <FaCamera className="text-3xl text-blue-500 mr-2" />
            <Button onClick={toggleWebcam} variant="ghost" className="w-full">
              {isWebcamEnabled ? "Disable Webcam and Microphone" : "Enable Webcam and Microphone"}
            </Button>
          </div>
          {isWebcamEnabled ? (
            <Webcam
              className="rounded-lg border shadow-lg"
              videoConstraints={{ facingMode: "user" }}
              width="100%"
              height="auto" // Change height to auto to reduce the card size
            />
          ) : (
            <div className="h-48 w-full flex items-center justify-center bg-gray-200 rounded-lg border"> {/* Reduced height of webcam placeholder */}
              <span className="text-gray-500">Webcam is off</span>
            </div>
          )}
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="flex justify-end mt-8">
        <Link to={`/dashboard/interview/${interviewId}/start`}>
          <Button className="px-6 py-3">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;





