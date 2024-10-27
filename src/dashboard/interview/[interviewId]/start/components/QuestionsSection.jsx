// import { Volume2 } from "lucide-react";
// import { useState } from "react";

// function QuestionsSection({ mockInterviewQuestion = [], activeQuestionIndex }) {
//   const textToSpeach = (text) => {
//     if ("speechSynthesis" in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(speech);
//     } else {
//       alert("Your browser does not support speech synthesis");
//     }
//   };

//   return (
//     mockInterviewQuestion && (
//       <div className="p-5 border rounded-lg my-10">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {Array.isArray(mockInterviewQuestion) &&
//           mockInterviewQuestion.length > 0 ? (
//             mockInterviewQuestion.map((question, index) => (
//               <h2
//                 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
//                   activeQuestionIndex === index ? "bg-primary text-primary" : ""
//                 }`}
//                 key={index}
//               >
//                 Question #{index + 1}
//               </h2>
//             ))
//           ) : (
//             <p>No questions available.</p>
//           )}
//         </div>
//         <h2 className="my-5 text-md md:text-lg">
//           {mockInterviewQuestion[activeQuestionIndex]?.question}
//           <Volume2
//             className="cursor-pointer"
//             onClick={() =>
//               textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)
//             }
//           />
//         </h2>
//       </div>
//     )
//   );
// }

// export default QuestionsSection;


import { Volume2 } from "lucide-react";
import { FaRegLightbulb } from "react-icons/fa"; // Import the light bulb icon
import { useEffect } from "react"; // Import useEffect to handle speech synthesis correctly

function QuestionsSection({ mockInterviewQuestion = [], activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support speech synthesis");
    }
  };

  // Fixing the text-to-speech functionality
  useEffect(() => {
    if (mockInterviewQuestion.length > 0) {
      const questionText = mockInterviewQuestion[activeQuestionIndex]?.question;
      if (questionText) {
        const speech = new SpeechSynthesisUtterance(questionText);
        speech.onend = () => console.log('Speech has finished');
        window.speechSynthesis.speak(speech);
      }
    }
  }, [activeQuestionIndex, mockInterviewQuestion]);

  return (
    <div className="my-10 mx-4"> {/* Added horizontal margin */}
      {/* Question Card */}
      <div className="p-5 border rounded-lg transition-all duration-300 hover:border-primary hover:shadow-lg"> {/* Added hover effect */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(mockInterviewQuestion) && mockInterviewQuestion.length > 0 ? (
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
        <h2 className="my-5 text-md md:text-lg flex items-center">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
          <Volume2
            className="cursor-pointer ml-2" // Added margin-left for spacing
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          />
        </h2>
      </div>

      {/* Note Section */}
      <div className="flex items-start p-4 mt-5 border rounded-lg bg-blue-100 transition-all duration-300 hover:border-primary hover:shadow-lg"> {/* Added hover effect */}
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
