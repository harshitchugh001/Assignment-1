import React from 'react'

export default function Aside({ checkoutData }) {
    return (
      <div>
        {checkoutData && (
          <div>
            <p>Selected Meal: {checkoutData.meal.title}</p>
            <p>Total Price: {checkoutData.price}</p>
          </div>
        )}
      </div>
    );
  }
  
