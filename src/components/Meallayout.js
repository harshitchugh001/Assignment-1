import React, { useState } from 'react';

export default function Meallayout({ meals }) {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedDrinks, setSelectedDrinks] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const handleMealChange = (meal) => {
    setSelectedMeal(meal);
    setSelectedDrinks({});
    calculateTotalPrice(meal, {});
  };

  const handleDrinkChange = (drink) => {
    setSelectedDrinks((prevSelectedDrinks) => {
      const updatedSelectedDrinks = { ...prevSelectedDrinks };

      if (!updatedSelectedDrinks[selectedMeal.id]) {
        updatedSelectedDrinks[selectedMeal.id] = [];
      }

      const drinkIndex = updatedSelectedDrinks[selectedMeal.id].findIndex(
        (selectedDrink) => selectedDrink.id === drink.id
      );

      if (drinkIndex === -1) {
        updatedSelectedDrinks[selectedMeal.id].push(drink);
      } else {
        updatedSelectedDrinks[selectedMeal.id].splice(drinkIndex, 1);
      }

      calculateTotalPrice(selectedMeal, updatedSelectedDrinks);
      return updatedSelectedDrinks;
    });
  };

  const calculateTotalPrice = (meal, drinks) => {
    let totalPrice = meal.price;

    const selectedMealDrinks = drinks[meal.id] || [];
    totalPrice += selectedMealDrinks.reduce((total, drink) => total + drink.price, 0);

    setTotalPrice(totalPrice);
  };

  return (
    <div>
      {meals.map((meal, index) => (
        <div key={index} className="container mx-auto border-2 border-black my-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <img src={meal.img} alt={meal.title} className="w-full h-auto mb-4" />
              <input
                type="radio"
                name="selectedMeal"
                value={meal.id}
                onChange={() => handleMealChange(meal)}
                checked={selectedMeal && selectedMeal.id === meal.id}
              />
              Select Meal
            </div>
            <div className="md:col-span-2 bg-blue-500 p-4 relative">
              <h1 className="text-white bg-blue-700 p-2 rounded-md mb-4">{meal.title}</h1>
              <p>Starter: {meal.starter}</p>
              <p>Desert: {meal.desert}</p>
              <p>Price: ${meal.price.toFixed(2)}</p>
              <h2>Drinks:</h2>
              <ul>
                {meal.drinks.map((drink) => (
                  <li key={drink.id}>
                    <input
                      type="checkbox"
                      value={drink.id}
                      onChange={() => handleDrinkChange(drink)}
                      checked={
                        selectedMeal &&
                        selectedMeal.id === meal.id &&
                        selectedDrinks[meal.id] &&
                        selectedDrinks[meal.id].some(
                          (selectedDrink) => selectedDrink.id === drink.id
                        )
                      }
                    />
                    {drink.title}: ${drink.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>x
        </div>
      ))}
      <div className="container mx-auto border-2 border-black my-4 p-4">
        {selectedMeal && (
          <p>
            You have selected {selectedMeal.title} and{' '}
            {selectedDrinks[selectedMeal.id] &&
              selectedDrinks[selectedMeal.id].map((selectedDrink) => selectedDrink.title).join(', ')}
          </p>
        )}
        <p>
          Total price: ${totalPrice.toFixed(2)}
        </p>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-md">
          Checkout
        </button>
      </div>
    </div>
  );
}
