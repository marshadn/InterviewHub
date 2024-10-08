// import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary 
          hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell Us More About Your Job Interviewing
            </DialogTitle>
            <DialogDescription>
              <div>
                <h2>
                  Add Details About Your Job Position/Role,Job Description and
                  Years of Experience
                </h2>
                <div className="mt-7 my-3 ">
                  <label>Job Role/Job Position</label>
                  <Input placeholder="Ex.Full Stack Developer" />
                </div>

                <div className=" my-3 ">
                  <label>Job Description/Tech Stack (In Short)</label>
                  <Textarea placeholder="React,Node,Express Js,Angular etc.." />
                </div>
                <div className=" my-3 ">
                  <label>Job Description/Tech Stack (In Short)</label>
                  <Textarea placeholder="React,Node,Express Js,Angular etc.." />
                </div>
                <div className="my-3 ">
                  <label>Years of Experience</label>
                  <Input placeholder="Ex.5" type="number" />
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button>Start Interview</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
