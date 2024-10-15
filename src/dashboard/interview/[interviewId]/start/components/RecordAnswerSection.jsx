import { useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/GeminiAIModel";
import { db } from "../../../../../../utils/db";

function RecordAnswerSection(
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData
) {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        toast("Error while saving your answer! Record again!");
        return;
      }

      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer: " +
        userAnswer +
        ". Based on the question and user's answer, please provide a rating and feedback (3-5 lines) in JSON format with fields 'rating' and 'feedback'.";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      console.log(mockJsonResp);

      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      // const resp = await db.insert('UserAnswer').values({
      //   mockIdRef: interviewData?.mockId,
      //   question:
      // })
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex items-center flex-col">
      <Button variant="outline" className="my-10" onClick={saveUserAnswer}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
}

export default RecordAnswerSection;
