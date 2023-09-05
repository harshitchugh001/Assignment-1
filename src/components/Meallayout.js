import React from 'react';

export default function Meallayout({ meals }) {
  return (
    <div>
      {meals.map((meal, index) => (
        <div key={index} className="container mx-auto border-2 border-black my-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> 
            <div className="md:col-span-1">
              <img src={meal.img} alt={meal.title} className="w-full h-auto mb-4" /> 
            </div>
            <div className="md:col-span-2 bg-blue-500 p-4">
              <h1>{meal.title}</h1>
              <p>Starter: {meal.starter}</p>
              <p>Desert: {meal.desert}</p>
              <p>Price: ${meal.price.toFixed(2)}</p>

              <h2>Drinks:</h2>
              <ul>
                {meal.drinks.map((drink) => (
                  <li key={drink.id}>
                    {drink.title}: ${drink.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
