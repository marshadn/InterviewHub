import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../../../../utils/db";
import { userAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../../../components/ui/button";

function Feedback() {
  const { interviewId } = useParams();
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(0);

  useEffect(() => {
    if (interviewId) {
      const GetFeedback = async () => {
        const result = await db
          .select()
          .from(userAnswer)
          .where(eq(userAnswer.mockIdRef, interviewId))
          .orderBy(userAnswer.id);

        setFeedbackList(result);

        // Calculate the overall rating
        const totalRating = result.reduce((acc, item) => acc + parseInt(item.rating, 10), 0);
        const avgRating = result.length > 0 ? (totalRating / result.length).toFixed(1) : 0;
        setOverallRating(avgRating);
      };

      GetFeedback();
    }
  }, [interviewId]);

  return (
    <div className="p-10 space-y-6">
      <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
      <h2 className="text-2xl font-semibold">Here is your interview feedback</h2>
      <h2 className="text-lg text-primary my-3">
        Your overall interview rating: <strong>{overallRating}/10</strong>
      </h2>
      <h2 className="text-sm text-gray-600">
        Find below interview questions with correct answers, your answers, and feedback for improvement.
      </h2>

      {feedbackList.length > 0 ? (
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="border rounded-lg shadow-sm">
            <CollapsibleTrigger className="p-4 bg-secondary rounded-t-lg text-left flex justify-between items-center w-full hover:bg-secondary-hover">
              <span className="font-medium text-md">{item.question}</span>
              <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 space-y-3">
              <div className="flex flex-col gap-2">
                <h2 className="text-sm text-gray-700 bg-gray-100 p-3 border rounded-md">
                  <strong>Rating:</strong> {item.rating}/10
                </h2>
                <h2 className="text-sm bg-red-50 text-red-800 p-3 border rounded-md">
                  <strong>Your Answer:</strong> {item.userAns}
                </h2>
                <h2 className="text-sm bg-green-50 text-green-800 p-3 border rounded-md">
                  <strong>Correct Answer:</strong> {item.correctAns}
                </h2>
                <h2 className="text-sm bg-blue-50 text-blue-800 p-3 border rounded-md">
                  <strong>Feedback:</strong> {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p className="text-gray-500">No feedback available.</p>
      )}
      
      <Link to="/dashboard" className="block mt-6">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}

export default Feedback;




