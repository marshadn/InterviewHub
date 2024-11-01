# Mock Interview Web App

A comprehensive mock interview platform designed to simulate technical interviews and improve job-seeking candidates' performance through real-time feedback, resume optimization, and AI-driven assistance.

## Features

- **Role-Specific Interview Questions**: Leveraging Google Gemini API, the app generates interview questions tailored to the user's chosen job role, required skills, and years of experience.
- **Real-Time Response Recording**: Users can answer questions through webcam and microphone for a more immersive, realistic interview simulation.
- **Automated Feedback**: AI-driven feedback from Gemini analyzes each response, providing suggestions and insights to help users refine their answers.
- **Resume Content Analysis**: Users can upload their resume, extract and display its contents on the platform, and match the details (such as skills, education, and experiences) with a job description for targeted resume improvement.
- **Interactive AI Questioning**: Users can ask real-time questions to the AI to clarify doubts or improve understanding during interview preparation, receiving instant results and guidance.

## Tech Stack

### Frontend

- **React.js**: Utilized for building a dynamic, interactive user interface.
- **Vite**: Chosen as the build tool to enable faster development and efficient module bundling.
- **Tailwind CSS & ShadCN UI**: Used to style the components with a clean, responsive design for an intuitive user experience.

### Backend & API

- **Google Gemini API**: Powers question generation, feedback on answers, and real-time user support.
- **PostgreSQL Database**: Stores user data, questions, and responses for quick retrieval and secure storage.
- **Drizzle ORM**: Simplifies interaction with PostgreSQL by providing a lightweight Object Relational Mapper for managing database queries.

### Deployment & Tools

- **Netlify**: The app is deployed on Netlify for efficient, user-friendly continuous deployment and hosting.
- **Version Control**: Git is used for version control, ensuring structured code management and collaborative capabilities.
- **VS Code**: Primary code editor for development, supporting extensions for streamlined coding and project management.

## Folder Structure

The project follows a modular structure for organized, scalable code management:

```plaintext
src
├── App.jsx                  # Main application component
├── main.jsx                 # Entry point for the application
├── dashboard
│   └── interview
│       └── [interviewId]
│           └── page.jsx     # Interview page with dynamic routing
├── components               # Reusable UI components
│   ├── ResumeUploader       # Component for uploading and analyzing resume content
│   ├── FeedbackDisplay      # Component for displaying feedback from AI
│   └── QuestionGenerator    # Component for generating questions based on role and skills
├── utils                    # Utility functions and constants
└── styles                   # Tailwind CSS and other custom styling files
```



## Commands
Installation: Clone the repository and navigate into the project directory.

```

git clone https://github.com/marshadn/mock-InterviewHub.git
cd InterviewHub
```

## Install Dependencies:

```
npm install
```
## Run the Development Server:

```
npm run dev

```
## Run Production Build:
```
npm run build
```



_redirects file: Ensure you have a _redirects file in the root for Netlify client-side routing.

```
/* /index.html 200
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
