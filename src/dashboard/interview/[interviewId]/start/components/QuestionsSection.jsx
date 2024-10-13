import { Volume2 } from "lucide-react";
import { useState } from "react";

function QuestionsSection({ mockInterviewQuestion = [], activeQuestionIndex }) {
  const textToSpeach = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support speech synthesis");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(mockInterviewQuestion) &&
          mockInterviewQuestion.length > 0 ? (
            mockInterviewQuestion.map((question, index) => (
              <h2
                className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex === index ? "bg-primary text-primary" : ""
                }`}
                key={index}
              >
                Question #{index + 1}
              </h2>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
          <Volume2
            className="cursor-pointer"
            onClick={() =>
              textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          />
        </h2>
      </div>
    )
  );
}

export default QuestionsSection;
