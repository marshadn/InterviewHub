// import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "../../../utils/GeminiAIModel";
import.meta.env.VITE_INTERVIEW_QUESTION_COUNT;
import.meta.env.VITE_GEMINI_API_KEY;
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  const LoaderCircle = () => {
    return (
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
  };

  // const onSubmit = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   console.log(jobPosition, jobDesc, jobExperience);

  //   const InputPrompt =
  //     "Job Position:" +
  //     jobPosition +
  //     ", Job Description:" +
  //     jobDesc +
  //     ", Years of experience:" +
  //     jobExperience +
  //     ". Based on this please give me " +
  //     import.meta.env.VITE_INTERVIEW_QUESTION_COUNT +
  //     " interview questions with answered in json format, give question and answered as field in json";

  //   const result = await chatSession.sendMessage(InputPrompt);
  //   const MockJsonResponse = result.response
  //     .text()
  //     .replace("```json", "")
  //     .replace("```", "");
  //   console.log(JSON.parse(MockJsonResponse));
  //   setJsonResponse(MockJsonResponse);
  //   if (MockJsonResponse) {
  //     const resp = await db
  //       .insert(MockInterview)
  //       .values({
  //         mockId: uuidv4(),
  //         jsonMockResp: MockJsonResponse,
  //         jobPosition: jobPosition,
  //         jobDesc: jobDesc,
  //         jobExperience: jobExperience,
  //         createdBy: user?.primaryEmailAddress?.emailAddress,
  //         createdAt: moment().format("DD-MM-yyyy"),
  //       })
  //       .returning({ mockId: MockInterview.mockId });
  //     console.log("inserted id:", resp);
  //     if (resp) {
  //       setOpenDialog(false);
  //     }
  //   } else {
  //     console.log("error");
  //   }
  //   setLoading(false);
  // };

  // const onSubmit = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   console.log(jobPosition, jobDesc, jobExperience);

  //   const InputPrompt =
  //     `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of experience: ${jobExperience}. Based on this, please give me ` +
  //     `${
  //       import.meta.env.VITE_INTERVIEW_QUESTION_COUNT
  //     } interview questions with answers in JSON format.`;

  //   try {
  //     // Fetch AI response
  //     const result = await chatSession.sendMessage(InputPrompt);

  //     // Get response text and clean it up
  //     const rawResponse = await result.response.text();
  //     console.log("Raw response:", rawResponse);

  //     const cleanedResponse = rawResponse
  //       .replace("```json", "")
  //       .replace("```", "")
  //       .trim(); // Remove unnecessary characters like markdown formatting

  //     console.log("Cleaned response:", cleanedResponse);

  //     // Try parsing the JSON response
  //     const parsedJson = JSON.parse(cleanedResponse);
  //     console.log("Parsed JSON:", parsedJson);

  //     setJsonResponse(parsedJson);

  //     // Insert parsed data into the database
  //     if (parsedJson) {
  //       const resp = await db
  //         .insert(MockInterview)
  //         .values({
  //           mockId: uuidv4(),
  //           jsonMockResp: parsedJson, // Store parsed JSON instead of raw text
  //           jobPosition: jobPosition,
  //           jobDesc: jobDesc,
  //           jobExperience: jobExperience,
  //           createdBy: user?.primaryEmailAddress?.emailAddress,
  //           createdAt: moment().format("DD-MM-yyyy"),
  //         })
  //         .returning({ mockId: MockInterview.mockId });

  //       console.log("Inserted ID:", resp);

  //       if (resp) {
  //         setOpenDialog(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error parsing or inserting JSON:", error);
  //   }

  //   setLoading(false);
  // };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt =
      "Job Position:" +
      jobPosition +
      ", Job Description:" +
      jobDesc +
      ", Years of experience:" +
      jobExperience +
      ". Based on this please give me " +
      import.meta.env.VITE_INTERVIEW_QUESTION_COUNT +
      " interview questions with answered in json format, give question and answered as field in json";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(MockJsonResponse));
    setJsonResponse(MockJsonResponse);
    if (MockJsonResponse) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });
      console.log("inserted id:", resp);
      if (resp) {
        setOpenDialog(false);
        navigate("/dashboard/interview/" + resp[0]?.mockId);
      }
    } else {
      console.log("error");
    }
    setLoading(false);
  };

  return (
    <div >
      {/* <div
        className="p-10 border rounded-lg bg-secondary
          hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+Add New</h2>
      </div> */}
       <div
  className="w-96 h-44 p-10 rounded-lg bg-secondary transition-all cursor-pointer relative flex items-center justify-center"
  onClick={() => setOpenDialog(true)}
  style={{
    backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/5c8e943534c4e264ef50e68f/1614371058261-HPMX8VXL6VT8EAXPACE2/image-asset.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="border-2 border-transparent rounded-lg hover:border-4 hover:border-primary hover:shadow-lg transition-all absolute inset-0"></div>
  <h2
    className="text-lg font-bold text-center text-white relative z-10"
    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }} // Dark black shadow effect
  >
    Add New Interview
  </h2>
</div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell Us More About Your Job Interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details About Your Job Position/Role,Job Description and
                    Years of Experience
                  </h2>
                  <div className="mt-7 my-7 mb-7">
                    <label className="mb-2 block">Job Role/Job Position</label>
                    <Input
                      placeholder="Ex.Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>

                  <div className=" my-3 ">
                    <label className="mb-2 block">Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="React,Node,Express Js,Angular etc.."
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3 ">
                    <label className="mb-2 block">Years of Experience</label>
                    <Input
                      placeholder="Ex.5"
                      type="number"
                      max="50"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
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
                      <>
                        <LoaderCircle className="animate-spin" />{" "}
                        &apos;Generating from AI
                      </>
                    ) : (
                      "Start Interview"
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

export default AddNewInterview;
