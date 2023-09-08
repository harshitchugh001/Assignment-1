import React, { useState, useEffect } from 'react';
import AddPassenger from './Addpassenger';
import Logout from './logoutButton';

export default function Passenger({ checkoutData, onPassengerId }) {
  const [isAddPassengerOpen, setAddPassengerOpen] = useState(false);
  const [passengerData, setPassengerData] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);

  const openPassengerModal = () => {
    setAddPassengerOpen(true);
  };

  const closePassengerModal = () => {
    setAddPassengerOpen(false);
  };

  const fetchPassengersAndFoods = async () => {
    try {
      const passengerResponse = await fetch(`${process.env.REACT_APP_API}/getpassenger`);
      if (!passengerResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const passengerData = await passengerResponse.json();

      const passengerDataWithFoods = await Promise.all(
        passengerData.map(async (passenger) => {
          const foodResponse = await fetch(`${process.env.REACT_APP_API}/getfood?passengerId=${passenger._id}`);
          
          const foodData = await foodResponse.json();
          return {
            ...passenger,
            food: foodData,
          };
        })
      );

      setPassengerData(passengerDataWithFoods);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchPassengersAndFoods();
  }, []);

  const toggleAccordion = (index) => {
    const updatedPassengers = [...passengerData];
    updatedPassengers[index].expanded = !updatedPassengers[index].expanded;
    setPassengerData(updatedPassengers);
  };

  const handleSelectFood = (passengerId) => {
    const updatedPassengers = passengerData.map((passenger) => {
      if (passenger._id === passengerId) {
        return {
          ...passenger,
          selected: passenger.food.totalPrice > 0 ? true : !passenger.selected, 
        };
      } else {
        return {
          ...passenger,
          selected: false, 
        };
      }
    });
    setPassengerData(updatedPassengers);
    onPassengerId(passengerId);
  };
  
  const handleTotalPayment = () => {
    
    let payment = 0;
    passengerData.forEach((passenger) => {
      const totalPrice = passenger.food ? passenger.food.totalPrice : 0;
      payment += isNaN(totalPrice) ? 0 : totalPrice;
    });
    setTotalPayment(payment); 
  };
  

  return (
    <>
      <div className="flex justify-between items-center">
        {checkoutData && (
          <div>
            <p>Selected Meal: {checkoutData.meal.title}</p>
            <p>Total Price: {checkoutData.price.toFixed(2)}</p>
          </div>
        )}
        <h2>Total Passenger: {passengerData.length}</h2>
        <Logout />
      </div>
      <div className="container mx-auto border-2 border-blue-800 bg-white  my-4 p-4">
        <h3>Passengers</h3>
        {passengerData.map((passenger, index) => (
          <div key={index} className="border rounded-lg mb-2">
            <div className="flex justify-between items-center">
              <button
                className={`w-full text-left px-4 py-2 ${
                  passenger.expanded
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-black'
                } focus:outline-none focus:ring focus:ring-blue-300`}
                type="button"
                onClick={() => toggleAccordion(index)}
              >
                {passenger.name}
              </button>
              <div className="flex items-center">
              <p className="mr-4">Price: ${passenger.food && passenger.food.totalPrice ? passenger.food.totalPrice.toFixed(2) : '0.00'}</p>
                <button
                  className={`bg-${passenger.selected ? 'green' : 'blue'}-500 hover:bg-${passenger.selected ? 'green' : 'blue'}-600 text-white font-bold px-4 rounded`}
                  onClick={() => handleSelectFood(passenger._id)}
                >
                  {passenger.selected ? 'Selected' : 'Select Food'}
                </button>
              </div>
            </div>
            {passenger.expanded && (
              <div className="px-4 py-2">
                <strong>Destination:</strong> {passenger.destination}<br />
                <strong>Seat Number:</strong> {passenger.seatNumber}<br />
                {passenger.food && (
                  <>
                    <strong>Selected Meal:</strong> {passenger.food.meal}<br />
                    <strong>Selected Drink:</strong> {passenger.food.drink}<br />
                    <strong>Price:</strong> ${passenger.food.totalPrice}<br />
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="container mx-auto border-2 border-blue-800  bg-white my-4 p-4">
        <div className="container border-2 border-blue-800 p-2">
          <p>Total price: ${totalPayment.toFixed(2)}</p>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-md" onClick={handleTotalPayment}>
            Total payment collected
          </button>
        </div>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={openPassengerModal}
        >
          Add Passenger
        </button>
        {isAddPassengerOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-8 w-1/2">
              <AddPassenger closeModal={closePassengerModal} updatePassengers={fetchPassengersAndFoods} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
