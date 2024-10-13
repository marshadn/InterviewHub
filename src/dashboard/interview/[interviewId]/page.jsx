"use client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";

function Interview() {
  const { interviewId } = useParams(); // Get interviewId from the URL
  const [interviewData, setInterviewData] = useState();
  // Function to fetch interview details by mockId/interviewId
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId)); // Correctly passing interviewId

    setInterviewData(result[0]);
  };

  // Call GetInterviewDetails when interviewId changes
  useEffect(() => {
    console.log(interviewId); // Log the interviewId for debugging
    if (interviewId) {
      GetInterviewDetails(); // Fetch details only if interviewId is available
    }
  }, [interviewId]); // Add interviewId as a dependency to trigger re-fetching

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl flex justify-center flex-col items-center ">
        Let's Get started
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>{" "}
              {interviewData ? interviewData.jobPosition : "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>{" "}
              {interviewData ? interviewData.jobDesc : "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>{" "}
              {interviewData ? interviewData.jobExperience : "Loading..."}
            </h2>
          </div>
        </div>
        <div>
          <h3 className="h-72 w-full  my-7 p20 bg-secondary text-center rounded ">
            webcam icon here
          </h3>
          <Button variant="ghost" className="w-full">
            Enable webcam and Microphone
          </Button>
        </div>
      </div>
      <div className="flex justify-end items-end p-3">
        <Link to={"/dashboard/interview/" + interviewId + "/start"}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
