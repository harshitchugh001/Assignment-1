import React, { useState } from 'react'
import Button from './Button';
import Meallayout from './Meallayout';
import Passenger from './passenger';
export default function Content() {
  const mealsData = {
    meals: [
      {
        "id": "meal1",
        "title": "3 course chicken",
        "starter": "Lorem Ipsum",
        "desert": "Cake",
        "price": 9.99,
        "labels": [
          "chicken",
          "breakfast"
        ],
        "img": "https://source.unsplash.com/XaDsH-O2QXs",
        "drinks": [
          {
            "id": "drink-1",
            "title": "Vine",
            "price": 4.99
          },
          {
            "id": "drink-2",
            "title": "Juice",
            "price": 5.99
          },
          {
            "id": "drink-3",
            "title": "Beer",
            "price": 6.99
          }
        ]
      },
      {
        "id": "meal2",
        "title": "3 course Beef",
        "starter": "Lorem Ipsum",
        "desert": "Cake",
        "price": 19.99,
        "labels": [
          "beef"
        ],
        "img": "https://source.unsplash.com/auIbTAcSH6E",
        "drinks": [
          {
            "id": "drink-1",
            "title": "Vine",
            "price": 4.99
          },
          {
            "id": "drink-2",
            "title": "Juice",
            "price": 5.99
          },
          {
            "id": "drink-3",
            "title": "Beer",
            "price": 6.99
          }
        ]
      },
      {
        "id": "meal3",
        "title": "3 course Vegetarian",
        "starter": "Lorem Ipsum",
        "desert": "Cake",
        "price": 79.99,
        "labels": [
          "vegetarian"
        ],
        "img": "https://source.unsplash.com/EvoIiaIVRzU",
        "drinks": [
          {
            "id": "drink-1",
            "title": "Vine",
            "price": 4.99
          },
          {
            "id": "drink-2",
            "title": "Juice",
            "price": 5.99
          },
          {
            "id": "drink-3",
            "title": "Beer",
            "price": 6.99
          }
        ]
      },
      {
        "id": "meal4",
        "title": "3 course Seafood",
        "starter": "Lorem Ipsum",
        "desert": "Cake",
        "price": 49.99,
        "labels": [
          "seafood"
        ],
        "img": "https://source.unsplash.com/awj7sRviVXo",
        "drinks": [
          {
            "id": "drink-1",
            "title": "Vine",
            "price": 4.99
          },
          {
            "id": "drink-2",
            "title": "Juice",
            "price": 5.99
          },
          {
            "id": "drink-3",
            "title": "Beer",
            "price": 6.99
          }
        ]
      },
      {
        "id": "meal5",
        "title": "3 course Pork",
        "starter": "Lorem Ipsum",
        "desert": "Cake",
        "price": 39.99,
        "labels": [
          "pork"
        ],
        "img": "https://source.unsplash.com/XPvhzVIeETM",
        "drinks": [
          {
            "id": "drink-1",
            "title": "Vine",
            "price": 4.99
          },
          {
            "id": "drink-2",
            "title": "Juice",
            "price": 5.99
          },
          {
            "id": "drink-3",
            "title": "Beer",
            "price": 6.99
          }
        ]
      },
      {
        "id": "meal6",
        "title": "3 course Kids",
        "starter": "Lorem Ipsum",
        "desert": "Cake",
        "price": 29.99,
        "labels": [
          "kids",
          "breakfast"
        ],
        "img": "https://source.unsplash.com/PLyJqEJVre0",
        "drinks": [
          {
            "id": "drink-1",
            "title": "Vine",
            "price": 4.99
          },
          {
            "id": "drink-2",
            "title": "Juice",
            "price": 5.99
          },
          {
            "id": "drink-3",
            "title": "Beer",
            "price": 6.99
          }
        ]
      },
      {
        "id": "meal7",
        "title": "3 course Chicken 2",
        "starter": "Lorem Ipsum",
        "desert": "Cake",
        "price": 19.99,
        "labels": [
          "chicken"
        ],
        "img": "https://source.unsplash.com/N0u8bLrB_-g",
        "drinks": [
          {
            "id": "drink-1",
            "title": "Vine",
            "price": 4.99
          },
          {
            "id": "drink-2",
            "title": "Juice",
            "price": 5.99
          },
          {
            "id": "drink-3",
            "title": "Beer",
            "price": 6.99
          }
        ]
      }
    ]
  };
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [passengerId, setpassengerId] = useState(null);

  const handleSelect = (labelId) => {
    setSelectedLabel(labelId);
  };

  const filteredMeals = mealsData.meals.filter((meal) =>
    meal.labels.includes(selectedLabel)
  );
  const handleCheckout = (meal, price) => {
    setCheckoutData({ meal, price });
  };
  const handlePassengerId = (passengerId) => {
    setpassengerId({passengerId});
  };
 


  return (

    <div className='grid grid-cols-12 gap-4 md:gap-20 w-full h-full bg-gray-100'>
      <div className="col-span-12 md:col-span-8 bg-blue-300 border-gray-200 h-[calc(100vh-3.75rem)] p-4 md:mt-4 md:ml-4">
        <div className="col-span-12 bg-white-400 px-3">
          <Button onSelect={handleSelect} selectedButton={selectedLabel} />
        </div>
        <div className="mt-4 ml-4">
          <p>Selected Label: {selectedLabel}</p>
          <Meallayout meals={filteredMeals} onCheckout={handleCheckout} selectedpassengerId={passengerId} />
        </div>
      </div>
      <aside className='col-span-12 md:col-span-4 bg-orange-300 p-4 md:mt-4 md:mr-7'>
        <Passenger checkoutData={checkoutData} onPassengerId={handlePassengerId} ></Passenger>

      </aside>

      <div>

      </div>
    </div>
  );
}