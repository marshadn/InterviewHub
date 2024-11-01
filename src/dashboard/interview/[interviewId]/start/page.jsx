"use client";
import { useEffect, useState, useRef } from "react"; // Import useState and useRef
import { Link, useParams } from "react-router-dom"; // Import useParams to get interviewId
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./components/QuestionsSection";
import RecordAnswerSection from "./components/RecordAnswerSection";
import { Button } from "../../../../components/ui/button";

function Start() {
  const { interviewId } = useParams(); // Get interviewId from the URL
  const [interviewData, setInterviewData] = useState(); // State to store interview data
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(); // State to store interview data
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  
  const mediaStreamRef = useRef(null); // Create a reference to store the media stream

  // Function to fetch interview details by mockId/interviewId
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
    const jsonMockResp = JSON.parse(result[0]?.jsonMockResp || "[]"); // Avoid error by setting default
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  // Fetch interview details when the component mounts
  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails(); // Fetch details only if interviewId is available
    }
  }, [interviewId]); // Add interviewId as a dependency

  // Function to stop the webcam stream
  const stopWebcamStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null; // Clear the reference
    }
  };

  return (
    <div className="relative min-h-screen"> {/* Added relative positioning */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          stopStream={stopWebcamStream} // Pass the stop function
        />
      </div>
      <div className="fixed bottom-0 right-0 p-7 flex justify-end gap-6 bg-white w-full"> {/* Fixed button container */}
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link to={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
            <Button onClick={stopWebcamStream}>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Start;

