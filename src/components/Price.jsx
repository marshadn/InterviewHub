// import React from 'react';

const pricingPlans = [
  {
    name: "Basic",
    price: "$29/month",
    features: [
      "Access to mock technical interviews",
      "Basic feedback",
      "24/7 support",
      "Email support"
    ]
  },
  {
    name: "Pro",
    price: "$59/month",
    features: [
      "Access to all mock interviews",
      "Detailed feedback",
      "24/7 support",
      "Resume review"
    ]
  },
  {
    name: "Premium",
    price: "$99/month",
    features: [
      "Access to all mock interviews",
      "Personalized coaching",
      "Mock interview recordings",
      "Priority support"
    ]
  },
];

const Price = () => {
  return (
    <header className="bg-gray-100 p-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Welcome to InterviewHub</h1>
        <h2 className="text-2xl font-semibold text-center mt-4"><strong>Pricing Plans</strong></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-5 border transition-transform transform hover:scale-105 hover:shadow-xl hover:border-primary border-transparent"
            >
              <h3 className="text-xl font-bold text-center">{plan.name}</h3>
              <p className="text-center text-lg font-semibold mt-2">{plan.price}</p>
              <ul className="mt-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center mt-2">
                    <span className="text-green-500 mr-2">✔️</span> {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full py-2 bg-primary text-white border border-transparent rounded hover:border-primary hover:bg-transparent hover:text-primary transition duration-300">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Price;
