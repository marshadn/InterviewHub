// src/components/HowItWorks.jsx

const HowItWorks = () => {
  return (
    <div className="p-5 flex justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:border-2 hover:border-primary hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300 text-center">
          InterviewHub uses the Google Gemini API to provide a seamless mock interview experience. 
          Here's how it works:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-left text-gray-700 dark:text-gray-300">
          <li>
            <strong>Sign In:</strong> Log in to your account to access the dashboard and schedule your mock interviews.
          </li>
          <li>
            <strong>Select Your Preferences:</strong> Choose the job role, specific skills, and years of experience relevant to your mock interview.
          </li>
          <li>
            <strong>Receive Questions:</strong> The Google Gemini API generates tailored interview questions based on your selections.
          </li>
          <li>
            <strong>Practice:</strong> Answer the questions via webcam and mic, simulating a real interview environment.
          </li>
          <li>
            <strong>Get Feedback:</strong> After the interview, receive personalized feedback on your performance to help you improve.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HowItWorks;
