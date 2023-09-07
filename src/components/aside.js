import React from 'react'
import Passenger from './passenger';

export default function Aside({ checkoutData }) {
    return (
      <div>
        {checkoutData && (
          <div>
            <p>Selected Meal: {checkoutData.meal.title}</p>
            <p>Total Price: {checkoutData.price.toFixed(2)}</p>
          </div>
        )}
        <Passenger></Passenger>

        
      </div>
    );
  }
  
