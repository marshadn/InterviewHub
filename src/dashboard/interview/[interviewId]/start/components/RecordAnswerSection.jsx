import { useEffect, useState, useRef } from "react"; // Import useRef
import { Button } from "../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react"; // Import additional icon for stop recording
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/GeminiAIModel";
import { db } from "../../../../../../utils/db";
import { userAnswer } from "../../../../../../utils/schema"; // Make sure this is the correct table import
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData, stopStream }) {
  const [userAnswerState, setUserAnswerState] = useState(""); // Renaming state to avoid conflict with table name
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText, setResults } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  
  const videoRef = useRef(null); // Create a reference for the video element
  const mediaStreamRef = useRef(null); // Create a reference for the media stream

  useEffect(() => {
    // Function to start webcam
    const startWebcam = async () => {
      try {
        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStreamRef.current;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
        toast("Unable to access the webcam.");
      }
    };

    startWebcam(); // Call the function to start the webcam

    results.map((result) =>
      setUserAnswerState((prevAns) => prevAns + result?.transcript)
    );

    return () => {
      stopStream(); // Call stopStream when the component unmounts
    };
  }, [results, stopStream]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    try {
      console.log(userAnswerState);
      setLoading(true);
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer: " +
        userAnswerState +
        ". Based on the question and user's answer, please provide a rating and feedback (3-5 lines) in JSON format with fields 'rating' and 'feedback'.";

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      console.log(mockJsonResp);

      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(userAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswerState,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast('User Answer Recorded Successfully!');
        setUserAnswerState(''); // Clear the recorded answer
        setResults([]); // Clear the results
      }

    } catch (error) {
      console.error("Error inserting user answer:", error);
      toast("Error while saving your answer! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col mt-4"> {/* Add margin-top to move away from header */}
      {/* Webcam video feed with rounded borders and shadow */}
      <video
        ref={videoRef}
        className="mb-4 rounded-lg shadow-md border-2 border-gray-300"
        width="320"
        height="240"
        autoPlay
        muted
      />
      <div className="flex space-x-4"> {/* Align buttons horizontally with space in between */}
        <Button
          variant="outline"
          className="my-2 w-full max-w-xs flex items-center justify-center gap-2"
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <>
              <StopCircle className="text-red-600" /> {/* Icon for stop recording */}
              <span className="text-red-600">Stop Recording</span>
            </>
          ) : (
            <>
              <Mic className="text-green-600" /> {/* Mic icon for record */}
              <span>Record Answer</span>
            </>
          )}
        </Button>
        <Button
          onClick={updateUserAnswer}
          disabled={loading}
          className="my-2 w-full max-w-xs"
        >
          {loading ? "Saving..." : "Submit Answer"}
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;







