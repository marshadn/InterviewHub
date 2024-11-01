// AnimatedTextCard.jsx
//import React from 'react';

function AnimatedTextCard() {
  return (
    <div className="p-5 border rounded-lg shadow-lg bg-primary text-white text-center">
      <h3 className="font-bold text-lg mb-3">Tips for Interview Success</h3>
      <div className="overflow-hidden h-8">
        <p className="text-animation">Stay calm and confident</p>
        <p className="text-animation">Research the company thoroughly</p>
        <p className="text-animation">Practice common interview questions</p>
        <p className="text-animation">Highlight your strengths effectively</p>
      </div>
    </div>
  );
}

export default AnimatedTextCard;
