import { useState } from 'react';

const faqs = [
  {
    question: "What is InterviewHub?",
    answer: "InterviewHub is a platform that offers mock interviews to help you prepare for your real job interviews."
  },
  {
    question: "How do I schedule a mock interview?",
    answer: "You can schedule a mock interview by logging in and selecting a time slot in the dashboard."
  },
  {
    question: "What types of interviews are available?",
    answer: "We offer various types of interviews, including technical, behavioral, and situational interviews."
  },
  {
    question: "Can I get feedback after my mock interview?",
    answer: "Yes, you will receive detailed feedback on your performance after each mock interview."
  },
  {
    question: "How long does a mock interview last?",
    answer: "Typically, a mock interview lasts between 30 to 60 minutes, depending on the format and type of interview."
  },
  {
    question: "Is there a fee for the mock interviews?",
    answer: "We offer both free and paid mock interview options. You can check the pricing section for details."
  },
  {
    question: "Can I reschedule my mock interview?",
    answer: "Yes, you can reschedule your mock interview as long as it's done 24 hours in advance."
  },
  {
    question: "What platform do you use for the interviews?",
    answer: "We use a secure video conferencing platform for conducting the interviews."
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4 w-full max-w-md">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out hover:border-2 hover:border-primary hover:shadow-xl"
          >
            <h3 
              className="font-semibold cursor-pointer" 
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </h3>
            <p 
              className={`mt-2 transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
