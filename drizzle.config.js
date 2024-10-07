// import type { Config } from "drizzle-kit";
/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:Fk6XI7odYVsA@ep-nameless-cherry-a5f7t7qy.us-east-2.aws.neon.tech/InterviewHub?sslmode=require",
  },
};
