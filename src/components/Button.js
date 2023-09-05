import React from 'react';

const labels = [
  {
    "id": "pork",
    "label": "Pork"
  },
  {
    "id": "seafood",
    "label": "Seafood"
  },
  {
    "id": "kids",
    "label": "Kids"
  },
  {
    "id": "chicken",
    "label": "Chicken"
  },
  {
    "id": "beef",
    "label": "Beef"
  },
  {
    "id": "vegetarian",
    "label": "Vegetarian"
  },
  {
    "id": "breakfast",
    "label": "Breakfast"
  }
];

export default function Button({ onSelect, selectedButton }) {
    const handleButtonClick = (label) => {
      onSelect(label.id);
    };
  
    return (
      <div className="mt-2 flex flex-wrap justify-center">
        <div className="p-2">
          {labels.map((label) => (
            <button
              key={label.id}
              className={`rounded-3xl bg-blue-500 text-white m-1 p-2 ${
                selectedButton === label.id ? 'bg-green-500' : ''
              }`}
              onClick={() => handleButtonClick(label)}
            >
              {label.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
