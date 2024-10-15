import { varchar } from "drizzle-orm/pg-core"; // Since you're using pg-core, not mysql-core
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(), // Define length
  jobDesc: varchar("jobDesc", { length: 255 }).notNull(), // Define length
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(), // Define length
  createdBy: varchar("createdBy", { length: 255 }).notNull(), // Define length
  createdAt: varchar("createdAt", { length: 255 }), // Define length
  mockId: varchar("mockId", { length: 255 }).notNull(), // Define length
});

export const userAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId", { length: 255 }).notNull(),
  question: varchar("question", { length: 255 }).notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating", { length: 255 }),
  userEmail: varchar("userEmail", { length: 255 }),
  createdAt: varchar("createdAt", { length: 255 }),
});
// commnads to run on terminal are
// npm run db:push
// npm run db:studio
