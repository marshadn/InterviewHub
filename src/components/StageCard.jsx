// Inside StageCard.jsx
//import React from 'react';

function StageCard({ title, description, imageSrc }) {
  return (
    <div className="flex flex-col items-center p-5 border-2 border-primary rounded-lg shadow-lg transition-all hover:shadow-lg hover:shadow-primary">
      <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default StageCard;
