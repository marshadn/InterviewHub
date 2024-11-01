
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "../../utils/GeminiAIModel";
import { useNavigate } from "react-router-dom";

function ATSScoreChecker() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeContent, setResumeContent] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const LoaderCircle = () => (
    <div
      style={{
        border: "4px solid #f3f3f3",
        borderRadius: "50%",
        borderTop: "4px solid #3498db",
        width: "24px",
        height: "24px",
        animation: "spin 2s linear infinite",
      }}
    ></div>
  );

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true); // Set loading state to true

    console.log("Resume Content:", resumeContent);
    console.log("Job Description:", jobDesc);

    // Create the input prompt for the chat session
    const inputPrompt = `
      Resume Content: ${resumeContent},
      Job Description: ${jobDesc}.
      Compare skills and responsibilities and provide a match percentage and suggestions.
    `;

    try {
      // Send the prompt to the chat session
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text(); // Get the response text
      console.log("Response Text:", responseText); // Log the full response

      // Navigate to the match results page and pass the response text as state
      setOpenDialog(false); // Close dialog
      navigate("/match-results", { state: { matchResults: responseText } });

    } catch (error) {
      console.error("Error during the request:", error);
      alert("An error occurred while checking the match. Please try again."); // Alert the user about the error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
    
    <div
  className="w-96 h-44 p-10 rounded-lg bg-secondary transition-all cursor-pointer relative flex items-center justify-center"
  onClick={() => setOpenDialog(true)}
  style={{
    backgroundImage: 'url("https://t3.ftcdn.net/jpg/05/56/62/68/240_F_556626807_UUU8AF9t0myQwwfriHuw76KyWsEGWd55.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="border-2 border-transparent rounded-lg hover:border-4 hover:border-primary hover:shadow-lg transition-all absolute inset-0"></div>
  <h2
    className="text-lg font-bold text-center text-white relative z-10"
    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }} // Dark black shadow effect
  >
    Check Resume Match
  </h2>
</div>




      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Resume and Job Description Match Checker
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="my-4">
                  <label className="mb-2 block">Resume Content</label>
                  <Textarea
                    placeholder="Paste your resume text here..."
                    required
                    onChange={(e) => setResumeContent(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <label className="mb-2 block">Job Description</label>
                  <Textarea
                    placeholder="Paste the job description here..."
                    required
                    onChange={(e) => setJobDesc(e.target.value)}
                  />
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <LoaderCircle /> // Show loader when loading
                    ) : (
                      "Check Match"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ATSScoreChecker;





