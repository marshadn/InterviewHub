import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "./ui/button"; // Adjust path if needed
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function AskQns() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const googleApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  async function generateAnswer() {
    setAnswer(""); // Clear previous answer immediately
    setDisplayedAnswer("");
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${googleApiKey}`,
        {
          contents: [
            { parts: [{ text: question }] },
          ],
        }
      );

      let answerText = response.data.candidates[0].content.parts[0].text;
      answerText = answerText
        .replace(/[#0-9]+\s+/g, "") // Remove unwanted symbols
        .trim();

      setAnswer(answerText);
    } catch (error) {
      setAnswer("Failed to get response. Try again.");
    } finally {
      setIsLoading(false); // Set loading to false after request completes
    }
  }

  // Typing effect for answer
  useEffect(() => {
    if (answer) {
      let index = 0;
      setDisplayedAnswer("");
      const typingInterval = setInterval(() => {
        setDisplayedAnswer((prev) => prev + answer[index]);
        index++;
        if (index === answer.length) clearInterval(typingInterval);
      }, 2); // Speed of typing animation
      return () => clearInterval(typingInterval);
    }
  }, [answer]);

    return (
      <div className=' bg-gray-100 min-h-screen'>
    <div className="flex items-center justify-center pt-20  ">
      <div className="max-w-3xl w-full p-4 bg-white rounded-lg shadow-lg border border-transparent hover:border-primary hover:shadow-[0_0_15px] hover:shadow-primary transition-all duration-300 ">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">Ask Questions</h1>
        <textarea
          className="border rounded w-full p-2 my-2"
          placeholder="Ask me anything?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows="6"
        ></textarea>
        <div className="flex space-x-4 justify-center">
          <Button onClick={generateAnswer} className="bg-primary text-white hover:bg-blue-800 transition-colors duration-200">
            Generate Answer
          </Button>
          <Button onClick={() => { setQuestion(""); setAnswer(""); setDisplayedAnswer(""); }} className="bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-200 ">
            Reset
          </Button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center mt-4">
            {/* Loading Spinner */}
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          displayedAnswer && (
            <div className="prose prose-lg text-left leading-relaxed bg-gray-100 p-4 mt-4 rounded border border-gray-300 max-w-full shadow-md overflow-wrap break-words">
              <ReactMarkdown
                children={displayedAnswer}
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ node, ...props }) => (
                    <h2 className="text-primary font-bold mt-8 mb-4" {...props} />
                  ),
                  p: ({ node, children, ...props }) => {
                    const text = children[0];
                    if (
                      typeof text === "string" &&
                      (text.includes("Answer") || text.includes("Analysis") || text.includes("Suggestions"))
                    ) {
                      return (
                        <p className="text-primary font-bold mt-6 mb-2" {...props}>
                          {children}
                        </p>
                      );
                    }
                    return <p className="mb-4" {...props}>{children}</p>;
                  },
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc ml-5 mb-4" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-2" {...props} />
                  ),
                }}
              />
            </div>
          )
        )}
      </div>
            </div>
            </div>
  );
}

export default AskQns;
