import { useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/GeminiAIModel";
import { db } from "../../../../../../utils/db";
import { userAnswer } from "../../../../../../utils/schema"; // Make sure this is the correct table import
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswerState, setUserAnswerState] = useState(""); // Renaming state to avoid conflict with table name
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText, setResults } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswerState((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

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
    <div className="flex items-center flex-col">
      <Button variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button onClick={updateUserAnswer} disabled={loading}>
        {loading ? "Saving..." : "Submit Answer"}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;




// import { useEffect, useState  } from "react";
// import { Button } from "../../../../../components/ui/button";
// import useSpeechToText from "react-hook-speech-to-text";
// import { Mic } from "lucide-react";
// import { toast } from "sonner";
// import { chatSession } from "../../../../../../utils/GeminiAIModel";
// import { db } from "../../../../../../utils/db";
// import { userAnswer } from "../../../../../../utils/schema";
// import { useUser } from "@clerk/clerk-react";
// import moment from "moment";


// function RecordAnswerSection(
//   mockInterviewQuestion,
//   activeQuestionIndex,
//   interviewData
// ) {
//   const [userAnswer, setUserAnswer] = useState("");
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   useEffect(() => {
//     results.map((result) =>
//       setUserAnswer((prevAns) => prevAns + result?.transcript)
//     );
//   }, [results]);

//   useEffect(() => {
//     if (!isRecording && userAnswer.length > 10) {
//       updateUserAnswer();
//     }
//     //  if (userAnswer?.length < 10) {
//     //     setLoading(false);
//     //     toast("Error while saving your answer! Record again!");
//     //     return;
//     //   }
//   },[userAnswer])

//   const StartStopRecording = async () => {
//     if (isRecording) {
     
//       stopSpeechToText();
     

      
//     } else {
//       startSpeechToText();
//     }
//   };
//   const updateUserAnswer = async () => {
//     console.log(userAnswer);
//      setLoading(true);
//     const feedbackPrompt = 
//         "Question:" +
//         mockInterviewQuestion[activeQuestionIndex]?.question +
//         ", User Answer: " +
//         userAnswer +
//         ". Based on the question and user's answer, please provide a rating and feedback (3-5 lines) in JSON format with fields 'rating' and 'feedback'.";

//       const result = await chatSession.sendMessage(feedbackPrompt);

//       const mockJsonResp = result.response
//         .text()
//         .replace("```json", "")
//         .replace("```", "");

//       console.log(mockJsonResp);

//       const JsonFeedbackResp = JSON.parse(mockJsonResp);

//       const resp = await db.insert('UserAnswer').values({
//         mockIdRef: interviewData?.mockId,
//         question: mockInterviewQuestion[activeQuestionIndex]?.question,
//         correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//         userAns: userAnswer,
//         feedback: JsonFeedbackResp?.feedback,
//         rating: JsonFeedbackResp?.rating,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//         createdAt:moment().format("DD-MM-yyyy"),
//       })
      
//       if (resp) {
//         toast('User Answer Recorded Succesfully!')
//         setUserAnswer('');
//         setResults([]);
//       }
//       // setUserAnswer('');
//       setResults([]);
//       setLoading(false);
//   }

//   return (
//     <div className="flex items-center flex-col">
//       <Button variant="outline" className="my-10" onClick={StartStopRecording}>
//         {isRecording ? (
//           <h2 className="text-red-600 flex gap-2">
//             <Mic />
//             Stop Recording
//           </h2>
//         ) : (
//           "Record Answer"
//         )}
//       </Button>
//       <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
//     </div>
//   );
// }

// export default RecordAnswerSection;
