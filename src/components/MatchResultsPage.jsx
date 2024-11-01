import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown"; // Install using npm install react-markdown
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

function MatchResults() {
  const location = useLocation();
  const { matchResults } = location.state || { matchResults: "No results found." };

  // Clean up unwanted symbols like # or numbers from the response text
  const cleanedText = matchResults
    .replace(/[#0-9]+\s+/g, "") // Remove any leading # or numbers with spaces
    .trim();

  const [displayText, setDisplayText] = useState("");

  // Extract match percentage if present
  const matchPercentage = cleanedText.match(/(\d+)%/);
  const percentageValue = matchPercentage ? parseInt(matchPercentage[1], 10) : null;

  // Determine color based on percentage value
  const getPercentageColor = () => {
    if (percentageValue >= 75) return "text-green-600"; // High percentage - Green
    if (percentageValue >= 50) return "text-yellow-500"; // Moderate percentage - Yellow
    return "text-red-500"; // Low percentage - Red
  };

  // Typing effect animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(cleanedText.slice(0, index));
      index++;
      if (index > cleanedText.length) clearInterval(interval);
    }, 2); // Faster typing speed (25ms per character)
    return () => clearInterval(interval);
  }, [cleanedText]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-12">
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg border border-transparent hover:border-primary hover:shadow-[0_0_15px] hover:shadow-primary transition-all duration-300">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">Match Results</h1>
        <div className="prose prose-lg text-left leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ node, ...props }) => (
                <h2 className="text-primary font-bold mt-8 mb-4" {...props} />
              ),
              p: ({ node, children, ...props }) => {
                const text = children[0];
                if (
                  typeof text === "string" &&
                  (text.includes("Resume Skills vs. Job Description: Match Analysis") ||
                   text.includes("Analysis") ||
                   text.includes("Suggestions"))
                ) {
                  return (
                    <p className="text-primary font-bold mt-6 mb-2" {...props}>
                      {children}
                    </p>
                  );
                }
                if (typeof text === "string" && text.includes("Match Percentage")) {
                  return (
                    <p className={`font-bold ${getPercentageColor()}`} {...props}>
                      {text}
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
          >
            {displayText}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default MatchResults;
