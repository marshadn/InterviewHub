

import { Volume2 } from "lucide-react";
import { FaRegLightbulb } from "react-icons/fa";

function QuestionsSection({ mockInterviewQuestion = [], activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech before starting a new one
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support speech synthesis");
    }
  };

  return (
    <div className="my-10 mx-4">
      {/* Question Card */}
      <div className="p-5 border rounded-lg relative transition-all duration-300 hover:border-primary hover:shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(mockInterviewQuestion) && mockInterviewQuestion.length > 0 ? (
            mockInterviewQuestion.map((_, index) => (
              <h2
                className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex === index ? "bg-primary text-white" : "bg-secondary"
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
          {mockInterviewQuestion[activeQuestionIndex]?.question || "No question available"}
        </h2>
        <Volume2
          className="absolute bottom-4 right-4 cursor-pointer text-gray-500 hover:text-primary"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question || "")
          }
        />
      </div>

      {/* Note Section */}
      <div className="flex items-start p-4 mt-5 border rounded-lg bg-blue-100 transition-all duration-300 hover:border-primary hover:shadow-lg">
        <FaRegLightbulb className="text-yellow-500 text-2xl mr-2" />
        <div>
          <h3 className="text-lg font-semibold">Note:</h3>
          <p className="text-sm text-gray-700">
            Click on record answer when you want to answer the question. At the end of the interview, we will give you feedback along with the correct answer for each question and your answer to compare it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuestionsSection;
